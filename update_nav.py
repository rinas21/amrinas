import os
import re
import glob

def get_nav_content(depth, current_file):
    prefix = "" if depth == 0 else "../"
    
    # We figure out which item should be active
    # By default none, unless it matches the filename
    base_name = os.path.basename(current_file)
    
    def active_class(link_target):
        if link_target == base_name:
            return ' class="active"'
        if link_target == "index.html#Home" and base_name == "index.html":
            return ' class="active"'
        return ""
        
    return f"""
            <a href="{prefix}index.html#Home" style="--i:1"{active_class('index.html#Home')}>Home</a>
            <a href="{prefix}index.html#About" style="--i:2"{active_class('index.html#About')}>About</a>
            <a href="{prefix}index.html#Experience" style="--i:3"{active_class('index.html#Experience')}>Experience</a>
            <a href="{prefix}projects.html" style="--i:4"{active_class('projects.html')}>Projects</a>
            <a href="{prefix}blog.html" style="--i:5"{active_class('blog.html')}>Blog</a>
            <a href="{prefix}codelab.html" style="--i:6"{active_class('codelab.html')}>CodeLab</a>
            <a href="{prefix}index.html#Contact" style="--i:7"{active_class('index.html#Contact')}>Contact</a>
"""

def update_file(filepath, depth):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to find <nav class="navbar"...> ... </nav>
    # We use non-greedy .*? to match the contents.
    # We only want to replace the first one in the header, or any that look like the main navbar.
    # Let's target <nav class="navbar".*?>.*?</nav>
    # Wait, there's also footer navs. They look like <nav style="display: flex...">
    # The header nav always has class="navbar".
    
    pattern = re.compile(r'(<nav class="navbar"[^>]*>).*?(</nav>)', re.DOTALL)
    
    new_nav = get_nav_content(depth, filepath)
    
    # Replacement function
    def replacer(match):
        return match.group(1) + new_nav + "        " + match.group(2)
        
    new_content = pattern.sub(replacer, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

if __name__ == "__main__":
    count = 0
    # Process root files
    for filepath in glob.glob('*.html'):
        if update_file(filepath, 0):
            count += 1
            
    # Process blog files
    for filepath in glob.glob('blogs/*.html'):
        if update_file(filepath, 1):
            count += 1
            
    print(f"Updated {count} files.")
