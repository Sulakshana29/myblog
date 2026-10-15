/* ============================================================
   POSTS — Write-ups data (rendered on index + post.html)
   Add a new post by adding an object here. `body` is HTML.
   ============================================================ */

export const posts = [
  {
    slug: 'hardening-a-3-tier-app-before-kubernetes',
    title: 'Hardening a 3-tier app before Kubernetes: 6 things that were quietly broken',
    date: '2026-10-15',
    summary: 'Before moving Deal Aggregator to Kubernetes I audited it the way an attacker would. Public delete endpoints, a ReDoS hole, an unauthenticated database and internal tools on the open internet. Here is what I found and how I fixed each one.',
    tags: ['DevSecOps', 'Docker', 'Node.js', 'Nginx'],
    project: 1,
    body: `
<p>Kubernetes gives you strong security controls: <code>runAsNonRoot</code>, read-only root filesystems, readiness-based routing. But they only work if your containers already support them. So before moving <strong>Deal Aggregator</strong> (React → Express → MongoDB, running on EC2 with Docker Compose) onto Kubernetes, I ran a dedicated hardening pass.</p>
<p>The goal was simple: make the app secure <em>by itself</em>, and make every security claim in the README actually true. That second part turned out to matter more than I expected.</p>

<h2>1. Anyone could delete the database</h2>
<p><code>POST /deals</code> and <code>DELETE /deals/:id</code> were public. The UI had an "Admin mode" toggle, but it only hid a button in the browser. This worked for anyone:</p>
<pre><code>curl -X DELETE http://&lt;host&gt;/api/deals/&lt;id&gt;</code></pre>
<p><strong>Fix:</strong> I removed the write routes entirely instead of adding auth. Nothing legitimate used them, since the scraper and seed script write to MongoDB directly over the internal network. The most secure endpoint is one that doesn't exist (the principle of <em>least functionality</em>). If an admin UI is ever needed, it should come with real authentication, not a client-side flag.</p>

<h2>2. One request could freeze the API</h2>
<p>Search input went straight from the URL into a regular expression:</p>
<pre><code>filter[key] = { $regex: new RegExp(\`^\${val}$\`, 'i') };</code></pre>
<p>That causes two problems:</p>
<ul>
  <li><strong>ReDoS:</strong> <code>?search=(a+)+$</code> compiles into a pattern that backtracks exponentially. Node.js is single-threaded, so <em>one</em> request can stall the API for every user.</li>
  <li><strong>NoSQL operator injection:</strong> Express parses <code>?bank[$ne]=x</code> into the object <code>{ $ne: 'x' }</code>. Objects should never reach a Mongo filter.</li>
</ul>
<p><strong>Fix:</strong> every regex metacharacter is escaped so input matches literally, query params must be plain strings, and search is capped at 100 characters.</p>

<h2>3. Rate limiting that limited everyone at once</h2>
<p>Every request reaches Express <em>from nginx</em>, so <code>req.ip</code> was always the nginx container's IP. All users shared one rate-limit bucket: one abusive client could lock everybody out.</p>
<p><strong>Fix:</strong> <code>app.set('trust proxy', 1)</code> trusts exactly one hop and reads the real client IP from <code>X-Forwarded-For</code>, which nginx now sets. Trusting <em>all</em> hops would be worse, because clients could then spoof their IP with a fake header.</p>

<h2>4. The database had no password (and the README said it did)</h2>
<p>This was the uncomfortable one. MongoDB ran without authentication while the README described it as secured.</p>
<p><strong>Fix:</strong> root credentials now come from a git-ignored <code>.env</code>, and Compose uses the <code>\${VAR:?message}</code> syntax so it <strong>refuses to start</strong> if they are missing. It cannot silently fall back to "no password".</p>

<h2>5. Internal tools exposed to the internet</h2>
<p>On the EC2 host, ports for the backend, Prometheus, cAdvisor and Loki were all published, and Grafana used <code>admin</code>/<code>admin</code>. Each one is an unauthenticated internal tool sitting on the public internet, and cAdvisor even exposes host details.</p>
<p><strong>Fix:</strong> only port 80 is public now. Grafana binds to <code>127.0.0.1</code> and requires a password, so I reach it through an SSH tunnel. nginx also returns 404 for <code>/api/metrics</code>; Prometheus scrapes the backend directly over the internal network.</p>
<pre><code>ssh -L 3001:localhost:3001 &lt;user&gt;@&lt;ec2-host&gt;</code></pre>

<h2>6. Containers running as root</h2>
<p><strong>Fix:</strong> the backend and scraper images end with <code>USER node</code>, and the code is copied in as root, so the runtime user can read the app but not modify it. The frontend moved to <code>nginx-unprivileged</code> (UID 101, port 8080), which Kubernetes needs for <code>runAsNonRoot</code>. Builds use <code>npm ci --omit=dev</code> for exact lockfile versions and no dev tooling in the image, which also means fewer CVEs for Trivy to report. Image versions are pinned instead of <code>:latest</code>.</p>

<h2>Smaller fixes that still mattered</h2>
<ul>
  <li><strong>Secrets in logs:</strong> the backend logged the full <code>MONGO_URI</code>, password included, and Promtail shipped every line into Loki. Now only host and DB name are logged.</li>
  <li><strong>Liveness vs readiness:</strong> <code>/health</code> only checks that the process is alive; <code>/ready</code> checks MongoDB. If the database is down, restarting the API fixes nothing, so liveness must never check dependencies.</li>
  <li><strong>Graceful shutdown:</strong> on <code>SIGTERM</code> the API stops accepting connections, finishes in-flight requests, closes MongoDB and exits. The Dockerfile uses exec-form <code>CMD</code> so node is PID 1 and actually receives the signal.</li>
  <li><strong>Headers:</strong> <code>helmet</code> on the API; CSP, <code>X-Frame-Options: DENY</code>, <code>nosniff</code> and <code>server_tokens off</code> on nginx.</li>
</ul>

<h2>How I verify it</h2>
<p>Every fix has a check I can rerun:</p>
<pre><code>curl -s localhost:3000/api/ready                                              # {"status":"ready","db":true}
curl -s -o /dev/null -w '%{http_code}\\n' localhost:3000/api/metrics          # 404
curl -s -o /dev/null -w '%{http_code}\\n' -X DELETE localhost:3000/api/deals/x # 404
curl -s "localhost:3000/api/deals?search=(a%2B)%2B%24"                        # returns instantly
docker compose exec backend whoami                                            # node
docker compose exec frontend id -u                                            # 101</code></pre>

<h2>What I took away</h2>
<ul>
  <li>A security claim in a README is a liability until something tests it.</li>
  <li>Removing a feature is often a better fix than securing it.</li>
  <li>Container-level hardening has to come <em>before</em> Kubernetes, not after.</li>
</ul>
<p>One known gap remains: MongoDB inside Kubernetes still runs without auth. The next phase moves it to a StatefulSet with a Secret, along with NetworkPolicies and Pod Security Admission.</p>
`,
  },
  {
    slug: 'catching-over-permissive-iam-in-the-pull-request',
    title: 'Catching over-permissive IAM in the pull request, not in production',
    date: '2026-10-15',
    summary: 'Why I built Cloud Policy Guard: a small Python CLI that reads a Terraform plan, scores IAM risk, and fails the pipeline before a wildcard policy ever reaches AWS.',
    tags: ['Terraform', 'AWS IAM', 'Policy-as-Code', 'CI/CD'],
    project: 6,
    body: `
<p>Over-permissive IAM is one of the most common AWS misconfigurations: <code>"Action": "*"</code>, <code>iam:PassRole</code> granted on every resource, a trust policy with <code>"Principal": "*"</code>. The problem is usually found during an audit, <em>after</em> the policy has already been live for weeks.</p>
<p>I wanted that check to happen where the change is made: in the pull request. So I built <strong>Cloud Policy Guard</strong>, a Policy-as-Code security gate for Terraform.</p>

<h2>Scan the plan, not the account</h2>
<p>The tool reads the JSON form of a Terraform plan, which describes exactly what Terraform is about to create:</p>
<pre><code>terraform plan -out=tfplan
terraform show -json tfplan &gt; plan.json
cloud-policy-guard scan --terraform-plan plan.json</code></pre>
<p>Because it works on the plan file, it runs <strong>fully offline</strong> and needs no AWS credentials. Nothing has to be deployed, and no secrets have to be handed to the CI job.</p>

<h2>The rules</h2>
<table>
  <thead><tr><th>ID</th><th>Detects</th><th>Severity</th></tr></thead>
  <tbody>
    <tr><td>LP001</td><td>Wildcard action, <code>Action: "*"</code></td><td>Critical</td></tr>
    <tr><td>LP002</td><td>Wildcard resource, <code>Resource: "*"</code> (context-aware)</td><td>High / Medium</td></tr>
    <tr><td>LP003</td><td>Administrative permissions (<code>*</code> on <code>*</code>, or admin managed policies)</td><td>Critical</td></tr>
    <tr><td>LP004</td><td>Sensitive IAM actions such as <code>iam:PassRole</code>, <code>iam:PutRolePolicy</code></td><td>High</td></tr>
    <tr><td>LP005</td><td>Service-level wildcards such as <code>s3:*</code>, <code>iam:*</code>, <code>secretsmanager:*</code></td><td>High / Medium</td></tr>
    <tr><td>LP006</td><td>Broad trust policies, <code>Principal: "*"</code> or insecure cross-account trust</td><td>Critical</td></tr>
  </tbody>
</table>
<p>The rules are context-aware: they evaluate the combination of actions and resources to set the severity, instead of flagging every wildcard the same way.</p>

<h2>Turning findings into a pass/fail decision</h2>
<p>Each finding adds to a deterministic risk score: Critical = 10, High = 7, Medium = 4, Low = 1. A pipeline fails if any finding reaches the <code>fail_on</code> severity, or if the total score passes <code>max_risk_score</code>:</p>
<pre><code># .cpg.yaml
fail_on: critical       # fail if any finding is critical or worse
max_risk_score: 50      # fail if the total risk score exceeds 50
exclude_rules:
  - LP005               # rules can be disabled per repo
format: text            # text for humans, json for pipelines</code></pre>
<p>The exit code does the rest: <strong>0 for PASS, 1 for FAIL</strong>. Any CI system (GitHub Actions, GitLab CI, Jenkins) blocks the merge without extra integration work.</p>

<h2>In a GitHub Actions workflow</h2>
<pre><code>- name: Terraform Plan
  run: |
    terraform init
    terraform plan -out=tfplan
    terraform show -json tfplan &gt; plan.json

- name: Scan IAM least privilege
  # exit code 1 fails the job and blocks the PR
  run: cloud-policy-guard scan --terraform-plan plan.json</code></pre>

<h2>Testing it honestly</h2>
<p>The repo ships with a deliberately vulnerable Terraform example and a secure one. The vulnerable plan must FAIL and the secure plan must PASS, and a pytest suite keeps the rules from regressing. The tool is also containerised with Docker, so it behaves the same on my laptop and in CI.</p>

<h2>What I took away</h2>
<ul>
  <li>Shifting left only works if the check is fast, offline and gives a clear yes/no.</li>
  <li>A severity model plus a score threshold lets teams adopt a gate gradually instead of all at once.</li>
  <li>Two outputs matter: coloured text that developers will actually read, and JSON that pipelines can parse.</li>
</ul>
`,
  },
];

export function readingTime(html) {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
