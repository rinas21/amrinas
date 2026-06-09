import os

template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg-color: #0f172a;
            --text-color: #e2e8f0;
            --accent-color: #38bdf8;
            --container-bg: #1e293b;
            --border-color: #334155;
            --code-bg: #020617;
        }}
        body {{
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'Inter', sans-serif;
            line-height: 1.7;
            margin: 0;
            padding: 60px 20px;
        }}
        .container {{
            max-width: 800px;
            margin: 0 auto;
            background: var(--container-bg);
            padding: 50px;
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid var(--border-color);
        }}
        h1, h2, h3 {{
            color: var(--accent-color);
            font-weight: 800;
            line-height: 1.2;
        }}
        h1 {{ font-size: 2.5rem; margin-bottom: 25px; }}
        h2 {{ font-size: 1.8rem; margin-top: 45px; border-bottom: 1px solid var(--border-color); padding-bottom: 15px; }}
        pre {{
            background: var(--code-bg);
            padding: 20px;
            border-radius: 12px;
            overflow-x: auto;
            border: 1px solid var(--border-color);
        }}
        code {{
            font-family: 'Courier New', Courier, monospace;
            color: #fca5a5;
            background: var(--code-bg);
            padding: 2px 6px;
            border-radius: 4px;
        }}
        pre code {{
            padding: 0;
            background: none;
            color: #e2e8f0;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
        }}
        th, td {{
            padding: 15px;
            border: 1px solid var(--border-color);
            text-align: left;
        }}
        th {{ background-color: var(--code-bg); color: var(--accent-color); }}
        a {{ color: #7dd3fc; text-decoration: none; transition: color 0.3s ease; }}
        a:hover {{ color: #38bdf8; text-decoration: underline; }}
    </style>
    <script src="https://cdn.jsdelivr.net/npm/marked@4.3.0/marked.min.js"></script>
</head>
<body>
    <div class="container" id="content"></div>
    <script type="text/markdown" id="md-content">
{content}
    </script>
    <script>
        const markdownContent = document.getElementById('md-content').textContent;
        document.getElementById('content').innerHTML = marked.parse(markdownContent);
    </script>
</body>
</html>"""

def convert(md_file, html_file, title):
    with open(md_file, 'r', encoding='utf-8') as f:
        text = f.read()
        
    # Strip frontmatter
    if text.startswith('---'):
        parts = text.split('---', 2)
        if len(parts) >= 3:
            text = parts[2].strip()
            
    final_html = template.format(title=title, content=text)
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(final_html)

f1 = '/home/rinas/Desktop/project/amrinas/generated_blog_posts/1-we-need-to-locate-a-file-owned-by-user-bandit7-group-bandit6-and-is-exactly-33-bytes-in-size-heres-the-exact-find-command.md'
f2 = '/home/rinas/Desktop/project/amrinas/generated_blog_posts/adding-a-custom-node-to-n8n-in-docker.md'

convert(f1, '/home/rinas/Desktop/project/amrinas/blogs/linux-maven-git-cheat-sheet.html', 'Linux, Maven, and Git Cheat Sheet')
convert(f2, '/home/rinas/Desktop/project/amrinas/blogs/adding-a-custom-node-to-n8n-in-docker.html', 'Adding a Custom Node to n8n in Docker')

os.remove(f1)
os.remove(f2)
print("Conversion complete and original markdown files removed.")
