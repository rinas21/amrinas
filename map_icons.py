import re

icon_map = {
    'Java': 'devicon-java-plain colored',
    'Servlet': 'devicon-java-plain colored',
    'JSX': 'devicon-react-original colored',
    'Bash Scripting': 'devicon-bash-plain colored',
    'Maven': 'devicon-maven-plain colored',
    'SQL': 'devicon-mysql-plain colored',
    'IBM Db2': 'bx bx-data',
    'Node.js': 'devicon-nodejs-plain colored',
    'GraphQL': 'devicon-graphql-plain colored',
    'Postman': 'devicon-postman-plain colored',
    'Wireshark': 'bx bx-network-chart',
    'REST APIs': 'bx bx-transfer-alt',
    'MySQL': 'devicon-mysql-plain colored',
    'Grafana': 'devicon-grafana-original colored',
    'Prometheus': 'devicon-prometheus-original colored',
    'Loki': 'bx bx-file',
    'Node Exporter': 'bx bx-server',
    'Red Hat': 'devicon-redhat-plain colored',
    'Shell Scripting': 'devicon-bash-plain colored',
    'Networking': 'bx bx-wifi',
    'PHP': 'devicon-php-plain colored',
    'Firebase': 'devicon-firebase-plain colored',
    'React Native': 'devicon-react-original colored',
    'JavaScript': 'devicon-javascript-plain colored',
    'Python': 'devicon-python-plain colored',
    'Docker': 'devicon-docker-plain colored',
    'Kubernetes': 'devicon-kubernetes-plain colored',
    'AI/ML': 'bx bx-brain'
}

with open('projects.html', 'r', encoding='utf-8') as f:
    content = f.read()

def replacer(match):
    text = match.group(1).strip()
    icon_class = icon_map.get(text, 'bx bx-code-alt')
    # some classes use boxicons, some use devicon. Devicon usually doesn't have bx.
    return f'<span class="project-tag"><i class="{icon_class}"></i> {text}</span>'

content = re.sub(r'<span class="project-tag">(.*?)</span>', replacer, content)

with open('projects.html', 'w', encoding='utf-8') as f:
    f.write(content)
