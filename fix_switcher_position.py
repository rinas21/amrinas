import glob
import os

target_dir = "/home/rinas/Desktop/project/amrinas"
html_files = glob.glob(f"{target_dir}/**/*.html", recursive=True)

old_css = """  .theme-switcher-container {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;"""

new_css = """  .theme-switcher-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;"""

count = 0
for filepath in html_files:
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        if old_css in content:
            content = content.replace(old_css, new_css)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            count += 1
    except Exception as e:
        print(f"Error on {filepath}: {e}")

print(f"Updated {count} files.")
