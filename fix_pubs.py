import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# The first pub has: <a href="publications.html#pub-1" class="pub-item gsap-fade-up" style="display:block; text-decoration:none; color:inherit;">
# and ends with </div> on line 571, which should be </a>
# We can just replace all <div class="pub-item gsap-fade-up"...> with <a href="publication.html#pub-N" class="pub-item gsap-fade-up"...>
# and </div> with </a> for those specific blocks.
# Since it's malformed, it's easier to use a regex to replace the pub-item divs.

# First, let's fix the stray </a> at line 617.
content = content.replace('        </a>\n\n        <div style="text-align: center; margin-top: 40px; margin-bottom: 20px;">', '\n        <div style="text-align: center; margin-top: 40px; margin-bottom: 20px;">')

# Fix the first pub's closing tag </div> to </a>
content = content.replace("""                    <span class="pub-venue"><i class="bx bx-map"></i> International Conference on Advanced Research in
                        Computing (ICARC 2026) - IEEE</span>
                </div>
            </div>""", """                    <span class="pub-venue"><i class="bx bx-map"></i> International Conference on Advanced Research in
                        Computing (ICARC 2026) - IEEE</span>
                </div>
            </a>""")

# Fix the first pub's href to publication.html
content = content.replace('href="publications.html#pub-1"', 'href="publication.html#pub-1"')

# Fix second pub
content = content.replace('<div class="pub-item gsap-fade-up" style="border-left-color: #4CAF50;">\n                <h3 class="pub-title">Bridging the Academic', '<a href="publication.html#pub-2" class="pub-item gsap-fade-up" style="border-left-color: #4CAF50; display:block; text-decoration:none; color:inherit;">\n                <h3 class="pub-title">Bridging the Academic')
content = content.replace("""                    <span class="pub-venue"><i class="bx bx-map"></i> 9th International Research Conference of Uva
                        Wellassa University 2025</span>
                </div>
            </div>

            <div class="pub-item gsap-fade-up" style="border-left-color: #4CAF50;">
                <h3 class="pub-title">SinglishGPT""", """                    <span class="pub-venue"><i class="bx bx-map"></i> 9th International Research Conference of Uva
                        Wellassa University 2025</span>
                </div>
            </a>

            <a href="publication.html#pub-3" class="pub-item gsap-fade-up" style="border-left-color: #4CAF50; display:block; text-decoration:none; color:inherit;">
                <h3 class="pub-title">SinglishGPT""")

content = content.replace("""                    <span class="pub-venue"><i class="bx bx-map"></i> 9th International Research Conference of Uva
                        Wellassa University 2025</span>
                </div>
            </div>

            <div class="pub-item gsap-fade-up" style="border-left-color: #4CAF50;">
                <h3 class="pub-title">Pioneering""", """                    <span class="pub-venue"><i class="bx bx-map"></i> 9th International Research Conference of Uva
                        Wellassa University 2025</span>
                </div>
            </a>

            <a href="publication.html#pub-4" class="pub-item gsap-fade-up" style="border-left-color: #4CAF50; display:block; text-decoration:none; color:inherit;">
                <h3 class="pub-title">Pioneering""")

content = content.replace("""                    <span class="pub-venue"><i class="bx bx-map"></i> 9th International Research Conference of Uva
                        Wellassa University 2025</span>
                </div>
            </div>""", """                    <span class="pub-venue"><i class="bx bx-map"></i> 9th International Research Conference of Uva
                        Wellassa University 2025</span>
                </div>
            </a>""")
            
# Fix the "View All Publications" button link
content = content.replace('href="publications.html"', 'href="publication.html"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
