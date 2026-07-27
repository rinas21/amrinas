const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const BLOGS_DIR = path.join(ROOT_DIR, 'blogs');
const IMAGE_HTML = '\n<img src="https://rinas.tech/img/100blog.jpg" alt="Featured Image" style="width: 100%; max-width: 800px; height: auto; border-radius: 12px; margin: 20px auto; display: block; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">\n';

function injectImage(filePath, isBlogPage = false) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if already injected
    if (content.includes('https://rinas.tech/img/100blog.jpg" alt="Featured Image"')) {
        return;
    }

    if (isBlogPage) {
        // Inject after </h1>
        content = content.replace(/(<\/h1>)/i, `$1${IMAGE_HTML}`);
    } else {
        // For blog.html, inject after arch-meta-row
        if (filePath.endsWith('blog.html')) {
            content = content.replace(/(<\/div>\s*<div class="category-tags")/i, `${IMAGE_HTML}$1`);
        } 
        // For about, contact, privacy, index
        else {
            // Find a good place, usually after <header> or after first <h1>
            if (content.includes('</h1>')) {
                content = content.replace(/(<\/h1>)/i, `$1${IMAGE_HTML}`);
            } else if (content.includes('</header>')) {
                content = content.replace(/(<\/header>)/i, `$1${IMAGE_HTML}`);
            }
        }
    }

    fs.writeFileSync(filePath, content);
}

// Inject in root files
const rootFiles = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));
rootFiles.forEach(f => injectImage(path.join(ROOT_DIR, f), false));

// Inject in blogs
if (fs.existsSync(BLOGS_DIR)) {
    const blogFiles = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.html'));
    blogFiles.forEach(f => injectImage(path.join(BLOGS_DIR, f), true));
}

console.log("Featured image UI injected across all pages.");
