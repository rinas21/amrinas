with open('projects.html', 'r', encoding='utf-8') as f:
    content = f.read()

live_css = """
.live-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto 40px auto;
}
.simple-live-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
}
.simple-live-card:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-3px);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(138, 43, 226, 0.2);
}
.simple-live-card i {
    font-size: 2rem;
    color: #CCFF00;
}
"""

content = content.replace('/* Bento Grid Styles */', '/* Bento Grid Styles */\n' + live_css)

with open('projects.html', 'w', encoding='utf-8') as f:
    f.write(content)
