/* ============================================================
   PROJECTS — Data, Filtering, Card Rendering, Modal
   ============================================================ */

// Card shows title + shortDesc + status. Modal is a short case study:
// fullDesc → problem → flow (how it works) → features → next. Full setup lives in the GitHub README.
const projects = [
  {
    id: 1,
    title: 'Deal Aggregator',
    status: 'In progress',
    shortDesc: 'A 3-tier app scraping Sri Lankan bank card promotions, taken through a full DevSecOps lifecycle: hardened containers, CI/CD with Trivy, Prometheus/Grafana/Loki observability and Kubernetes.',
    fullDesc: 'Scrapes live Sri Lankan bank card promotions from mypromo.lk into a React + Express + MongoDB web app. The app is the vehicle; the real work is taking it through every DevSecOps stage, from Docker Compose and CI/CD on AWS EC2 to observability, security hardening and Kubernetes.',
    problem: 'Card promotions are scattered across bank sites. Beyond solving that, I wanted one real application to harden step by step, the way a production service would be.',
    flow: ['Scraper (every 12h)', 'MongoDB', 'Express API', 'React + Nginx', 'Prometheus · Grafana · Loki'],
    image: '/assets/images/project-deal-aggregator.webp',
    tech: ['Docker', 'Kubernetes', 'GitHub Actions', 'Trivy', 'Prometheus', 'Grafana', 'Loki', 'AWS EC2', 'React', 'Node.js', 'MongoDB'],
    category: 'devops',
    github: 'https://github.com/Sulakshana29/Deal_Aggregator',
    live: null,
    features: [
      'CI/CD on GitHub Actions: lint → test → build → Trivy scan → Docker Hub → deploy to EC2',
      'Observability: Prometheus + cAdvisor metrics, Grafana dashboards, Loki + Promtail centralized logs',
      'API hardening: read-only public API, NoSQL-injection and ReDoS protection, per-IP rate limiting, Helmet + CSP',
      'Container hardening: non-root containers, nginx-unprivileged, pinned images, reproducible npm ci builds',
      'Minimal prod exposure: only port 80 public; DB, metrics and logs internal-only, Grafana via SSH tunnel',
      'Liveness vs readiness probes and graceful SIGTERM shutdown',
      'Runs on Kubernetes with Kustomize manifests',
    ],
    next: [
      'K8s hardening: StatefulSet, NetworkPolicies, Pod Security Admission, Ingress, HPA',
      'Blocking scans, SAST, SBOM and image signing in CI',
      'GitOps with Argo CD',
    ],
  },
  {
    id: 3,
    title: 'CyberX — Vulnerability Scanner',
    shortDesc: 'OWASP Top 10 vulnerability scanner built to detect common web application security flaws. Deployed on Render with a live demo available.',
    fullDesc: 'A comprehensive OWASP Top 10 vulnerability scanner designed to identify common web application security vulnerabilities. CyberX automates the detection of critical security flaws including injection attacks, broken authentication, XSS, security misconfigurations, and more. Features an intuitive web interface for easy scanning and detailed vulnerability reports.',
    image: '/assets/images/project-cyberx.webp',
    tech: ['Python', 'OWASP', 'Web Security', 'Scanning', 'Render'],
    category: 'security',
    github: 'https://github.com/Sulakshana29/CyberX',
    live: 'https://cyberx-6jjg.onrender.com/',
    features: [
      'Automated OWASP Top 10 vulnerability detection',
      'Web-based interface for scan management',
      'Detailed vulnerability reports with remediation guidance',
      'Covers injection attacks, broken auth, XSS, and more',
      'Live deployment on Render for easy access',
      'Designed for educational and ethical testing purposes',
    ],
  },
  {
    id: 2,
    title: 'Cloud SOC & Honeypot Detection Lab',
    status: 'In progress',
    shortDesc: 'Live Cowrie SSH honeypot on AWS capturing real attacker activity, feeding a serverless threat-hunting data lake and a Wazuh SIEM with MITRE ATT&CK-mapped detections. 100% Terraform.',
    fullDesc: 'A live Cowrie SSH honeypot captures real attacker activity from the public internet. Every login attempt, command and malware download is streamed to CloudWatch, then flows down two paths: a Lambda normalizes events into a partitioned S3 data lake queried with SQL through Athena, and a Wazuh SIEM runs custom detection rules mapped to MITRE ATT&CK. All AWS infrastructure is provisioned with Terraform, with no manual console clicks.',
    problem: 'Detection engineering is hard to learn on simulated logs. I wanted real attacker telemetry, which means exposing a machine to the internet without putting anything else at risk.',
    flow: ['Cowrie on EC2', 'CloudWatch Agent', 'Lambda normalizer', 'S3 data lake', 'Athena + Wazuh SIEM'],
    image: '/assets/images/project-cloud-soc.webp',
    screenshots: [
      { src: '/assets/images/screenshots/honeypot-terraform-state.png', caption: 'Every resource managed by Terraform (terraform state list)' },
      { src: '/assets/images/screenshots/honeypot-s3-datalake.png', caption: 'Normalized Cowrie events landing in the S3 data lake' },
    ],
    tech: ['Terraform', 'AWS', 'Cowrie', 'Wazuh', 'Lambda', 'Athena', 'Python', 'MITRE ATT&CK'],
    category: 'security',
    github: 'https://github.com/Sulakshana29/cloud-siem-honeypot',
    live: null,
    features: [
      'Real attacker telemetry from the public internet, not simulated data',
      'Custom Wazuh rules mapped to MITRE ATT&CK: brute force (time-window correlation), SSH key implants, cron persistence, cryptominers, malware downloads',
      'Hive-partitioned, AES-256 encrypted S3 data lake with ready-made Athena threat-hunting queries',
      'Least-privilege IAM per component: EC2 can only write to CloudWatch, Lambda can only PutObject to S3',
      'Isolated VPC, admin SSH locked to operator IP, honeypot runs as non-root',
      'Logs stream off-box in real time, so an attacker cannot tamper with them',
      'STRIDE threat model documented; whole lab runs for ~$8–10/month',
    ],
    next: [
      'SOAR: Wazuh alert → Lambda auto-blocks attacker IPs via WAF / NACL',
      'Threat-intel enrichment with AbuseIPDB, GreyNoise and VirusTotal',
      'tfsec + terraform validate in GitHub Actions',
    ],
  },
  {
    id: 4,
    title: 'Taskflow — CI/CD Task Scheduler',
    shortDesc: 'Containerized task manager (Node.js + PostgreSQL) shipped to AWS EC2 through a 5-stage GitHub Actions pipeline with Trivy image scanning.',
    fullDesc: 'A full-stack task and activity manager built with Node.js 22, Express, Prisma and PostgreSQL, containerized with Docker Compose and deployed to AWS EC2. Every push to main is tested, built, scanned and deployed automatically.',
    problem: 'Built to practise the full delivery path end to end: from a test suite, to a scanned container image, to a zero-touch deploy on a real server.',
    flow: ['npm test', 'Docker build', 'Trivy scan', 'Push to Docker Hub', 'SSH deploy to EC2'],
    image: '/assets/images/project-taskflow.webp',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Docker', 'GitHub Actions', 'Trivy', 'AWS EC2'],
    category: 'devops',
    github: 'https://github.com/Sulakshana29/cicd_1',
    live: null,
    features: [
      '5-stage CI/CD: Tests → Docker Build → Trivy Scan → Registry Push → EC2 Deploy',
      'Multi-container Docker Compose with automatic Prisma migrations on start',
      'Health check and real-time telemetry endpoints: uptime, RAM, Node.js version, DB health',
      'REST API with stats, CRUD and analytics endpoints',
      'Multi-view UI: List, Calendar Grid, Kanban Board, with dark/light theme',
      'CSV / JSON export and one-click Google Calendar export',
    ],
  },
  {
    id: 6,
    title: 'Cloud Policy Guard — IAM Least-Privilege Gate',
    shortDesc: 'Policy-as-Code CI gate that scans Terraform plans for AWS IAM least-privilege violations and blocks risky changes before they are deployed.',
    fullDesc: 'A CLI-first security gate that analyzes Terraform plan JSON for overly permissive AWS IAM, scores the risk, and fails the pipeline when it crosses a threshold, shifting IAM review left from production to the pull request.',
    problem: 'Over-permissive IAM (Action "*", iam:PassRole, Principal "*") is one of the most common AWS misconfigurations, and it is usually caught after deployment, if at all.',
    flow: ['terraform plan', 'plan.json', 'Cloud Policy Guard', 'PASS → deploy · FAIL → block'],
    image: '/assets/images/project-cloud-policy-guard.svg',
    tech: ['Python', 'Terraform', 'AWS IAM', 'Policy-as-Code', 'GitHub Actions', 'pytest'],
    category: ['security', 'devops'],
    github: 'https://github.com/Sulakshana29/Least-Privilege_Gate',
    live: null,
    features: [
      '6 context-aware rules: wildcard actions/resources, admin permissions, sensitive IAM actions, service-level wildcards, broad trust policies',
      'Deterministic risk scoring with a configurable max-risk ceiling',
      'Drop-in CI gate: exit code 0/1 blocks GitHub Actions, GitLab CI or Jenkins pipelines',
      'Runs fully offline on plan JSON, with no AWS credentials needed',
      'Coloured terminal output for developers, JSON output for pipelines, configurable via .cpg.yaml',
      'Vulnerable vs secure Terraform examples and a pytest test suite',
    ],
  },
  {
    id: 5,
    title: 'PortSwigger Vulnerability Labs',
    shortDesc: 'Hands-on web application security labs covering common vulnerabilities including file upload, authentication, injection, XSS, and security misconfigurations using Burp Suite.',
    fullDesc: 'A comprehensive documentation of hands-on web security labs based on PortSwigger Web Security Academy. Covers real-world web vulnerabilities including File Upload Vulnerabilities, Authentication and Access Control, Injection Attacks, Cross-Site Scripting (XSS), and Security Misconfigurations. All techniques tested using Burp Suite, Browser DevTools, and custom payloads in legal lab environments. Designed to build a strong foundation for ethical hacking and bug bounty hunting.',
    image: '/assets/images/project-portswigger.webp',
    tech: ['Burp Suite', 'Web Security', 'OWASP', 'Pentesting', 'XSS', 'SQLi'],
    category: 'security',
    github: 'https://github.com/Sulakshana29/Port-Swigger-Web-Security-Labs',
    live: null,
    features: [
      'File Upload vulnerability exploitation & mitigation',
      'Authentication & Access Control bypass techniques',
      'SQL Injection attack patterns and defenses',
      'Cross-Site Scripting (XSS) — reflected, stored, DOM-based',
      'Security misconfiguration identification',
      'Burp Suite & Browser DevTools for manual testing',
      'Custom payload crafting for ethical penetration testing',
    ],
  },
  {
    id: 7,
    title: 'AI-Sec — LLM Security Gateway',
    status: 'In progress',
    shortDesc: 'FastAPI reverse proxy between internal apps and LLM providers, enforcing OWASP Top 10 for LLMs guardrails: prompt-injection firewall, PII redaction and outbound secret scanning.',
    fullDesc: 'A lightweight reverse proxy that sits between internal client applications and upstream LLM providers (Google Gemini / OpenAI). It inspects prompts on the way out and responses on the way back, blocking jailbreaks, redacting sensitive data and catching leaked secrets, while keeping provider API keys away from clients.',
    problem: 'Teams adopting LLMs send internal data to third-party APIs with no inspection layer. Prompt injection, PII leakage and secrets in responses are now top risks (OWASP Top 10 for LLMs).',
    flow: ['Client app', 'Injection firewall + PII redaction', 'LLM provider', 'Secret scanning', 'JSON audit log → SIEM'],
    image: '/assets/images/project-ai-sec.svg',
    tech: ['Python', 'FastAPI', 'OWASP LLM Top 10', 'Docker', 'Gemini', 'OpenAI'],
    category: 'security',
    github: 'https://github.com/Sulakshana29/AI-Sec',
    live: null,
    features: [
      'Prompt-injection firewall that blocks jailbreak attempts before they reach the model',
      'PII redaction (DLP): strips emails and card numbers from prompts before they leave the network',
      'Outbound secret scanning: intercepts responses that leak AWS keys or passwords',
      'SIEM-ready structured JSON audit logs for Wazuh, Splunk or ELK',
      'Provider API keys held server-side, so clients never see them',
      'Stateless, Dockerized microservice ready for Kubernetes or ECS',
    ],
  },
];

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'devops', label: 'DevOps & Cloud' },
  { key: 'security', label: 'Security' },
];

let activeFilter = 'all';
let lastFocusedCard = null;

const GITHUB_ICON = '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>';
const EXTERNAL_ICON = '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>';

const inCategory = (project, key) => [].concat(project.category).includes(key);

export function initProjects() {
  renderFilters();
  renderProjects();
  initModal();
}

function renderFilters() {
  const container = document.getElementById('project-filters');
  container.innerHTML = categories.map(cat =>
    `<button class="filter-btn ${cat.key === activeFilter ? 'active' : ''}" data-filter="${cat.key}" id="filter-${cat.key}">${cat.label}</button>`
  ).join('');

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects();
  });
}

function renderProjects() {
  const container = document.getElementById('projects-grid');
  const filtered = activeFilter === 'all' ? projects : projects.filter(p => inCategory(p, activeFilter));

  container.innerHTML = filtered.map(project => `
    <div class="glass-card project-card reveal" data-project-id="${project.id}" id="project-card-${project.id}" tabindex="0" role="button" aria-label="Open details for ${project.title}">
      <div class="project-card-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;background:var(--bg-tertiary);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:3rem\\'>🚀</div>'" />
        ${project.status ? `<span class="project-status">${project.status}</span>` : ''}
        <div class="project-card-overlay">
          <div class="project-card-actions">
            ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" onclick="event.stopPropagation()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">${GITHUB_ICON}</svg>
              GitHub
            </a>` : ''}
            ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" onclick="event.stopPropagation()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${EXTERNAL_ICON}</svg>
              Live Demo
            </a>` : ''}
          </div>
        </div>
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${project.title}</h3>
        <p class="project-card-desc">${project.shortDesc}</p>
        <div class="project-card-tags">
          ${project.tech.slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('')}
          ${project.tech.length > 4 ? `<span class="tag">+${project.tech.length - 4}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Re-init scroll animations for new cards
  requestAnimationFrame(() => {
    const newReveals = container.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    newReveals.forEach(el => observer.observe(el));
  });
}

function initModal() {
  const overlay = document.getElementById('project-modal-overlay');
  const closeBtn = document.getElementById('project-modal-close');

  // Open modal on card click, or from any [data-open-project] link (e.g. Skills "Used in")
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open-project]');
    if (opener) {
      openModal(parseInt(opener.dataset.openProject));
      return;
    }
    const card = e.target.closest('.project-card');
    if (!card) return;
    // Don't open modal if clicking a link
    if (e.target.closest('a')) return;
    const id = parseInt(card.dataset.projectId);
    openModal(id);
  });

  // Keyboard: Enter / Space on a focused card opens it
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.project-card');
    if (!card || e.target !== card) return;
    e.preventDefault();
    openModal(parseInt(card.dataset.projectId));
  });

  // Close modal
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;

  const overlay = document.getElementById('project-modal-overlay');
  const imageContainer = document.getElementById('project-modal-image');
  const content = document.getElementById('project-modal-content');

  imageContainer.innerHTML = `<img src="${project.image}" alt="${project.title}" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;background:var(--bg-tertiary);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:4rem\\'>🚀</div>'" />`;

  content.innerHTML = `
    <h3 class="project-modal-title">${project.title}</h3>
    ${project.status ? `<span class="project-status project-status-inline">${project.status}</span>` : ''}
    <p class="project-modal-desc">${project.fullDesc}</p>
    ${project.problem ? `
    <div class="project-modal-section">
      <h4>Why I built it</h4>
      <p>${project.problem}</p>
    </div>` : ''}
    ${project.flow ? `
    <div class="project-modal-section">
      <h4>How it works</h4>
      <ol class="project-flow">
        ${project.flow.map(step => `<li>${step}</li>`).join('')}
      </ol>
    </div>` : ''}
    <div class="project-modal-features">
      <h4>What I built</h4>
      <ul>
        ${project.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>
    ${project.screenshots ? `
    <div class="project-modal-section">
      <h4>Screenshots</h4>
      <div class="project-screenshots">
        ${project.screenshots.map(s => `
        <figure>
          <a href="${s.src}" target="_blank" rel="noopener noreferrer"><img src="${s.src}" alt="${s.caption}" loading="lazy" /></a>
          <figcaption>${s.caption}</figcaption>
        </figure>`).join('')}
      </div>
    </div>` : ''}
    ${project.next ? `
    <div class="project-modal-features project-modal-next">
      <h4>What's next</h4>
      <ul>
        ${project.next.map(n => `<li>${n}</li>`).join('')}
      </ul>
    </div>` : ''}
    <div class="project-modal-tags">
      ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <div class="project-modal-links">
      ${project.github ? `<a href="${project.github}#readme" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">${GITHUB_ICON}</svg>
        Full README & Code
      </a>` : ''}
      ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${EXTERNAL_ICON}</svg>
        Live Demo
      </a>` : ''}
    </div>
  `;

  lastFocusedCard = document.activeElement;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  overlay.querySelector('.project-modal').scrollTop = 0;
  document.getElementById('project-modal-close').focus();
}

function closeModal() {
  const overlay = document.getElementById('project-modal-overlay');
  if (!overlay.classList.contains('active')) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  if (lastFocusedCard) lastFocusedCard.focus();
}
