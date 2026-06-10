import os
import re

SEO_TAGS_TEMPLATE = """
    <!-- SEO Meta Tags -->
    <meta name="description" content="{description}">
    <meta name="keywords" content="{keywords}">
    <meta name="author" content="A.M. Rinas">
    <meta name="robots" content="index, follow">
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{description}">
"""

def inject_seo(file_path, title, description, keywords="Tech, DevOps, Blog, A.M. Rinas, Software Engineering"):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if SEO tags are already injected
    if '<!-- SEO Meta Tags -->' in content:
        return

    # Prepare tags
    tags = SEO_TAGS_TEMPLATE.format(
        title=title.replace('"', '&quot;'),
        description=description.replace('"', '&quot;'),
        keywords=keywords
    )

    # Insert after <head>
    if '<head>' in content:
        content = content.replace('<head>', f'<head>\n{tags}', 1)
    elif '<head ' in content:
        # handle <head ...>
        content = re.sub(r'(<head[^>]*>)', r'\1\n' + tags, content, count=1)
    else:
        return # Cannot find head

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def process_file(file_path, is_blog_post=False):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract title
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
    title = title_match.group(1).strip() if title_match else "A.M. Rinas Blog"

    description = "A blog post by A.M. Rinas covering technical insights, DevOps, and programming guides."
    
    if not is_blog_post:
        if "index" in file_path:
            description = "A.M. Rinas - Portfolio and Blog of a Software and DevOps Engineer."
        elif "blog" in file_path:
            description = "A.M. Rinas's Archive of Insights & Guides. Research, technical guides, and honest advice."
            
    # Try to extract a better description from the content for blog posts
    if is_blog_post:
        # Blog posts generated have <script type="text/markdown" id="md-content">
        md_match = re.search(r'<script type="text/markdown" id="md-content">(.*?)</script>', content, re.IGNORECASE | re.DOTALL)
        if md_match:
            md_text = md_match.group(1).strip()
            # grab first paragraph or some text
            lines = [line.strip() for line in md_text.split('\n') if line.strip() and not line.startswith('#') and not line.startswith('>')]
            if lines:
                desc_candidate = ' '.join(lines[:3])
                if len(desc_candidate) > 160:
                    description = desc_candidate[:157] + '...'
                else:
                    description = desc_candidate

    inject_seo(file_path, title, description)

# Process index.html and blog.html
for main_file in ['index.html', 'blog.html']:
    if os.path.exists(main_file):
        process_file(main_file, is_blog_post=False)

# Process blogs/*.html
blogs_dir = 'blogs'
if os.path.exists(blogs_dir):
    for f in os.listdir(blogs_dir):
        if f.endswith('.html'):
            process_file(os.path.join(blogs_dir, f), is_blog_post=True)

print("SEO tags injected successfully.")
