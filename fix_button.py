import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the incorrectly placed button
bad_btn = """        <div style="text-align: center; margin-top: 30px;">
            <a href="publications.html" class="btn secondary-btn" style="text-decoration:none;">View All Publications</a>
        </div>"""
content = content.replace(bad_btn, '')

# Add the button to the correct place (end of Publications section)
# Let's find the closing tag of Publications
correct_btn = """
        <div style="text-align: center; margin-top: 40px; margin-bottom: 20px;">
            <a href="publications.html" class="btn secondary-btn" style="text-decoration:none; display: inline-block;">View All Publications</a>
        </div>
"""
# The publications section ends right before <!-- ===== SERVICES ===== -->
content = content.replace('    </section>\n\n    <!-- ===== SERVICES ===== -->', correct_btn + '    </section>\n\n    <!-- ===== SERVICES ===== -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
