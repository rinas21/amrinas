const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const TEMPLATE_PATH = path.join(ROOT_DIR, 'template.html');
const BLOGS_DIR = path.join(ROOT_DIR, 'blogs');

// Read the template
let template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

function createPage(filename, title, description, contentHtml) {
    let page = template.replace(
        /<title>.*?<\/title>/g,
        `<title>${title} | A.M. Rinas Blog</title>`
    );
    page = page.replace(
        /content="Your SEO friendly description goes here."/g,
        `content="${description}"`
    );
    page = page.replace(
        /content="Your Blog Title Here \| A\.M\. Rinas Blog"/g,
        `content="${title} | A.M. Rinas Blog"`
    );
    page = page.replace(
        /content="Your Blog Title Here"/g,
        `content="${title}"`
    );
    
    // Replace canonical and og:url
    page = page.replace(
        /href="https:\/\/rinas\.tech\/blogs\/template\.html"/g,
        `href="https://rinas.tech/${filename}"`
    );
    page = page.replace(
        /content="https:\/\/rinas\.tech\/blogs\/template\.html"/g,
        `content="https://rinas.tech/${filename}"`
    );
    page = page.replace(
        /"@id": "https:\/\/rinas21\.github\.io\/amrinas\/blogs\/template\.html"/g,
        `"@id": "https://rinas.tech/${filename}"`
    );

    // Replace the article content
    const articleRegex = /<article class="blog-post-container">([\s\S]*?)<\/article>/;
    page = page.replace(articleRegex, `<article class="blog-post-container">\n${contentHtml}\n    </article>`);

    fs.writeFileSync(path.join(ROOT_DIR, filename), page);
    console.log(`Created ${filename}`);
}

const aboutContent = `
        <h1>About Me</h1>
        <h2>Who I am</h2>
        <p>I am A.M. Rinas, a passionate Software Engineer and DevOps professional dedicated to building scalable and robust systems.</p>
        
        <h2>My Experience</h2>
        <p>I have extensive experience working with cloud infrastructure, containerization, and modern web development technologies. My background involves optimizing deployment pipelines, ensuring system reliability, and creating efficient backend architectures.</p>
        
        <h2>My Technical Focus</h2>
        <p>My technical focus revolves around DevOps practices (Docker, Kubernetes, CI/CD), backend development (Node.js, Python), and building seamless web applications. I enjoy tackling complex infrastructure challenges and improving developer workflows.</p>
        
        <h2>Why I write this blog</h2>
        <p>I write this blog to share my knowledge, document my technical journey, and help other developers overcome challenges I've encountered. Teaching others is the best way to solidify my own understanding.</p>
        
        <h2>My Skills & Projects</h2>
        <p>Some of my key skills include Linux server administration, Git version control, Database management (MySQL, PostgreSQL), and full-stack development. Feel free to explore my repository and recent projects to see my work in action.</p>
`;

const contactContent = `
        <h1>Contact Me</h1>
        <p>If you have any questions, want to discuss a project, or just want to say hi, feel free to reach out to me through the following channels:</p>
        
        <ul>
            <li><strong>Email:</strong> <a href="mailto:contact@rinas.tech" style="color: var(--rule);">contact@rinas.tech</a></li>
            <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/amrinas" style="color: var(--rule);" target="_blank">linkedin.com/in/amrinas</a></li>
            <li><strong>GitHub:</strong> <a href="https://github.com/rinas21" style="color: var(--rule);" target="_blank">github.com/rinas21</a></li>
        </ul>

        <h2>Send a Message</h2>
        <form action="#" method="POST" style="display: flex; flex-direction: column; gap: 15px; max-width: 500px; margin-top: 20px;">
            <label for="name" style="font-weight: bold;">Name:</label>
            <input type="text" id="name" name="name" required style="padding: 10px; border: 1px solid var(--rule); border-radius: 5px; background: transparent; color: var(--text);">
            
            <label for="email" style="font-weight: bold;">Email:</label>
            <input type="email" id="email" name="email" required style="padding: 10px; border: 1px solid var(--rule); border-radius: 5px; background: transparent; color: var(--text);">
            
            <label for="message" style="font-weight: bold;">Message:</label>
            <textarea id="message" name="message" rows="5" required style="padding: 10px; border: 1px solid var(--rule); border-radius: 5px; background: transparent; color: var(--text);"></textarea>
            
            <button type="submit" style="padding: 10px 20px; background-color: var(--rule); color: #fff; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Send</button>
        </form>
`;

const privacyContent = `
        <h1>Privacy Policy</h1>
        <p>Effective Date: 2026</p>
        <p>This Privacy Policy applies to the A.M. Rinas Blog (https://rinas.tech) and explains how we collect, use, and protect your information.</p>
        
        <h2>Google Analytics Usage</h2>
        <p>We use Google Analytics to monitor and analyze web traffic and user behavior on our site. Google Analytics may collect information such as your IP address, browser type, device type, and pages visited. This helps us improve the user experience and the quality of our content.</p>
        
        <h2>Cookies</h2>
        <p>Our website uses cookies to enhance your browsing experience. Cookies are small text files placed on your device to remember your preferences and understand how you interact with our site. You can control or disable cookies through your browser settings.</p>
        
        <h2>Google AdSense Cookies and Third-Party Advertising</h2>
        <p>We use Google AdSense to display advertisements on our site. Google and third-party vendors use cookies to serve ads based on your prior visits to our website or other websites.</p>
        <p>Specifically, Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" style="color: var(--rule);">Ads Settings</a>.</p>
        
        <h2>Data Collection</h2>
        <p>We do not collect any personal data unless you voluntarily provide it to us (e.g., through our contact form). Any information you provide will only be used to respond to your inquiry and will not be shared with third parties without your explicit consent.</p>
        
        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page. We encourage you to review this policy periodically.</p>
`;

createPage('about.html', 'About', 'Information about A.M. Rinas, Software Engineer and DevOps professional.', aboutContent);
createPage('contact.html', 'Contact', 'Contact information and form for A.M. Rinas.', contactContent);
createPage('privacy.html', 'Privacy Policy', 'Privacy policy, Google Analytics, and AdSense details for rinas.tech.', privacyContent);

console.log("Pages generated successfully.");
