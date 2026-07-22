const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const BLOGS_DIR = path.join(ROOT_DIR, 'blogs');

const footerHtml = `
    <!-- ===== FOOTER ===== -->
    <footer class="footer" style="text-align: center; padding: 20px 0; margin-top: 40px; border-top: 1px solid var(--rule); font-size: 14px;">
        <nav style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
            <a href="https://rinas.tech/" style="color: var(--ink); text-decoration: none;">Home</a> |
            <a href="https://rinas.tech/blog.html" style="color: var(--ink); text-decoration: none;">Blog</a> |
            <a href="https://rinas.tech/about.html" style="color: var(--ink); text-decoration: none;">About</a> |
            <a href="https://rinas.tech/contact.html" style="color: var(--ink); text-decoration: none;">Contact</a> |
            <a href="https://rinas.tech/privacy.html" style="color: var(--ink); text-decoration: none;">Privacy</a>
        </nav>
        <p style="margin-top: 10px; color: var(--ink-muted);">&copy; 2026 A.M. Rinas. All rights reserved.</p>
    </footer>
`;

function injectFooter(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if footer already exists to avoid duplicates
    if (content.includes('<!-- ===== FOOTER ===== -->')) {
        console.log(`Footer already exists in ${path.basename(filePath)}`);
        return;
    }

    // Insert before Theme Switcher, else before </body>
    if (content.includes('<!-- Theme Switcher UI -->')) {
        content = content.replace('<!-- Theme Switcher UI -->', footerHtml + '\n  <!-- Theme Switcher UI -->');
    } else if (content.includes('</body>')) {
        content = content.replace('</body>', footerHtml + '\n</body>');
    } else {
        console.log(`Could not find insertion point in ${path.basename(filePath)}`);
        return;
    }

    fs.writeFileSync(filePath, content);
    console.log(`Injected footer into ${path.basename(filePath)}`);
}

// Get all HTML files in root
const rootFiles = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));
rootFiles.forEach(f => injectFooter(path.join(ROOT_DIR, f)));

// Get all HTML files in blogs
if (fs.existsSync(BLOGS_DIR)) {
    const blogFiles = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.html'));
    blogFiles.forEach(f => injectFooter(path.join(BLOGS_DIR, f)));
}
