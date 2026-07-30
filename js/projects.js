/* ===== projects.js — logic for pages/projects.html ===== */

/* ---- tech metadata: real devicon / Font Awesome logos per technology ---- */
const TECH = {
    /* languages & runtimes */
    "Java":           { icon: "devicon-java-plain colored" },
    "JavaScript":     { icon: "devicon-javascript-plain colored" },
    "TypeScript":     { icon: "devicon-typescript-plain colored" },
    "PHP":            { icon: "devicon-php-plain colored" },
    "Python":         { icon: "devicon-python-plain colored" },
    "C":              { icon: "devicon-c-plain colored" },
    "Bash Scripting": { icon: "devicon-bash-plain colored" },
    "Shell Scripting":{ icon: "devicon-bash-plain colored" },

    /* web / frameworks */
    "React":          { icon: "devicon-react-original colored" },
    "React Native":   { icon: "devicon-react-original colored" },
    "JSX":            { icon: "devicon-react-original colored" },
    "Node.js":        { icon: "devicon-nodejs-plain colored" },
    "GraphQL":        { icon: "devicon-graphql-plain colored" },
    "Tailwind CSS":   { icon: "devicon-tailwindcss-plain colored" },

    /* build / deploy / systems */
    "Maven":          { icon: "devicon-maven-plain colored" },
    "Docker":         { icon: "devicon-docker-plain colored" },
    "Kubernetes":     { icon: "devicon-kubernetes-plain colored" },
    "Linux":          { icon: "devicon-linux-plain colored" },
    "Apache":         { icon: "devicon-apache-plain colored" },
    "Vercel":         { fa: "fa-solid fa-rocket",   color: "#e7ecf7" },
    "Make":           { fa: "fa-solid fa-hammer",   color: "#9ca3af" },

    /* databases */
    "SQL":            { icon: "devicon-mysql-plain colored" },
    "MySQL":          { icon: "devicon-mysql-plain colored" },
    "IBM Db2":        { fa: "fa-solid fa-database",  color: "#4589ff" },
    "Firebase":       { icon: "devicon-firebase-plain colored" },
    "Weaviate":       { fa: "fa-solid fa-database",  color: "#21ce99" },

    /* observability / data / AI */
    "Grafana":        { icon: "devicon-grafana-original colored" },
    "Prometheus":     { icon: "devicon-prometheus-original colored" },
    "Loki":           { fa: "fa-solid fa-layer-group", color: "#7fd1e8" },
    "Node Exporter":  { fa: "fa-solid fa-chart-line",  color: "#8bd17c" },
    "Power BI":       { fa: "fa-solid fa-chart-bar",   color: "#f2c811" },
    "Cube.js":        { fa: "fa-solid fa-cube",        color: "#fa5a6f" },
    "Airbyte":        { fa: "fa-solid fa-paper-plane", color: "#6a6aef" },
    "dbt":            { fa: "fa-solid fa-layer-group", color: "#ff694b" },
    "Ollama":         { fa: "fa-solid fa-robot",       color: "#e7ecf7" },
    "RAG":            { fa: "fa-solid fa-brain",       color: "#b794f4" },
    "AI/ML":          { fa: "fa-solid fa-brain",       color: "#b794f4" },

    /* devtools / testing / integration */
    "Servlet":        { icon: "devicon-java-plain colored" },
    "Postman":        { icon: "devicon-postman-plain colored" },
    "Moodle":         { fa: "fa-solid fa-graduation-cap", color: "#f98012" },
    "Wireshark":      { fa: "fa-solid fa-network-wired", color: "#1679a7" },
    "REST APIs":      { fa: "fa-solid fa-plug",          color: "#a0aec0" },
    "Red Hat":        { icon: "devicon-redhat-plain colored" },
    "Networking":     { fa: "fa-solid fa-wifi",          color: "#63b3ed" },
    "n8n":            { fa: "fa-solid fa-project-diagram", color: "#ea4b71" },
    "Azure":          { icon: "devicon-azure-plain colored" },
};

function iconHtml(name) {
    const meta = TECH[name] || { fa: "fa-solid fa-code", color: "#8892ab" };
    if (meta.icon) {
        return `<i class="${meta.icon}"></i>`;
    }
    return `<i class="${meta.fa}" style="color:${meta.color}"></i>`;
}

/* ---- live project ---- */
const liveProject = {
    tech: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Vercel"]
};

const liveTechRow = document.getElementById('liveTechRow');
liveTechRow.innerHTML = liveProject.tech.map(t =>
    `<span class="tech-chip" style="cursor:default;">${iconHtml(t)}<span>${t}</span></span>`
).join('');

const liveCard = document.getElementById('liveCard');
liveCard.addEventListener('click', (e) => {
    if (e.target.closest('.live-visit')) return;
    liveCard.classList.toggle('expanded');
});

/* ---- mobile nav toggle ---- */
const hamburger = document.getElementById('hamburger');
const navbar    = document.getElementById('navbar');
hamburger.addEventListener('click', () => navbar.classList.toggle('open'));
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
        navbar.classList.remove('open');
    }
});

/* ---- project data (merged old + sample.txt) ---- */
const projects = [
    {
        title: "OUSL Smart Academic Assistant",
        role: "Developer",
        bullets: [
            "Developed Moodle plugins for GPA calculation and academic progress tracking.",
            "Built an AI-powered academic chatbot using RAG architecture.",
            "Integrated Ollama-based local LLM models and Weaviate vector database."
        ],
        tech: ["Moodle", "PHP", "MySQL", "JavaScript", "Apache", "Ollama", "Weaviate", "RAG", "Linux", "Docker"]
    },
    {
        title: "Smart Grocery Shopping Assistant",
        role: "Developer",
        bullets: [
            "AI-powered web application to manage grocery lists efficiently.",
            "Predicts missing items, suggests healthier alternatives, and provides expiry reminders."
        ],
        tech: ["React", "JavaScript", "Firebase"]
    },
    {
        title: "Engineering Analytics Platform",
        role: "Data Engineer",
        bullets: [
            "Designed end-to-end engineering analytics platform for cost and productivity insights.",
            "Built automated pipelines using Airbyte and semantic data layer with Cube.js.",
            "Designed interactive Power BI dashboards for cost distribution."
        ],
        tech: ["Power BI", "Cube.js", "Airbyte", "dbt"]
    },
    {
        title: "Model Compiler in C",
        role: "Developer",
        bullets: [
            "Designed and implemented a model compiler in C as an individual mini-project.",
            "Covered lexical, syntax, semantic analysis, and target code generation."
        ],
        tech: ["C", "Make"]
    },
    {
        title: "Custom n8n Node Development",
        role: "Developer",
        bullets: [
            "Designed custom n8n nodes using JavaScript, TypeScript, and Node.js.",
            "Built automated workflows to streamline API integrations and business operations."
        ],
        tech: ["n8n", "TypeScript", "Node.js", "Docker"]
    },
    {
        title: "Event Hub",
        role: "Developer",
        bullets: [
            "Developed Event Hub application connecting multiple data sources to Azure Event Hub.",
            "Implemented secure, reusable API connector to handle event publishing."
        ],
        tech: ["TypeScript", "Node.js", "Azure"]
    },
    {
        title: "Merchant Wallet & IPG System",
        role: "QA",
        bullets: [
            "Digital payment and wallet management platform for a telecom client.",
            "Performed functional, regression, and integration testing for wallet modules."
        ],
        tech: ["MySQL", "Apache"]
    },
    {
        title: "Campaign Management System",
        role: "Developer Associate, Production Support",
        bullets: [
            "Bonus offering for SIM users based on user profile and transactions.",
            "Worked on production-related issues and solved many critical system problems.",
            "Worked with technologies such as Java, Servlet, JSX, Bash Scripting, Maven."
        ],
        tech: ["Java", "Servlet", "JSX", "Bash Scripting", "Maven"]
    },
    {
        title: "Customer Segmentation & Rewards",
        role: "QA & Manual Tester",
        bullets: [
            "Worked on a segmentation and rewarding application supporting peak-level promotions.",
            "Conducted bug fixing and manual testing on over 1000 modules."
        ],
        tech: ["SQL", "IBM Db2", "Java", "Node.js", "GraphQL"]
    },
    {
        title: "Mobile Number Portability",
        role: "QA & API Tester",
        bullets: [
            "Mobile number portability enabling SIM card network conversion while keeping phone number.",
            "Implemented testing servers, API simulators, and testing pipelines."
        ],
        tech: ["Java", "Postman", "Wireshark", "REST APIs", "MySQL"]
    },
    {
        title: "System Monitoring Dashboard",
        role: "Developer",
        bullets: [
            "Architected a system monitoring dashboard for clustered servers.",
            "Created dashboards with Grafana, Prometheus, Promtail, Loki, and Node Exporter."
        ],
        tech: ["Grafana", "Prometheus", "Loki", "Node Exporter"]
    },
    {
        title: "Wi-Fi Authentication App",
        role: "QA",
        bullets: [
            "Mobile Wi-Fi authentication application for network user authentication.",
            "Implemented testing servers and API simulators with networking tools."
        ],
        tech: ["Red Hat", "Shell Scripting", "MySQL", "Networking"]
    },
    {
        title: "Education Suggestion System",
        role: "Full Stack Developer",
        bullets: [
            "Built an educational suggestion system to help students focus on areas of improvement.",
            "Full SDLC including requirements gathering and system maintenance."
        ],
        tech: ["PHP", "Firebase", "React Native", "MySQL", "JavaScript"]
    },
    {
        title: "Other Contributions",
        role: "Developer & Researcher",
        bullets: [
            "Built chatbots, web interfaces, and sample web pages in different frameworks.",
            "Conducted research and development in Kubernetes, Docker, AI, and machine learning.",
            "Completed numerous certifications and training in data science and various technologies."
        ],
        tech: ["Python", "Docker", "Kubernetes", "AI/ML"]
    }
];

/* ---- filter state ---- */
let selected = new Set();

/* ---- build filter bar ---- */
const filterBar = document.getElementById('filterBar');
const uniqueTech = [...new Set(projects.flatMap(p => p.tech))].sort();

uniqueTech.forEach(name => {
    const btn = document.createElement('button');
    btn.className = 'tech-chip';
    btn.dataset.tech = name;
    btn.innerHTML = `${iconHtml(name)}<span>${name}</span>`;
    btn.addEventListener('click', () => toggleTech(name));
    filterBar.appendChild(btn);
});

const clearBtn = document.createElement('button');
clearBtn.className = 'clear-btn';
clearBtn.textContent = 'Clear filters';
clearBtn.addEventListener('click', () => { selected.clear(); renderAll(); });
filterBar.appendChild(clearBtn);

function toggleTech(name) {
    if (selected.has(name)) selected.delete(name);
    else selected.add(name);
    renderAll();
}

function chipHtml(name) {
    const active = selected.has(name) ? 'active' : '';
    return `<button class="tech-chip ${active}" data-tech="${name}">${iconHtml(name)}<span>${name}</span></button>`;
}

function renderGrid() {
    const grid = document.getElementById('grid');
    
    let displayProjects = [...projects];
    if (selected.size > 0) {
        displayProjects.sort((a, b) => {
            const aMatch = a.tech.some(t => selected.has(t)) ? 1 : 0;
            const bMatch = b.tech.some(t => selected.has(t)) ? 1 : 0;
            return bMatch - aMatch;
        });
    }

    grid.innerHTML = displayProjects.map(p => {
        const dim = selected.size > 0 && !p.tech.some(t => selected.has(t));
        return `
      <div class="pcard ${dim ? 'dim' : ''}">
        <h3>${p.title}</h3>
        <div class="role-line"><b>Role:</b>&nbsp;${p.role}</div>
        <ul class="bullets">${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        <div class="tags">${p.tech.map(t => chipHtml(t)).join('')}</div>
      </div>`;
    }).join('');

    grid.querySelectorAll('.tech-chip').forEach(btn => {
        btn.addEventListener('click', () => toggleTech(btn.dataset.tech));
    });
}

function renderFilterBarState() {
    filterBar.querySelectorAll('.tech-chip').forEach(btn => {
        btn.classList.toggle('active', selected.has(btn.dataset.tech));
    });
}

function renderCount() {
    const el = document.getElementById('filterCount');
    if (selected.size === 0) {
        el.textContent = `Showing all ${projects.length} projects`;
        return;
    }
    const matching = projects.filter(p => p.tech.some(t => selected.has(t))).length;
    el.textContent = `Showing ${matching} of ${projects.length} projects — filtered by ${[...selected].join(', ')}`;
}

function renderAll() {
    renderFilterBarState();
    renderGrid();
    renderCount();
}

renderAll();
