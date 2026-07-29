// Theme Switcher Logic
const THEMES = [
  { id: "default", label: "Deep Blue", color: "#60A5FA", bg: "#0A0A0A" },
  { id: "dark", label: "Neo Dark", color: "#CCFF00", bg: "#111111" },
  { id: "luxury", label: "Cyber Pink", color: "#FF0055", bg: "#05050A" }
];

let currentTheme = localStorage.getItem('selected_theme') || "default";

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

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("themeSwitcher");
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
});