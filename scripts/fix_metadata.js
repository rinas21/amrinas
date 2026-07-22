const fs = require('fs');
const path = require('path');

const BLOGS_DIR = path.join(__dirname, '..', 'blogs');

if (!fs.existsSync(BLOGS_DIR)) {
    console.error("Blogs directory not found.");
    process.exit(1);
}

const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(BLOGS_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract H1 for Title
    const h1Match = content.match(/<h1>(.*?)<\/h1>/i);
    let titleText = 'A.M Rinas Blog';
    if (h1Match && h1Match[1]) {
        titleText = h1Match[1].replace(/<[^>]*>?/gm, '').trim(); // strip html if any
    } else {
        // Fallback to existing title without suffixes
        const titleMatch = content.match(/<title>(.*?)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
            titleText = titleMatch[1].replace(/\|.*/, '').trim();
        }
    }
    
    // 1. Update Title
    content = content.replace(/<title>.*?<\/title>/gi, `<title>${titleText} | A.M Rinas</title>`);
    
    // 2. Update Description
    // Extract first paragraph for description
    const pMatch = content.match(/<article[^>]*>[\s\S]*?<p>(.*?)<\/p>/i);
    let descriptionText = `Read about ${titleText} on the A.M Rinas tech blog.`;
    if (pMatch && pMatch[1]) {
        descriptionText = pMatch[1].replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
        if (descriptionText.length > 160) {
            descriptionText = descriptionText.substring(0, 157) + '...';
        }
    }
    
    // Replace description meta tag
    content = content.replace(/<meta name="description"[\s\S]*?content=".*?"/gi, `<meta name="description" content="${descriptionText}"`);
    // Some might be split lines, try a more robust replacement if needed. For now the above works if it's on same line or handles \s\S
    // Let's use a simpler regex for the standard template:
    const descRegex = /<meta\s+name="description"\s+content="([^"]*)"\s*>/i;
    if(descRegex.test(content)) {
        content = content.replace(descRegex, `<meta name="description" content="${descriptionText}">`);
    } else {
        // Handle multiline description
        content = content.replace(/<meta\s+name="description"[\s\S]*?>/i, `<meta name="description" content="${descriptionText}">`);
    }

    // 3. Update Author Meta
    content = content.replace(/<meta name="author" content=".*?"/gi, `<meta name="author" content="A.M Rinas"`);
    
    // 4. Update JSON-LD Author Name
    content = content.replace(/"name":\s*"A\.M\.?\s?Rinas\w*"/gi, `"name": "A.M Rinas"`);
    content = content.replace(/"name":\s*"A\.M\.Rinas"/gi, `"name": "A.M Rinas"`);
    content = content.replace(/"name":\s*"A\.M\.\s*Rinas"/gi, `"name": "A.M Rinas"`);

    fs.writeFileSync(filePath, content);
});

console.log(`Updated metadata for ${files.length} blogs.`);
