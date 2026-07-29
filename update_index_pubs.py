import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Make the publication items act as anchor wrappers
# E.g., <div class="pub-item gsap-fade-up"> -> <a href="publications.html#pub-1" class="pub-item gsap-fade-up" style="display:block; text-decoration:none; color:inherit;">
# And add </a> at the end of each pub item.
# There are 4 pub items.

pub_replacements = [
    (r'(<div class="pub-item gsap-fade-up">.*?</div>\s*</div>)', r'<a href="publications.html#pub-1" class="pub-item gsap-fade-up" style="display:block; text-decoration:none; color:inherit;">\n\g<1>\n</a>'),
    (r'(<div class="pub-item gsap-fade-up" style="border-left-color: #4CAF50;">\s*<h3 class="pub-title">Bridging.*?</div>\s*</div>)', r'<a href="publications.html#pub-2" class="pub-item gsap-fade-up" style="border-left-color: #4CAF50; display:block; text-decoration:none; color:inherit;">\n\g<1>\n</a>'),
    (r'(<div class="pub-item gsap-fade-up" style="border-left-color: #4CAF50;">\s*<h3 class="pub-title">SinglishGPT.*?</div>\s*</div>)', r'<a href="publications.html#pub-3" class="pub-item gsap-fade-up" style="border-left-color: #4CAF50; display:block; text-decoration:none; color:inherit;">\n\g<1>\n</a>'),
    (r'(<div class="pub-item gsap-fade-up" style="border-left-color: #4CAF50;">\s*<h3 class="pub-title">Pioneering.*?</div>\s*</div>)', r'<a href="publications.html#pub-4" class="pub-item gsap-fade-up" style="border-left-color: #4CAF50; display:block; text-decoration:none; color:inherit;">\n\g<1>\n</a>')
]

for old_pattern, new_pattern in pub_replacements:
    # First, let's strip the original <div class="pub-item..."> outer tag and replace it with <a>
    # Wait, if I replace the outer div with a, I need to modify the inner matching properly.
    pass

# Better approach for index.html pub items
def replace_pub(match):
    html = match.group(0)
    # determine pub id based on title
    if "Version-Aware Metric" in html:
        pid = "pub-1"
    elif "Bridging the Academic" in html:
        pid = "pub-2"
    elif "SinglishGPT" in html:
        pid = "pub-3"
    elif "Pioneering Large" in html:
        pid = "pub-4"
    else:
        pid = "pub-x"
    
    # replace <div class="pub-item..." with <a href="publications.html#pid" class="pub-item..."
    html = re.sub(r'<div class="pub-item(.*?)"', fr'<a href="publications.html#{pid}" class="pub-item\1" style="display:block; text-decoration:none; color:inherit;"', html, count=1)
    
    # replace the closing </div> with </a>
    html = html.rsplit('</div>', 1)
    html = '</a>'.join(html)
    return html

content = re.sub(r'<div class="pub-item.*?</div>\s*</div>\s*</div>', replace_pub, content, flags=re.DOTALL)

# Add "View All Publications" button
btn_html = """
        <div style="text-align: center; margin-top: 30px;">
            <a href="publications.html" class="btn secondary-btn" style="text-decoration:none;">View All Publications</a>
        </div>
"""
content = content.replace('</section>', btn_html + '\n    </section>', 1) # Only for the first </section> after Publications? No, better use a targeted replace.

# Target the end of Publications section
content = re.sub(r'(</div>\s*</section>\s*<!-- ===== SERVICES ===== -->)', btn_html + r'\n\1', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

