        // Define your problems array. Set available: true and provide an `href` when you publish an HTML page for it.
        const problems = [
            { num: 1, title: "Two Sum", difficulty: "Easy", topics: ["Array", "Hash Map"], langs: ["JAVA", "PY", "GO"], available: true, href: "../codelab/html/two-sum.html" },
            { num: 20, title: "Valid Parentheses", difficulty: "Easy", topics: ["Stack", "String"], langs: ["JAVA", "PY"], available: false },
            { num: 206, title: "Reverse Linked List", difficulty: "Easy", topics: ["Linked List"], langs: ["JAVA"], available: false },
            { num: 704, title: "Binary Search", difficulty: "Easy", topics: ["Binary Search", "Array"], langs: ["GO"], available: false },
            { num: 56, title: "Merge Intervals", difficulty: "Medium", topics: ["Array", "Sorting"], langs: ["PY"], available: false },
            { num: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topics: ["Sliding Window", "String", "Hash Map"], langs: ["JAVA", "PY"], available: false },
            { num: 42, title: "Trapping Rain Water", difficulty: "Hard", topics: ["Two Pointers", "Stack", "Array"], langs: ["JAVA", "GO"], available: false },
        ];

        const rowsEl = document.getElementById('rows');
        const searchEl = document.getElementById('search');
        const filterButtons = document.querySelectorAll('#filters button');
        const topicBar = document.getElementById('topicBar');

        let activeDifficulty = 'All';
        let activeTopic = 'All';

        /* Build Topic Filter Pills dynamically from array */
        function renderTopicBar() {
            const allTopics = Array.from(new Set(problems.flatMap(p => p.topics)));
            topicBar.innerHTML = `<span class="topic-filter-title">Topics:</span>
    <span class="topic-pill ${activeTopic === 'All' ? 'active' : ''}" data-topic="All">All</span>` +
                allTopics.map(t => `<span class="topic-pill ${activeTopic === t ? 'active' : ''}" data-topic="${t}">${t}</span>`).join('');
        }

        /* Render Table */
        function render() {
            const q = searchEl.value.trim().toLowerCase();

            const filtered = problems
                .filter(p => activeDifficulty === 'All' || p.difficulty === activeDifficulty)
                .filter(p => activeTopic === 'All' || p.topics.includes(activeTopic))
                .filter(p => p.title.toLowerCase().includes(q) || p.num.toString().includes(q));

            rowsEl.innerHTML = '';

            if (filtered.length === 0) {
                rowsEl.innerHTML = `<div class="empty-state">No matching problems found.</div>`;
                return;
            }

            const isMobile = window.innerWidth <= 760;

            filtered.forEach(p => {
                const tag = p.available ? 'a' : 'div';
                const el = document.createElement(tag);
                el.className = 'prow ' + (p.available ? 'available' : 'soon');
                if (p.available) el.href = p.href;

                if (isMobile) {
                    el.innerHTML = `
        <span class="status ${p.available ? 'available' : 'soon'}">${p.available ? '✓' : ''}</span>
        <div>
          <span class="pname"><span class="num">#${p.num}</span><span class="title">${p.title}</span></span>
          <div class="meta-row">
            <span class="diff ${p.difficulty}">${p.difficulty}</span>
            <span class="topics">${p.topics.map(t => `<span>${t}</span>`).join('')}</span>
          </div>
        </div>
        <span class="arrow">${p.available ? '→' : '·'}</span>
      `;
                } else {
                    el.innerHTML = `
        <span class="status ${p.available ? 'available' : 'soon'}">${p.available ? '✓' : ''}</span>
        <span class="pname"><span class="num">${p.num}.</span><span class="title">${p.title}</span></span>
        <span class="diff ${p.difficulty}">${p.difficulty}</span>
        <span class="topics">${p.topics.map(t => `<span class="t-click" data-topic="${t}">${t}</span>`).join('')}</span>
        <span class="langs">${p.langs.map(l => `<span>${l}</span>`).join('')}</span>
        <span class="arrow">${p.available ? '→' : '·'}</span>
      `;
                }

                rowsEl.appendChild(el);
            });
        }

        /* Event Handlers */
        searchEl.addEventListener('input', render);

        filterButtons.forEach(btn => btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeDifficulty = btn.dataset.filter;
            render();
        }));

        topicBar.addEventListener('click', e => {
            const pill = e.target.closest('.topic-pill');
            if (!pill) return;
            activeTopic = pill.dataset.topic;
            renderTopicBar();
            render();
        });

        rowsEl.addEventListener('click', e => {
            const tClick = e.target.closest('.t-click');
            if (tClick) {
                e.preventDefault();
                e.stopPropagation();
                activeTopic = tClick.dataset.topic;
                renderTopicBar();
                render();
            }
        });

        window.addEventListener('resize', render);

        /* Init */
        renderTopicBar();
        render();
