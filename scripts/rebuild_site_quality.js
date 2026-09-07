const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOGS = path.join(ROOT, 'blogs');
const BLOG_INDEX = path.join(ROOT, 'pages', 'blog.html');
const FEED = path.join(ROOT, 'feed.xml');
const SITEMAP = path.join(ROOT, 'sitemap.xml');

const INDEX_OVERRIDES = {
  'error-explanation-why-it-happens-how-to-fix': { remove: true },
  'error-message': { file: 'tomcat-keystore-tampered-or-password-incorrect.html', title: 'Fix Tomcat Error: Keystore Was Tampered With or Password Incorrect', category: 'Tech', date: '2026-07-06' },
  'note': { file: 'apache-http-server-compile-error-pcre-not-found.html', title: 'Fix Apache HTTP Server Compile Error: PCRE Not Found', category: 'Tech', date: '2026-07-18' },
  'notes-for-2025-04-10': { file: 'apache-build-error-apr-not-found-fix.html', title: 'Fix Apache HTTP Server Build Error: APR Not Found', category: 'DevOps', date: '2026-07-19' },
  'notes-for-2025-04-30': { file: 'replace-overwrite-files-in-ubuntu.html', title: 'How to Replace or Overwrite Files in Ubuntu Linux', category: 'Tech', date: '2026-07-20' },
  'the-order-by-clause-does-not-work-with-distinct-in-that-way-if-you-want-to-order-the-results-by-the-name-column-you-should-simply-use': { file: 'sql-order-by-does-not-work-with-distinct.html', title: 'SQL: Why ORDER BY Does Not Work with DISTINCT', category: 'Databases', date: '2026-08-01' },
  'this-is-a-overview-of-configuring-one-way-ssl-between-tomcat-and-keycloak': { file: 'configuring-one-way-ssl-tomcat-keycloak.html', title: 'Configuring One-Way SSL Between Tomcat and Keycloak', category: 'DevOps', date: '2026-08-02' },
  'developer-notes-april-8-2025': { file: 'fix-java-virtual-machine-error-linux.html', title: 'Fixing Java JVM Initialization Error: HPI Library Not Found', category: 'DevOps', date: '2026-06-24' }
};

const TITLE_OVERRIDES = {
  'sed-command-and-its-different-usages': { title: 'Sed Command and Its Different Usages' },
  'java-binary-instalation-on-ubuntu': { title: 'Installing the Java Binary on Ubuntu' },
  'fix-java-virtual-machine-error-linux': { title: 'Fixing "Could Not Initialize Java Virtual Machine" on Linux', excerpt: 'Fix the Oracle JDK error "Could not initialize Java Virtual Machine / Error trying to initialize HPI library" on Linux by installing the missing 32-bit compatibility libraries.' },
  'file-permissions-in-linux-owner-group-others': { title: 'File Permissions in Linux (Owner, Group, Others)' },
  'view-saved-wi-fi-passwords-on-ubuntu': { title: 'View Saved Wi-Fi Passwords on Ubuntu' },
  'python-virtual-environment-setup-guide-ubuntulinux': { title: 'Python Virtual Environment Setup Guide (Ubuntu/Linux)' },
  'manually-delete-the-migration-folder': { title: 'Manually Deleting the Prisma Migration Folder' },
  'initialize-the-database': { title: 'Initializing the Database' },
  'connecting-gitbd-gitlab-to-airbyte-using-oauth20': { title: 'Connecting GitLab to Airbyte Using OAuth 2.0' },
  'grafana-prometheus-node-exporter': { title: 'An Overview of Grafana, Prometheus, and Node Exporter' },
  'issue-working-with-utf-16-encoded-files-in-linux': { title: 'Working with UTF-16 Encoded Files in Linux' },
  'keycloak-configuration-for-ssl-requirement': { title: 'Keycloak Configuration for SSL Requirement' },
  'steps-to-enable-sslproxyengine-in-apache': { title: 'Steps to Enable SSLProxyEngine in Apache' },
  'docker-compose-up-build-command': { title: 'Docker Compose: The up --build Command' },
  'postman-ubunut': { title: 'How to Install Postman via Binary Tarball on Ubuntu' },
  'basic-linux': { title: 'Essential Linux System Commands: A Systems Engineering Reference' },
  'optional-load-modular-configs-from-bashrcd': { title: 'Optional: Load Modular Configs from ~/.bashrc.d/' },
  'docker-ps': { title: 'docker ps: Listing and Monitoring Containers' },
  'copy-the-sql-file-to-the-container': { title: 'Copying a SQL File into a Docker Container' },
  'creating-a-temporary-admin-user-in-keycloak': { title: 'Creating a Temporary Admin User in Keycloak' },
  'checking-if-a-user-group-exists-in-rhel': { title: 'Checking If a User Group Exists in RHEL' },
  'netstat-commnd': { title: 'Mastering netstat for Linux Network Analysis' },
  'scp-commnd': { title: 'Mastering SCP for Secure File Transfers' },
  'ssh-commnd': { title: 'Comprehensive SSH Setup and Hardening Guide' },
  'npm-version-understand': { title: 'Semantic Versioning: An NPM and NuGet Guide' }
};

const CATEGORY_OVERRIDES = {
  'basic-linux': 'Tech'
};

const CLUSTERS = {
  docker: ['docker-compose-intro', 'docker-compose-up-build-command', 'docker-network-guide', 'docker-ps', 'how-to-disable-auto-start-for-a-docker-container', 'docker-build-failures-linux-vs-windows', 'copy-the-sql-file-to-the-container', 'adding-a-custom-node-to-n8n-in-docker', 'mongodb-backup-restore-with-docker', 'grafana-installation-docker', 'airbyte-local-installation-steps', 'how-i-debugged-docker-nginx-and-reverse-proxy-problems-in-production'],
  linux: ['basic-linux', 'sed-command-and-its-different-usages', 'file-permissions-in-linux-owner-group-others', 'view-saved-wi-fi-passwords-on-ubuntu', 'replace-overwrite-files-in-ubuntu', 'adding-google-chat-to-the-ubuntu-desktop-bar', 'how-to-enable-swap-memory-on-linux', 'optional-load-modular-configs-from-bashrcd', 'locate-command-cheat-sheet', 'rsync-and-its-usages', 'reverting-to-rhel-94-kernel-version-after-upgrade-to-rhel-95', 'issue-working-with-utf-16-encoded-files-in-linux', 'checking-if-a-user-group-exists-in-rhel', 'network-interfaces-and-their-levels-usage', 'linux-maven-git-cheat-sheet'],
  network: ['scp-commnd', 'ssh-commnd', 'netstat-commnd', 'checking-port-availability-using-netcat-nc', 'iptables-rules', 'configuring-ssh-authentication-for-github'],
  ffmpeg: ['compress-large-videos-using-ffmpeg', 'compress-videos-ffmpeg-ubuntu', 'ffmpeg-video-trimming-linux-no-reencoding'],
  apache: ['https-server', 'apache-http-server-troubleshooting-notes', 'apache-build-error-apr-not-found-fix', 'apache-http-server-compile-error-pcre-not-found', 'steps-to-enable-sslproxyengine-in-apache'],
  tomcat: ['tomcat-on-ubuntu', 'fixing-apache-ant-deploytask-issue-in-tomcat', 'tomcat-keystore-tampered-or-password-incorrect', 'ssl-exception-in-tomcat-with-cas', 'java-process-info-command', 'fix-java-virtual-machine-error-linux'],
  keycloak: ['configuring-one-way-ssl-tomcat-keycloak', 'keycloak-configuration-for-ssl-requirement', 'keycloak-login-error-expiredcode-non-secure-cookie-context', 'creating-a-temporary-admin-user-in-keycloak'],
  java: ['javap-and-its-use-case', 'java-process-info-command', 'java-binary-instalation-on-ubuntu', 'fix-java-virtual-machine-error-linux', 'oracle-jdk-vs-openjdk', 'note-on-handling-local-variables-in-inner-classes-java'],
  databases: ['sql-order-by-does-not-work-with-distinct', 'essential-sql-queries', 'mysql-binary', 'mysql-general-log', 'postgresql-setup-issues', 'postgresql-connection-to-actual-data-source-if-applicable', 'disabling-the-pager-in-psql-for-the-postgres-user', 'manually-delete-the-migration-folder', 'mongodb-backup-restore-with-docker', 'initialize-the-database', 'copy-the-sql-file-to-the-container', 'troubleshooting-prisma-db-seeding-failure'],
  git: ['advanced-git-strategies', 'git-bisect-process-to-debug-issue', 'git-stash-notes', 'gitattributes-crlf-lf-line-endings-git', 'configuring-ssh-authentication-for-github', 'linux-maven-git-cheat-sheet', 'lefthook-setup-guide'],
  monitoring: ['grafana-installation-docker', 'grafana-prometheus-node-exporter', 'docker-ps', 'network-interfaces-and-their-levels-usage'],
  datatools: ['gpt-playground', 'install-caveman', 'note-google-apps-script-to-clone-data-up-to-column-j', 'n8n-custom-node-development-guide', 'adding-a-custom-node-to-n8n-in-docker', 'airbyte-local-installation-steps', 'connecting-gitbd-gitlab-to-airbyte-using-oauth20', 'connecting-cubejs-to-superset-postgresql-sql-api', 'cubejs-concepts-summary', 'python-troubleshooting-and-installation-summary'],
  webdev: ['react-hooks', 'css-grid-vs-flexbox', 'typescript-common-errors-and-fixes', 'debugging-401-error', 'seo-mistakes-developers-make', 'image-naming-strategy-for-seo', 'python-generators', 'setting-up-a-net-solution-with-xunit-test-project', 'how-i-audited-a-saas-application-and-found-16-dead-ui-elements', 'how-i-debug-complex-user-flows-by-tracing-dependencies', 'building-a-user-friendly-website-editor-for-non-technical-users', 'designing-plan-based-feature-restrictions-in-a-saas-application', 'how-i-improved-mobile-responsiveness-across-a-real-world-web-app', 'building-a-secure-image-upload-and-processing-pipeline', 'why-frontend-authorization-is-not-enough-lessons-from-a-security-audit'],
  theory: ['paging-vs-segmentation', 'cpu-cycle-and-its-relation-to-time', 'eulerian-and-hamiltonian-graphs', 'kubernetes-intro', 'network-interfaces-and-their-levels-usage'],
  installs: ['insall-xmind', 'katalon-studio-guide', 'postman-ubunut', 'flutter-installation-notes', 'python-virtual-environment-setup-guide-ubuntulinux', 'ruby-on-rails-installation-notes-2025-05-19', 'otrs-installation-guide-on-ubuntu-with-custom-mysql-binary', 'setting-up-custom-email-subdomain-cloudflare-brevo', 'hostinger-domain-redirect-missing-fix', 'gpt-playground', 'insall-xmind'],
  aieng: ['how-i-audit-an-existing-codebase-before-letting-ai-modify-it', 'using-ai-coding-agents-for-real-software-engineering-not-just-code-generation', 'how-to-get-150-million-free-ai-tokens-kira-ai', 'install-caveman', 'gpt-playground']
};

const EXPLICIT_RELATED = {
  'debugging-401-error': ['keycloak-login-error-expiredcode-non-secure-cookie-context', 'hostinger-domain-redirect-missing-fix', 'typescript-common-errors-and-fixes'],
  'hostinger-domain-redirect-missing-fix': ['setting-up-custom-email-subdomain-cloudflare-brevo', 'https-server', 'netstat-commnd'],
  'seo-mistakes-developers-make': ['image-naming-strategy-for-seo', 'https-server', 'setting-up-custom-email-subdomain-cloudflare-brevo'],
  'image-naming-strategy-for-seo': ['seo-mistakes-developers-make', 'https-server', 'debugging-401-error'],
  'install-caveman': ['gpt-playground', 'lefthook-setup-guide', 'n8n-custom-node-development-guide'],
  'setting-up-custom-email-subdomain-cloudflare-brevo': ['hostinger-domain-redirect-missing-fix', 'seo-mistakes-developers-make', 'keycloak-configuration-for-ssl-requirement'],
  'troubleshooting-prisma-db-seeding-failure': ['manually-delete-the-migration-folder', 'sql-order-by-does-not-work-with-distinct', 'postgresql-setup-issues'],
  'paging-vs-segmentation': ['cpu-cycle-and-its-relation-to-time', 'basic-linux', 'eulerian-and-hamiltonian-graphs']
};

function cleanTitle(raw) {
  let t = String(raw || '').replace(/\*\*/g, '').replace(/<[^>]*>/g, '').trim();
  t = t.replace(/\s+/g, ' ');
  return t;
}

function parseDate(display) {
  const m = String(display).match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!m) return null;
  const months = { January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12 };
  const mo = months[m[2]];
  if (!mo) return null;
  return `${m[3]}-${String(mo).padStart(2, '0')}-${String(Number(m[1])).padStart(2, '0')}`;
}

function prettyDate(iso) {
  if (!iso) return '';
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [y, m, d] = iso.split('-');
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

function rfc822(iso) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [y, m, d] = iso.split('-');
  const dt = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
  return `${days[dt.getUTCDay()]}, ${Number(d)} ${months[Number(m) - 1]} ${y} 00:00:00 +0000`;
}

function fileMetas() {
  const out = {};
  for (const f of fs.readdirSync(BLOGS)) {
    if (!f.endsWith('.html') || f === 'java-jvm-initialization-error-hpi-library.html') continue;
    const t = fs.readFileSync(path.join(BLOGS, f), 'utf8');
    const title = cleanTitle((t.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/\s*\|\s*A\.?M\.?\s*Rinas\s*(Blog)?\s*$/i, '');
    const descs = [...t.matchAll(/<meta\s+name="description"\s+content="([^"]*)"/g)].map(m => m[1].replace(/&[a-z]+;/g, ' '));
    const desc = descs.length ? descs[descs.length - 1] : '';
    const dPub = (t.match(/"datePublished":\s*"([^"]*)"/) || [])[1] || null;
    const art = (t.match(/<article[\s\S]*?<\/article>/) || [''])[0];
    const body = art.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = body ? body.split(' ').length : 0;
    out[f.replace(/\.html$/, '')] = { title: title || f.replace(/\.html$/, ''), desc: desc.trim(), date: dPub, words };
  }
  return out;
}

function buildPosts() {
  const html = fs.readFileSync(BLOG_INDEX, 'utf8');
  const entryRe = /\{\s*"title":\s*"([^"]*)",\s*"category":\s*"([^"]*)",\s*"excerpt":\s*"([^"]*)",\s*"author":\s*"([^"]*)",\s*"readTime":\s*"([^"]*)",\s*"date":\s*"([^"]*)",\s*"file":\s*"([^"]*)"([\s\S]*?)\}/g;
  const metas = fileMetas();
  const posts = [];
  const seen = new Set();
  let m;
  while ((m = entryRe.exec(html))) {
    const [, title, category, excerpt, author, readTime, date, file, rest] = m;
    const rawSlug = file.replace(/\.html$/, '');
    const ov = INDEX_OVERRIDES[rawSlug];
    if (ov && ov.remove) continue;
    const slug = ov && ov.file ? ov.file.replace(/\.html$/, '') : rawSlug;
    seen.add(slug);
    const entry = {
      slug,
      title: cleanTitle(title),
      category: ov ? ov.category : (CATEGORY_OVERRIDES[slug] || category),
      excerpt: ov ? (ov.excerpt || (metas[ov.file.replace(/\.html$/, '')] || {}).desc || excerpt) : excerpt,
      date: ov ? ov.date : parseDate(date),
      readTime: readTime,
      featured: /featured/.test(rest)
    };
    if (!entry.date) entry.date = (metas[slug] || {}).date || null;
    posts.push(entry);
  }
  for (const slug of Object.keys(INDEX_OVERRIDES)) {
    const ov = INDEX_OVERRIDES[slug];
    if (ov.remove || !ov.file) continue;
    const tslug = ov.file.replace(/\.html$/, '');
    if (seen.has(tslug)) continue;
    const meta = metas[tslug] || {};
    const words = meta.words || 400;
    const rt = Math.max(2, Math.round(words / 200));
    posts.push({
      slug: tslug, title: ov.title, category: ov.category,
      excerpt: meta.desc || '', date: ov.date || meta.date || '2026-08-01',
      readTime: `${rt} min`, featured: false
    });
    seen.add(tslug);
  }
  for (const post of posts) {
    const o = TITLE_OVERRIDES[post.slug];
    if (o) post.title = o.title;
    if (CATEGORY_OVERRIDES[post.slug]) post.category = CATEGORY_OVERRIDES[post.slug];
    if (!post.date) post.date = (metas[post.slug] || {}).date || '2026-01-01';
  }
  const dedup = new Map();
  for (const p of posts) dedup.set(p.slug, p);
  const list = [...dedup.values()];
  const all = fs.readdirSync(BLOGS).filter(f => f.endsWith('.html')).map(f => f.replace(/\.html$/, ''));
  for (const slug of all) {
    if (!dedup.has(slug) && slug !== 'java-jvm-initialization-error-hpi-library') {
      const meta = metas[slug] || {};
      const words = meta.words || 400;
      list.push({
        slug, title: meta.title || slug, category: 'Tech',
        excerpt: meta.desc || '', date: meta.date || '2026-01-01',
        readTime: `${Math.max(2, Math.round(words / 200))} min`, featured: false
      });
    }
  }
  return list;
}

function relatedFor(post, posts) {
  if (EXPLICIT_RELATED[post.slug]) {
    const bySlug = new Map(posts.map(p => [p.slug, p]));
    return EXPLICIT_RELATED[post.slug].map(s => bySlug.get(s)).filter(Boolean).slice(0, 3);
  }
  for (const members of Object.values(CLUSTERS)) {
    if (!members.includes(post.slug)) continue;
    const others = members.filter(s => s !== post.slug);
    const pool = others.map(s => posts.find(p => p.slug === s)).filter(Boolean);
    if (!pool.length) continue;
    const rotated = [];
    const start = members.indexOf(post.slug) % pool.length;
    for (let i = 0; i < pool.length; i++) {
      const el = pool[(start + i) % pool.length];
      rotated.push(el);
    }
    const picked = [];
    for (const p of rotated) {
      if (picked.length >= 3) break;
      if (!picked.some(q => q.slug === p.slug)) picked.push(p);
    }
    if (picked.length) return picked;
  }
  const sameCat = posts.filter(p => p.category === post.category && p.slug !== post.slug);
  return sameCat.slice(0, 3);
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function truncate(s, n) {
  let clean = s.replace(/\s+/g, ' ').trim().replace(/\u2026+$/, '').replace(/\.{3,}$/, '').replace(/\.+$/, m => (m.length > 1 ? '' : m));
  clean = clean.replace(/&[a-z]+;/g, ' ');
  if (clean.length > n) clean = clean.slice(0, n - 1).trim() + '…';
  return clean;
}

function fixBlogFile(post, allPosts) {
  const file = path.join(BLOGS, post.slug + '.html');
  if (!fs.existsSync(file)) return;
  let t = fs.readFileSync(file, 'utf8');
  const canonical = `https://rinas.tech/blogs/${post.slug}.html`;

  t = t.replace(/<!--\s*SEO Crawler Data:[\s\S]*?-->/g, '');
  t = t.replace(/<!--\s*Topic SEO Keywords:[\s\S]*?-->/g, '');
  t = t.replace(/<!--\s*\n?SEO Keywords:[\s\S]*?-->/g, '');

  t = t.replace(/https:\/\/rinas21\.github\.io\/amrinas/g, 'https://rinas.tech');
  t = t.replace(/https:\/\/rinas\.tech\/blog\.html/g, 'https://rinas.tech/pages/blog.html');

  const excerpt = truncate(post.excerpt || post.title, 158);
  const title = `${post.title} | A.M. Rinas Blog`;

  t = t.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);

  t = t.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/g, '');
  t = t.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/g, m => m);
  const descMeta = `<meta name="description" content="${escapeHtml(excerpt)}">`;
  const descs = [...t.matchAll(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/g)];
  for (let i = 0; i < descs.length; i++) {
    if (i === descs.length - 1) continue;
    t = t.replace(descs[i][0], '');
  }
  t = t.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, descMeta);

  t = t.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/g, '<meta name="robots" content="index, follow, max-image-preview:large">');
  const robots = [...t.matchAll(/<meta\s+name="robots"[^>]*\/?>/g)];
  for (let i = 0; i < robots.length - 1; i++) t = t.replace(robots[i][0], '');

  if (!/<meta\s+property="og:site_name"/.test(t)) {
    t = t.replace(/<link\s+rel="canonical"[^>]*>/, '$&' + '\n <meta property="og:site_name" content="A.M. Rinas Blog">');
  }

  const setMeta = (re, repl) => {
    const matches = [...t.matchAll(re)];
    for (let i = 0; i < matches.length; i++) {
      if (i === matches.length - 1) continue;
      t = t.replace(matches[i][0], '');
    }
    if (matches.length) t = t.replace(re, repl);
    else return false;
    return true;
  };

  setMeta(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/g, `<meta property="og:title" content="${escapeHtml(post.title)}">`);
  setMeta(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/g, `<meta property="og:description" content="${escapeHtml(excerpt)}">`);
  setMeta(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/g, '<meta property="og:type" content="article">');
  setMeta(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/g, `<meta name="twitter:title" content="${escapeHtml(post.title)}">`);
  setMeta(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/g, `<meta name="twitter:description" content="${escapeHtml(excerpt)}">`);
  setMeta(/<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/?>/g, '<meta name="twitter:card" content="summary_large_image">');

  const iso = post.date;
  if (!new RegExp('<meta\\s+property="article:published_time"').test(t)) {
    t = t.replace(/<link\s+rel="canonical"[^>]*>/, '$&' + `\n <meta property="article:published_time" content="${iso}T00:00:00+00:00">\n <meta property="article:modified_time" content="${iso}T00:00:00+00:00">\n <meta property="article:section" content="${post.category}">\n <meta property="article:author" content="https://rinas.tech/pages/about.html">`);
  }

  const ldName = '"name": "A.M Rinas"';
  t = t.split(ldName).join('"name": "A.M. Rinas"');

  t = t.replace(/"headline":\s*"(?:[^"\\]|\\.)*"/, `"headline": "${escapeHtml(post.title).replace(/&amp;/g, '&').replace(/&quot;/g, '\\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')}"`);
  t = t.replace(/"description":\s*"(?:[^"\\]|\\.)*"/, `"description": "${escapeHtml(excerpt).replace(/&amp;/g, '&').replace(/&quot;/g, '\\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')}"`);
  t = t.replace(/"datePublished":\s*"[^"]*"/, `"datePublished": "${iso}"`);
  t = t.replace(/"dateModified":\s*"[^"]*"/, `"dateModified": "${iso}"`);

  t = t.replace(/"@id":\s*"https:\/\/rinas\.tech\/blogs\/[^"]*"/, `"@id": "${canonical}"`);
  t = t.replace(/"item":\s*"https:\/\/rinas\.tech\/blogs\/[^"]*"/, `"item": "${canonical}"`);

  const body = t.match(/<article class="blog-post-container">[\s\S]*?<\/article>/);
  if (!body) return console.log('no article for', post.slug);
  let article = body[0];

  if (!article.includes('<!-- post-meta -->')) {
    const h1End = article.indexOf('</h1>');
    if (h1End !== -1) {
      const metaStrip = '\n <div class="post-meta">\n <span class="post-meta-item">By \n <a href="../pages/about.html">A.M. Rinas</a></span>\n <span class="post-meta-item">Published \n <time datetime="' + iso + '">' + prettyDate(iso) + '</time></span>\n <span class="post-meta-item">Category: \n <a href="../pages/blog.html">' + post.category + '</a></span>\n <span class="post-meta-item">' + post.readTime + ' read</span>\n </div>\n <!-- post-meta -->';
      article = article.slice(0, h1End + 5) + metaStrip + article.slice(h1End + 5);
    }
  }

  const hasRelated = /<h2[^>]*>\s*(Related Articles|See Also)\s*<\/h2>/.test(article);
  if (!article.includes('<!-- related-articles -->')) {
    const rel = relatedFor(post, allPosts);
    if (!hasRelated && rel.length) {
      const items = rel.map(r => '\n <li><a href="' + r.slug + '.html">' + escapeHtml(r.title) + '</a></li>').join('');
      const sect = '\n <section class="related-articles">\n <h2>Related Articles</h2>\n <ul>' + items + '\n </ul>\n </section>\n <!-- related-articles -->';
      article = article.replace(/(\s*)<\/article>$/, sect + '\n </article>');
    }
  }

  if (!article.includes('<!-- author-box -->')) {
    const box = '\n <section class="author-box" itemscope itemtype="https://schema.org/Person">\n <img src="../img/rinas.webp" alt="A.M. Rinas" class="author-box-photo" width="64" height="64" loading="lazy">\n <div class="author-box-body">\n <h2 itemprop="name">Written by A.M. Rinas</h2>\n <p>Full-Stack Software Engineer working on web applications, DevOps automation, and databases. More about me on the \n <a href="../pages/about.html">about page</a>, or say hi through the \n <a href="../pages/contact.html">contact page</a> and \n <a href="https://www.linkedin.com/in/amrinas" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>\n </div>\n </section>\n <!-- author-box -->\n <p class="back-to-blog"><a href="../pages/blog.html">&larr; Back to all articles</a></p>';
    article = article.replace(/(\s*)<\/article>$/, box + '\n </article>');
  }

  article = article.replace(/\n <hr style="margin: 40px 0; border: none; border-top: 1px solid var\(--rule\);">\n <p style="font-size: 14px; font-style: italic; color: var\(--ink-muted\); text-align: right;">\n Written by <a href="\.\.\/pages\/about\.html"[^>]*>[\s\S]*?<\/p>/g, '');

  t = t.replace(body[0], article);

  t = t.replace(/<a href="https:\/\/rinas\.tech\/pages\/terms\.html"[^>]*>Terms<\/a>/g, '');

  t = t.replace(/<a href="https:\/\/rinas\.tech\/pages\/privacy\.html"[^>]*>Privacy<\/a>/, '<a href="https://rinas.tech/pages/privacy.html" style="color: var(--ink); text-decoration: none;">Privacy</a> |\n <a href="https://rinas.tech/pages/terms.html" style="color: var(--ink); text-decoration: none;">Terms</a>');

  fs.writeFileSync(file, t);
  console.log('fixed', post.slug);
}

function rebuildBlogIndex(posts) {
  let html = fs.readFileSync(BLOG_INDEX, 'utf8');
  const arr = posts.map(p => JSON.stringify({
    title: p.title.replace(/\*\*/g, '').replace(/"/g, '\\"'),
    category: p.category,
    excerpt: truncate(p.excerpt || p.title, 220),
    author: 'A.M. Rinas',
    readTime: p.readTime,
    date: prettyDate(p.date),
    file: p.slug + '.html',
    featured: p.featured
  }).replace(/\\([^"])/g, '$1').replace(/\\"/g, '\u0022'));
  const js = 'const blogPosts = [\n' + arr.map(s => ' ' + s.replace(/^\{|\}$/g, m => m === '{' ? '{' : '}')).join(',\n') + '\n ];';
  html = html.replace(/const blogPosts = \[[\s\S]*?\n \];/, js);
  html = html.replace(/https:\/\/rinas21\.github\.io\/amrinas/g, 'https://rinas.tech');
  html = html.replace(/const blogPosts = \[[\s\S]*?\n \];/, js);
  html = html.replace(/"url":\s*"https:\/\/rinas\.tech\/blog\.html"/, '"url": "https://rinas.tech/pages/blog.html"');
  html = html.replace('<meta name="twitter:description" content="100 technical articles covering software engineering, DevOps, AI, and web development.">', '<meta name="twitter:description" content="' + posts.length + ' technical articles covering software engineering, DevOps, AI, and web development.">');
  html = html.replace('100 Technical Blog Posts', 'Technical Blog Posts');
  fs.writeFileSync(BLOG_INDEX, html);
  console.log('blog index rebuilt with', posts.length, 'posts');
}

function rebuildFeed(posts) {
  const items = posts.slice().sort((a, b) => b.date.localeCompare(a.date)).map(p => {
    return `    <item>
      <title>${escapeHtml(p.title)}</title>
      <link>https://rinas.tech/blogs/${p.slug}.html</link>
      <guid>https://rinas.tech/blogs/${p.slug}.html</guid>
      <description>${escapeHtml(truncate(p.excerpt || p.title, 200))}</description>
      <pubDate>${rfc822(p.date)}</pubDate>
    </item>`;
  }).join('\n');
  const feed = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>A.M. Rinas | Blog</title>
    <link>https://rinas.tech/pages/blog.html</link>
    <atom:link href="https://rinas.tech/feed.xml" rel="self" type="application/rss+xml" />
    <description>Technical articles, debugging notes, and lessons from a full-stack software and DevOps engineer.</description>
    <language>en</language>
    <lastBuildDate>${rfc822('2026-09-07')}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  fs.writeFileSync(FEED, feed);
  console.log('feed rebuilt with', posts.length, 'items');
}

function rebuildSitemap(posts) {
  const lines = [];
  const add = (loc, lastmod, priority) => {
    lines.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`);
  };
  add('https://rinas.tech/', '2026-09-07', '1.0');
  add('https://rinas.tech/pages/about.html', '2026-09-07', '0.8');
  add('https://rinas.tech/pages/blog.html', '2026-09-07', '0.8');
  add('https://rinas.tech/pages/codelab.html', '2026-08-18', '0.8');
  add('https://rinas.tech/pages/contact.html', '2026-08-18', '0.8');
  add('https://rinas.tech/pages/privacy.html', '2026-08-18', '0.5');
  add('https://rinas.tech/pages/terms.html', '2026-08-18', '0.5');
  add('https://rinas.tech/pages/projects.html', '2026-08-18', '0.8');
  add('https://rinas.tech/pages/publications.html', '2026-08-18', '0.6');
  add('https://rinas.tech/codelab/html/median-two-arrays.html', '2026-08-18', '0.6');
  add('https://rinas.tech/codelab/html/min-moves.html', '2026-08-18', '0.6');
  add('https://rinas.tech/codelab/html/two-sum.html', '2026-08-18', '0.6');
  for (const p of posts) add(`https://rinas.tech/blogs/${p.slug}.html`, p.date, '0.7');
  add('https://rinas.tech/blogs/java-jvm-initialization-error-hpi-library.html', '2026-06-24', '0.5');
  add('https://rinas.tech/googleda43247321d22f65.html', '2026-08-18', '0.3');
  add('https://rinas.tech/nextjs_strapi_seo_checklist.html', '2026-08-18', '0.4');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${lines.join('\n')}
</urlset>
`;
  fs.writeFileSync(SITEMAP, sitemap);
  console.log('sitemap rebuilt with', lines.length, 'urls');
}

const posts = buildPosts();
console.log('total posts:', posts.length);
for (const p of posts) fixBlogFile(p, posts);
rebuildBlogIndex(posts);
rebuildFeed(posts);
rebuildSitemap(posts);

fs.writeFileSync('/tmp/opencode/posts.json', JSON.stringify(posts, null, 1));
console.log('dataset written to /tmp/opencode/posts.json');