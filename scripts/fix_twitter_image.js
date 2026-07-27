const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const BLOGS_DIR = path.join(ROOT_DIR, 'blogs');
const IMAGE_URL = 'https://rinas.tech/img/100blog.jpg';

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Add twitter:image right after twitter:card if missing
    if (!content.includes('name="twitter:image"')) {
        content = content.replace(
            /(<meta\s+name="twitter:card"[^>]*>)/i,
            `$1\n    <meta name="twitter:image" content="${IMAGE_URL}">`
        );
    }

    // Ensure og:image points to 100blog.jpg
    content = content.replace(
        /<meta\s+property="og:image"\s+content="(?!https:\/\/rinas\.tech\/img\/100blog\.jpg)[^"]*"/g,
        `<meta property="og:image" content="${IMAGE_URL}"`
    );

    // Ensure twitter:image points to 100blog.jpg
    content = content.replace(
        /<meta\s+name="twitter:image"\s+content="(?!https:\/\/rinas\.tech\/img\/100blog\.jpg)[^"]*"/g,
        `<meta name="twitter:image" content="${IMAGE_URL}"`
    );

    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${path.relative(ROOT_DIR, filePath)}`);
}

// Root HTML files
const rootFiles = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));
rootFiles.forEach(f => fixFile(path.join(ROOT_DIR, f)));

// Blog HTML files
if (fs.existsSync(BLOGS_DIR)) {
    const blogFiles = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.html'));
    blogFiles.forEach(f => fixFile(path.join(BLOGS_DIR, f)));
}

console.log('\nDone! twitter:image and og:image ensured across all pages.');
