import re

with open('projects.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add CSS for Bento Grid
css = """
<style>
/* Bento Grid Styles */
.bento-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}
@media (min-width: 900px) {
    .bento-grid {
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 280px;
    }
    .bento-large {
        grid-column: span 2;
        grid-row: span 2;
    }
    .bento-wide {
        grid-column: span 2;
        grid-row: span 1;
    }
    .bento-tall {
        grid-column: span 1;
        grid-row: span 2;
    }
}
.bento-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 30px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
.bento-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}
.bento-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 30px rgba(138, 43, 226, 0.15);
}
.bento-card .project-icon {
    font-size: 3rem;
    margin-bottom: 15px;
    background: -webkit-linear-gradient(45deg, #FF0055, #CCFF00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.bento-card h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: 700;
}
.bento-card p {
    font-size: 0.95rem;
    color: var(--ink-muted);
    margin-bottom: 8px;
    line-height: 1.4;
}
.bento-tags {
    margin-top: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 15px;
}
.bento-tags .project-tag {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 6px 12px;
    border-radius: 50px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.3s ease;
}
.bento-tags .project-tag:hover {
    background: rgba(255, 255, 255, 0.15);
}
.bento-tags i {
    font-size: 1.1rem;
}
</style>
"""

content = content.replace('</head>', css + '</head>')

# Change project-container to bento-grid
content = content.replace('class="project-container"', 'class="bento-grid"')

# Extract projects
cards = re.findall(r'<div class="project-card gsap-card">(.*?)</div>', content, re.DOTALL)

# Rebuild projects with bento classes
# Indices: 
# 0: bento-large
# 1: bento-tall
# 2: regular
# 3: bento-wide
# 4: regular
# 5: bento-wide
# 6: regular

classes = [
    'bento-card bento-large gsap-card',
    'bento-card bento-tall gsap-card',
    'bento-card gsap-card',
    'bento-card bento-wide gsap-card',
    'bento-card gsap-card',
    'bento-card bento-wide gsap-card',
    'bento-card gsap-card'
]

new_cards_html = []
for i, card_content in enumerate(cards):
    cls = classes[i] if i < len(classes) else 'bento-card gsap-card'
    
    # Extract tags and wrap them in .bento-tags
    tags = re.findall(r'<span class="project-tag">.*?</span>', card_content, re.DOTALL)
    if tags:
        # Remove individual tags from content
        card_content = re.sub(r'<span class="project-tag">.*?</span>', '', card_content, flags=re.DOTALL)
        tags_html = '<div class="bento-tags">\n' + '\n'.join(tags) + '\n</div>'
        card_content += tags_html
        
    new_cards_html.append(f'<div class="{cls}">{card_content}</div>')

# Replace old cards with new cards
# Wait, we need to replace the whole content of bento-grid
pattern = re.compile(r'<div class="bento-grid">.*?</div>\s*</div>\s*</div>\s*</section>', re.DOTALL)

replacement = '<div class="bento-grid">\n' + '\n'.join(new_cards_html) + '\n</div>\n</div>\n</div>\n</section>'

content = pattern.sub(replacement, content)

with open('projects.html', 'w', encoding='utf-8') as f:
    f.write(content)

