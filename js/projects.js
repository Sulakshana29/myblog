/* ============================================================
   PROJECTS — Data, Filtering, Card Rendering, Modal
   ============================================================ */

const projects = [
  {
    id: 1,
    title: 'Deal Aggregator',
    shortDesc: 'Cloud-native 3-tier deal aggregation platform deployed on AWS EC2 with Docker, Prometheus, and Grafana. Being extended with Kubernetes, Terraform, centralized logging, and security automation.',
    fullDesc: 'A portfolio-grade DevSecOps project demonstrating Docker, Kubernetes, CI/CD, and security engineering. Scrapes live Sri Lankan bank card promotions from mypromo.lk into a 3-tier web app. Built with React + Vite frontend, Express API backend, and MongoDB, all orchestrated with Docker Compose. Includes production-grade monitoring with Prometheus and Grafana, centralized logging with Loki, and Kubernetes deployment manifests.',
    image: '/assets/images/project-deal-aggregator.webp',
    tech: ['Docker', 'AWS EC2', 'Kubernetes', 'Prometheus', 'Grafana', 'React', 'Node.js', 'MongoDB', 'Loki'],
    category: 'devops',
    github: 'https://github.com/Sulakshana29/Deal_Aggregator',
    live: null,
    features: [
      '3-tier architecture: React + Vite → Express API → MongoDB',
      'Full Docker Compose production deployment',
      'Prometheus metrics & Grafana dashboards for real-time monitoring',
      'Kubernetes deployment with Helm charts (Phase 8)',
      'Centralized logging with Grafana Loki',
      'GitHub Actions CI/CD pipeline',
      'Automated web scraping with Cheerio',
    ],
  },
  {
    id: 2,
    title: 'Cloud SOC & Honeypot Detection Lab',
    shortDesc: 'Cloud-based security monitoring lab using Cowrie SSH honeypot to capture and analyze malicious activity, with centralized logging, detection, alerting, and infrastructure automation using Terraform.',
    fullDesc: 'A fully automated, cloud-based threat intelligence gathering environment. Deploys a highly interactive SSH/Telnet honeypot (Cowrie) that safely captures attacker activity from the public internet. All infrastructure is provisioned with Terraform on AWS. The honeypot data is normalized and forwarded to a SIEM for threat intelligence and visualization. Strict blast-radius containment with isolated VPC, IP-restricted admin access, and low-privilege execution.',
    image: '/assets/images/project-cloud-soc.webp',
    tech: ['Terraform', 'AWS', 'Cowrie', 'Python', 'VPC', 'EC2', 'SIEM'],
    category: 'security',
    github: 'https://github.com/Sulakshana29/cloud-siem-honeypot',
    live: null,
    features: [
      'Terraform IaC for AWS infrastructure (VPC, EC2, Security Groups)',
      'Cowrie SSH/Telnet honeypot for capturing attacker activity',
      'Python log processing & normalization pipeline',
      'SIEM integration for threat intelligence visualization',
      'Isolated VPC with zero production peering',
      'Strict blast-radius containment strategy',
      'Admin access restricted to operator IP only',
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
    id: 4,
    title: 'Taskflow — CI/CD Task Scheduler',
    shortDesc: 'Enterprise-ready, containerized Universal Task & Activity Manager deployed to AWS EC2 with a full 5-stage GitHub Actions CI/CD pipeline.',
    fullDesc: 'An enterprise-ready, containerized Universal Task & Activity Manager designed to schedule both daily activities and DevOps engineering tasks. Built with Node.js 22, Express, Prisma ORM, and PostgreSQL, fully containerized with Docker & Docker Compose, deployed to AWS EC2, and automated via a multi-stage GitHub Actions CI/CD Pipeline. Features include multi-view UI (List, Calendar Grid, Kanban Board), dark/light theme, Google Calendar export, CSV/JSON data export, and real-time system telemetry dashboard.',
    image: '/assets/images/project-taskflow.webp',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Docker', 'GitHub Actions', 'AWS EC2'],
    category: 'devops',
    github: 'https://github.com/Sulakshana29/cicd_1',
    live: null,
    features: [
      '5-stage CI/CD: Tests → Docker Build → Trivy Scan → Registry Push → EC2 Deploy',
      'Multi-view UI: List, Calendar Grid, Kanban Board',
      'Dark/Light glassmorphic theme with localStorage persistence',
      'One-click Google Calendar export',
      'CSV & JSON data export/backup',
      'Real-time DevOps telemetry: uptime, RAM, Node.js version, DB health',
      'Multi-container Docker Compose with Prisma migrations',
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
];

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'devops', label: 'DevOps & Cloud' },
  { key: 'security', label: 'Security' },
];

let activeFilter = 'all';

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
  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);

  container.innerHTML = filtered.map(project => `
    <div class="glass-card project-card reveal" data-project-id="${project.id}" id="project-card-${project.id}">
      <div class="project-card-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;background:var(--bg-tertiary);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:3rem\\'>🚀</div>'" />
        <div class="project-card-overlay">
          <div class="project-card-actions">
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" onclick="event.stopPropagation()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" onclick="event.stopPropagation()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
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

  // Open modal on card click
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    // Don't open modal if clicking a link
    if (e.target.closest('a')) return;
    const id = parseInt(card.dataset.projectId);
    openModal(id);
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
    <p class="project-modal-desc">${project.fullDesc}</p>
    <div class="project-modal-tags">
      ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <div class="project-modal-features">
      <h4>Key Features</h4>
      <ul>
        ${project.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>
    <div class="project-modal-links">
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        View on GitHub
      </a>
      ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        Live Demo
      </a>` : ''}
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('project-modal-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}
