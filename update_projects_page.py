import re

with open('projects.html', 'r', encoding='utf-8') as f:
    content = f.read()

with open('/tmp/projects_section.html', 'r', encoding='utf-8') as f:
    sections = f.read()

# Add a heading to the projects page before the sections
heading = '\n<h1 style="text-align:center; padding: 2rem 0; margin-top: 80px;">My Projects</h1>\n'

# Replace article block with sections
pattern = re.compile(r'<article class="blog-post-container">.*?</article>', re.DOTALL)
content = pattern.sub(heading + sections, content)

# Inject devicon css
devicon = '<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />\n</head>'
content = content.replace('</head>', devicon)

# Also fix the page title
content = re.compile(r'<title>.*?</title>', re.DOTALL).sub('<title>Projects | A.M. Rinas Portfolio</title>', content)

with open('projects.html', 'w', encoding='utf-8') as f:
    f.write(content)
