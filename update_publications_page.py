import re

with open('publications.html', 'r', encoding='utf-8') as f:
    content = f.read()

pub_css = """
<style>
.expanded-pub-list {
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 1000px;
    margin: 0 auto 60px auto;
    padding: 0 20px;
}
.expanded-pub-item {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-left: 4px solid #F2A85F;
    border-radius: 12px;
    padding: 30px;
    transition: all 0.3s ease;
}
.expanded-pub-item:hover {
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.expanded-pub-item h2 {
    font-size: 1.6rem;
    margin-bottom: 10px;
    color: #fff;
}
.expanded-pub-item .pub-authors {
    color: #aaa;
    font-style: italic;
    margin-bottom: 15px;
}
.expanded-pub-item .pub-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 25px;
    font-size: 0.9rem;
    color: #ccc;
}
.expanded-pub-item .pub-badge {
    background: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
    border: 1px solid #4CAF50;
    padding: 5px 12px;
    border-radius: 5px;
    font-weight: 600;
}
.expanded-pub-item .pub-badge.ieee {
    background: #F2A85F;
    color: #000;
    border-color: #F2A85F;
    box-shadow: 0 0 10px rgba(242, 168, 95, 0.4);
}
.pub-abstract {
    background: rgba(0,0,0,0.2);
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 0.95rem;
    color: #ddd;
    line-height: 1.6;
}
.pub-images {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
}
.pub-image-placeholder {
    background: rgba(255,255,255,0.05);
    border: 1px dashed rgba(255,255,255,0.2);
    border-radius: 8px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 0.9rem;
}
.pub-actions {
    display: flex;
    gap: 15px;
}
.pub-btn {
    padding: 10px 20px;
    background: rgba(255,255,255,0.1);
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
    font-size: 0.9rem;
    transition: background 0.3s;
}
.pub-btn:hover {
    background: rgba(255,255,255,0.2);
}
.pub-btn.primary {
    background: #F2A85F;
    color: #000;
}
.pub-btn.primary:hover {
    background: #d99654;
}
</style>
"""

publications_html = """
<div class="expanded-pub-list">
    <!-- Pub 1 -->
    <div class="expanded-pub-item" id="pub-1">
        <h2>A Version-Aware Metric for Measuring Innovation in Software Code Patterns</h2>
        <div class="pub-authors">Mohomad Rinas, Saliya Wickramasinghe</div>
        <div class="pub-meta">
            <span class="pub-badge ieee"><i class="fas fa-award"></i> IEEE Highlight</span>
            <span><i class="bx bx-calendar"></i> Feb 2026</span>
            <span><i class="bx bx-map"></i> ICARC 2026 - IEEE</span>
        </div>
        <div class="pub-abstract">
            <strong>Abstract:</strong>
            <br>
            [Your abstract content goes here. Describe the research methodology, findings, and conclusion.]
        </div>
        <div class="pub-images">
            <div class="pub-image-placeholder">Conference Image Placeholder</div>
            <div class="pub-image-placeholder">Presentation Slide Placeholder</div>
        </div>
        <div class="pub-actions">
            <a href="#" class="pub-btn primary">Read Full Paper</a>
            <a href="#" class="pub-btn">View Presentation</a>
        </div>
    </div>

    <!-- Pub 2 -->
    <div class="expanded-pub-item" id="pub-2" style="border-left-color: #4CAF50;">
        <h2>Bridging the Academic Management Support Gap and Enhancing Student Autonomy: A Needs-Assessment for a Smart Assistant Integrated with the OULMS at the Open University of Sri Lanka</h2>
        <div class="pub-authors">Mohomad Rinas, B. K. S. Mendis, D. A. G. De Silva, P. G. P. Perera, Lakshan Gunasekara, Saliya Wickramasinghe</div>
        <div class="pub-meta">
            <span class="pub-badge"><i class="bx bx-globe"></i> International Conference</span>
            <span><i class="bx bx-calendar"></i> Feb 2026</span>
            <span><i class="bx bx-map"></i> 9th International Research Conference of Uva Wellassa University 2025</span>
        </div>
        <div class="pub-abstract">
            <strong>Abstract:</strong>
            <br>
            [Your abstract content goes here. Describe the research methodology, findings, and conclusion.]
        </div>
        <div class="pub-images">
            <div class="pub-image-placeholder">Conference Image Placeholder</div>
        </div>
        <div class="pub-actions">
            <a href="#" class="pub-btn primary">Read Full Paper</a>
        </div>
    </div>

    <!-- Pub 3 -->
    <div class="expanded-pub-item" id="pub-3" style="border-left-color: #4CAF50;">
        <h2>SinglishGPT: Enhancing Real-Time Translation and Information Retrieval for Singlish Chatbots</h2>
        <div class="pub-authors">Mohomad Rinas, Saliya Wickramasinghe</div>
        <div class="pub-meta">
            <span class="pub-badge"><i class="bx bx-globe"></i> International Conference</span>
            <span><i class="bx bx-calendar"></i> Feb 2026</span>
            <span><i class="bx bx-map"></i> 9th International Research Conference of Uva Wellassa University 2025</span>
        </div>
        <div class="pub-abstract">
            <strong>Abstract:</strong>
            <br>
            [Your abstract content goes here. Describe the research methodology, findings, and conclusion.]
        </div>
        <div class="pub-images">
            <div class="pub-image-placeholder">Conference Image Placeholder</div>
        </div>
        <div class="pub-actions">
            <a href="#" class="pub-btn primary">Read Full Paper</a>
        </div>
    </div>

    <!-- Pub 4 -->
    <div class="expanded-pub-item" id="pub-4" style="border-left-color: #4CAF50;">
        <h2>Pioneering Large Language Model Integration for Proactive Error Detection and Code Modification Recommendations in Integration Testing</h2>
        <div class="pub-authors">Mohomad Rinas, Saliya Wickramasinghe</div>
        <div class="pub-meta">
            <span class="pub-badge"><i class="bx bx-globe"></i> International Conference</span>
            <span><i class="bx bx-calendar"></i> Feb 2026</span>
            <span><i class="bx bx-map"></i> 9th International Research Conference of Uva Wellassa University 2025</span>
        </div>
        <div class="pub-abstract">
            <strong>Abstract:</strong>
            <br>
            [Your abstract content goes here. Describe the research methodology, findings, and conclusion.]
        </div>
        <div class="pub-images">
            <div class="pub-image-placeholder">Conference Image Placeholder</div>
        </div>
        <div class="pub-actions">
            <a href="#" class="pub-btn primary">Read Full Paper</a>
        </div>
    </div>
</div>
"""

# Replace everything between <h1...</h1> and <footer> with pub_css and publications_html
pattern = re.compile(r'(<h1[^>]*>.*?</h1>).*?(<footer)', re.DOTALL)
content = pattern.sub(r'\1\n' + pub_css + '\n' + publications_html + '\n\2', content)

# Make sure we don't have Devicon link if not needed, but it's fine.

with open('publications.html', 'w', encoding='utf-8') as f:
    f.write(content)
