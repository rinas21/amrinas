const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const BLOGS_DIR = path.join(ROOT_DIR, 'blogs');
const NEW_IMAGE_URL = 'https://rinas.tech/img/100blog.jpg';

function replaceImagesInFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all variations of old images
    const oldPatterns = [
        /https:\/\/rinas21\.github\.io\/amrinas\/img\/rinas\.webp/g,
        /https:\/\/rinas21\.github\.io\/amrinas\/img\/100blog\.jpg/g,
        /https:\/\/rinas\.tech\/img\/rinas\.webp/g,
        // Also look for any og:image or twitter:image that needs updating just in case
        /<meta\s+property="og:image"\s+content="[^"]*"/g,
        /<meta\s+name="twitter:image"\s+content="[^"]*"/g,
        /"image":\s*"[^"]*"/g
    ];

    // Better approach: Specifically target the meta tags and JSON-LD image fields
    content = content.replace(/<meta\s+property="og:image"\s+content="[^"]*"/g, `<meta property="og:image" content="${NEW_IMAGE_URL}"`);
    content = content.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"/g, `<meta name="twitter:image" content="${NEW_IMAGE_URL}"`);
    
    // For JSON-LD (be careful not to replace publisher logo if we only want featured image)
    // Actually the publisher logo uses favicon.png usually. Let's just replace the specific rinas.webp image URL everywhere
    content = content.replace(/https:\/\/rinas21\.github\.io\/amrinas\/img\/rinas\.webp/g, NEW_IMAGE_URL);
    content = content.replace(/https:\/\/rinas\.tech\/img\/rinas\.webp/g, NEW_IMAGE_URL);

    fs.writeFileSync(filePath, content);
}

// Update all HTML files in root
const rootFiles = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));
rootFiles.forEach(f => replaceImagesInFile(path.join(ROOT_DIR, f)));

// Update all HTML files in blogs directory
if (fs.existsSync(BLOGS_DIR)) {
    const blogFiles = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.html'));
    blogFiles.forEach(f => replaceImagesInFile(path.join(BLOGS_DIR, f)));
}

console.log("Featured image updated across all pages.");
