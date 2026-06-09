import os
import re

files_to_fix = [
    'adding-a-custom-node-to-n8n-in-docker.html',
    'how-to-disable-auto-start-for-a-docker-container.html',
    'linux-maven-git-cheat-sheet.html',
    'mongodb-backup-restore-with-docker.html'
]

template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | A.M. Rinas Blog</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="../files/style.css">
    <link rel="stylesheet" href="../files/cyber-theme.css">
    <link rel="stylesheet" href="../files/blog.css">
    <link rel="icon" type="image/png" sizes="48x48" href="https://rinas21.github.io/amrinas/favicon.png">
    
    <script src="https://cdn.jsdelivr.net/npm/marked@4.3.0/marked.min.js"></script>
    <style>
         .blog-post-container img {{ max-width: 100%; border-radius: 8px; margin: 20px 0; }}
         .blog-post-container pre {{ background: var(--ink); color: var(--cream); padding: 15px; border-radius: 5px; overflow-x: auto; margin: 15px 0; }}
         .blog-post-container code {{ font-family: monospace; background: rgba(0,0,0,0.05); padding: 2px 4px; border-radius: 3px; color: var(--rose); }}
         .blog-post-container pre code {{ background: transparent; padding: 0; color: var(--cream); }}
         .blog-post-container table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
         .blog-post-container th, .blog-post-container td {{ padding: 12px; border: 1px solid var(--rule-strong); text-align: left; }}
         .blog-post-container th {{ background: var(--warm); }}
    </style>
</head>
<body>
    <header class="header">
        <a href="../index.html" class="logo" style="opacity: 1; color: var(--ink);">Portfolio</a>
        <nav class="navbar">
            <a href="../index.html" style="color: var(--ink);">Home</a>
            <a href="../blog.html" style="color: var(--ink);">Blog</a>
        </nav>
    </header>

    <article class="blog-post-container" id="content"></article>

    <script type="text/markdown" id="md-content">
{content}
    </script>
    <script>
        const markdownContent = document.getElementById('md-content').textContent;
        document.getElementById('content').innerHTML = marked.parse(markdownContent);
    </script>

    <article class="blog-post-container">
        <hr style="margin: 40px 0; border: none; border-top: 1px solid var(--rule);">
        <p style="font-size: 14px; font-style: italic; color: var(--ink-muted); text-align: right;">
            Written by <strong>A.M. Rinas</strong>
        </p>
    </article>
</body>
</html>"""

def fix():
    for filename in files_to_fix:
        path = f"/home/rinas/Desktop/project/amrinas/blogs/{filename}"
        if not os.path.exists(path):
            continue
            
        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()
            
        # extract markdown
        match = re.search(r'<script type="text/markdown" id="md-content">\s*(.*?)\s*</script>', html, re.DOTALL)
        if not match:
            continue
            
        markdown_text = match.group(1).strip()
        
        # Extract title from filename
        title = filename.replace('.html', '').replace('-', ' ').title()
        
        new_html = template.format(title=title, content=markdown_text)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_html)
            
        print(f"Fixed {filename}")

fix()
