import os
import glob

# The CSS to inject
css_code = """
<style>
  /* Global Theme Switcher CSS */
  :root {
    --background: #ffffff;
    --foreground: #0d0d0d;
    --theme-accent: #4338ca;
    --transition-speed: 0.6s;
    --bg: var(--background);
    --text: var(--foreground);
    --ink: var(--foreground);
    --rule: var(--theme-accent);
  }
  html[data-theme="dark"] {
    --background: #111111;
    --foreground: #f5f5f5;
    --theme-accent: #ccff00;
    --bg: var(--background);
    --text: var(--foreground);
    --ink: var(--foreground);
    --rule: var(--theme-accent);
  }
  html[data-theme="luxury"] {
    --background: #05050a;
    --foreground: #e0e0ff;
    --theme-accent: #ff0055;
    --bg: var(--background);
    --text: var(--foreground);
    --ink: var(--foreground);
    --rule: var(--theme-accent);
  }

  body {
    background-color: var(--background) !important;
    color: var(--foreground) !important;
    transition: background-color var(--transition-speed) ease, color var(--transition-speed) ease;
  }

  .theme-switcher-container {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 12px;
    z-index: 9999;
  }

  .theme-btn {
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid transparent;
    cursor: pointer;
    overflow: hidden;
    padding: 0;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    background: transparent;
  }

  .theme-btn.active {
    border-color: rgba(128, 128, 128, 0.5);
    transform: scale(1.15);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .theme-btn:not(.active):hover {
    transform: scale(1.1);
  }

  .theme-bg-preview {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
  }

  .theme-accent-preview {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    transform: translate(15%, 15%);
    z-index: 2;
    pointer-events: none;
  }
</style>
"""

# The HTML and JS to inject
html_js_code = """
  <!-- Theme Switcher UI -->
  <div class="theme-switcher-container" id="themeSwitcher"></div>

  <script>
    const THEMES = [
      { id: "default", label: "Studio Light", color: "#4338CA", bg: "#FFFFFF" },
      { id: "dark", label: "Neo Dark", color: "#CCFF00", bg: "#111111" },
      { id: "luxury", label: "Cyber Pink", color: "#FF0055", bg: "#05050A" }
    ];

    let currentTheme = localStorage.getItem('selected_theme') || "default";
    const container = document.getElementById("themeSwitcher");

    function setTheme(themeId) {
      currentTheme = themeId;
      document.documentElement.setAttribute("data-theme", themeId);
      localStorage.setItem('selected_theme', themeId);
      
      document.querySelectorAll(".theme-btn").forEach(btn => {
        if (btn.dataset.theme === themeId) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }

    if(container) {
      THEMES.forEach(theme => {
        const btn = document.createElement("button");
        btn.className = `theme-btn ${theme.id === currentTheme ? 'active' : ''}`;
        btn.dataset.theme = theme.id;
        btn.title = theme.label;
        
        const bgPreview = document.createElement("div");
        bgPreview.className = "theme-bg-preview";
        bgPreview.style.backgroundColor = theme.bg;
        
        const accentPreview = document.createElement("div");
        accentPreview.className = "theme-accent-preview";
        accentPreview.style.backgroundColor = theme.color;

        btn.appendChild(bgPreview);
        btn.appendChild(accentPreview);

        btn.addEventListener("click", () => setTheme(theme.id));
        container.appendChild(btn);
      });
      // Initialize on load
      setTheme(currentTheme);
    }
  </script>
"""

# Find all html files
target_dir = "/home/rinas/Desktop/project/amrinas"
html_files = glob.glob(f"{target_dir}/**/*.html", recursive=True)

for filepath in html_files:
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Check if already injected
        if "<!-- Global Theme Switcher CSS -->" in content or "theme-switcher-container" in content:
            print(f"Skipping already injected: {filepath}")
            continue

        # Inject CSS before </head>
        if "</head>" in content:
            content = content.replace("</head>", css_code + "\n</head>")
        else:
            print(f"No </head> found in {filepath}")
            continue
            
        # Inject HTML/JS before </body>
        if "</body>" in content:
            content = content.replace("</body>", html_js_code + "\n</body>")
        else:
            print(f"No </body> found in {filepath}")
            continue

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
            
        print(f"Successfully injected in: {filepath}")

    except Exception as e:
        print(f"Error processing {filepath}: {e}")
