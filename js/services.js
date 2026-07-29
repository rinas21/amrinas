const services = [
  {
    file: "web-development.tsx",
    badge: "TSX", badgeColor: "#7fd1e8",
    title: "Web Development",
    preview: "Responsive, dynamic web apps in React & JavaScript.",
    comment: [
      "Builds responsive, dynamic web apps with React",
      "and modern JavaScript — front-end wired cleanly",
      "to back-end services."
    ],
    commentStyle: "block",
    code: `<span class="kw">const</span> skills = [<span class="st">'React'</span>, <span class="st">'JavaScript'</span>, <span class="st">'REST APIs'</span>, <span class="st">'Responsive UI'</span>];`,
    tags: ["React","JavaScript","REST APIs","Responsive Design"]
  },
  {
    file: "ui-ux-design.fig",
    badge: "FIG", badgeColor: "#c792ea",
    title: "UI / UX Design",
    preview: "Clean, user-first interfaces designed for real usability.",
    comment: [
      "Clean, user-first interfaces designed for",
      "usability — not just visuals — across every",
      "screen size and platform."
    ],
    commentStyle: "line",
    code: `<span class="kw">const</span> skills = [<span class="st">'Wireframing'</span>, <span class="st">'Prototyping'</span>, <span class="st">'Usability Testing'</span>];`,
    tags: ["Wireframing","Prototyping","Usability Testing","Design Systems"]
  },
  {
    file: "JavaAndroidDev.java",
    badge: "JAVA", badgeColor: "#e8a15c",
    title: "Java & Android Development",
    preview: "Native & hybrid Android apps on a solid Java core.",
    comment: [
      "Native & hybrid Android apps built in Android",
      "Studio, on a strong core-Java foundation."
    ],
    commentStyle: "javadoc",
    code: `<span class="kw">String[]</span> skills = {<span class="st">"Java"</span>, <span class="st">"Android Studio"</span>, <span class="st">"Native Apps"</span>, <span class="st">"Hybrid Apps"</span>};`,
    tags: ["Java","Android Studio","Native & Hybrid","Mobile UI"]
  },
  {
    file: "automation.test.ts",
    badge: "TEST", badgeColor: "#7fb0f2",
    title: "QA & Automation Testing",
    preview: "Manual + automated suites that catch regressions early.",
    comment: [
      "Manual + automated test suites. Selenium and",
      "Katalon scripts that catch regressions before",
      "users ever do."
    ],
    commentStyle: "line",
    code: `<span class="kw">describe</span>(<span class="st">'coverage'</span>, () => run([<span class="st">'Selenium'</span>, <span class="st">'Katalon'</span>]));`,
    tags: ["Selenium","Katalon","Manual QA","Regression Testing"]
  },
  {
    file: "pipeline.yml",
    badge: "YML", badgeColor: "#f78fb3",
    title: "Git & CI/CD Pipelines",
    preview: "Version control and GitLab CI/CD deployment pipelines.",
    comment: [
      "Version control with Git, and deployment",
      "pipelines wired up for continuous integration",
      "in GitLab."
    ],
    commentStyle: "hash",
    code: `skills: [<span class="st">Git</span>, <span class="st">GitLab CI/CD</span>, <span class="st">Version Control</span>]`,
    tags: ["Git","GitLab CI/CD","Version Control","Deploy Automation"]
  },
  {
    file: "schema.sql",
    badge: "SQL", badgeColor: "#82aaff",
    title: "Database Development",
    preview: "MySQL & MongoDB schemas built for integrity and speed.",
    comment: [
      "MySQL & MongoDB schemas built for data",
      "integrity, fast queries, and easy long-term",
      "maintenance."
    ],
    commentStyle: "sql",
    code: `<span class="kw">SELECT</span> * <span class="kw">FROM</span> skills <span class="kw">WHERE</span> stack <span class="kw">IN</span> (<span class="st">'MySQL'</span>, <span class="st">'MongoDB'</span>);`,
    tags: ["MySQL","MongoDB","Query Optimization","Data Integrity"]
  },
  {
    file: "security.audit.sh",
    badge: "SH", badgeColor: "#8bd17c",
    title: "Performance & Security Testing",
    preview: "Stress, load & OWASP-based security testing.",
    comment: [
      "Stress and load testing for performance,",
      "OWASP-based checks to close security gaps",
      "before they ship."
    ],
    commentStyle: "hash",
    code: `skills=(<span class="st">"Load Testing"</span> <span class="st">"Stress Testing"</span> <span class="st">"OWASP"</span>)`,
    tags: ["Load Testing","Stress Testing","OWASP","Vulnerability Testing"]
  }
];

function commentLines(svc){
  const c = svc.comment;
  let lines = [];
  if(svc.commentStyle === "block" || svc.commentStyle === "javadoc"){
    lines.push(`<span class="cm">/**</span>`);
    c.forEach(l => lines.push(`<span class="cm"> * ${l}</span>`));
    lines.push(`<span class="cm"> */</span>`);
  } else if(svc.commentStyle === "line"){
    c.forEach(l => lines.push(`<span class="cm">// ${l}</span>`));
  } else if(svc.commentStyle === "hash"){
    c.forEach(l => lines.push(`<span class="cm"># ${l}</span>`));
  } else if(svc.commentStyle === "sql"){
    c.forEach(l => lines.push(`<span class="cm">-- ${l}</span>`));
  }
  return lines;
}

const rowsEl = document.getElementById('rows');
document.getElementById('statCount').textContent = services.length + ' files';

services.forEach((svc) => {
  const details = document.createElement('details');
  details.className = 'file-row';

  const lines = commentLines(svc);
  let lineNum = 1;
  let codeHtml = '';
  lines.forEach(l => {
    codeHtml += `<div class="code-line"><span class="ln">${lineNum++}</span><span>${l}</span></div>`;
  });
  codeHtml += `<div class="code-line"><span class="ln">${lineNum++}</span><span>${svc.code}<span class="cursor"></span></span></div>`;

  details.innerHTML = `
    <summary>
      <span class="badge" style="color:${svc.badgeColor}">${svc.badge}</span>
      <span class="row-main">
        <span class="fname">${svc.file}</span>
        <span class="title">${svc.title}</span>
      </span>
      <span class="row-summary-line">${svc.preview}</span>
      <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    </summary>
    <div class="row-body">
      <div class="code-block">
        ${codeHtml}
        <div class="tag-row">${svc.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `;

  rowsEl.appendChild(details);
// Scroll Animation: Automatically open details when scrolled into view

  const detailsElements = document.querySelectorAll('#rows details');
  
  if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.open = true;
        } else {
          entry.target.open = false;
        }
      });
    }, {
      root: null,
      rootMargin: '0px', // trigger when fully visible to prevent layout thrashing
      threshold: 0
    });
    
    detailsElements.forEach(detail => observer.observe(detail));
  }
});
