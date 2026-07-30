const nums = [3, 2, 4, 6, 5, 8, 9, 12, 1, 7];
        const target = 10;

        /* ---------- Strategy metadata ---------- */
        const strategyInfo = {
            brute: {
                title: "Brute Force",
                time: "O(n²)",
                space: "O(1)",
                steps: [
                    "<strong>Outer Loop:</strong> Pick an element at index <code>i</code> from <code>0</code> to <code>n-1</code>.",
                    "<strong>Inner Loop:</strong> Pick a second element at index <code>j</code> from <code>i+1</code> to <code>n-1</code>.",
                    "<strong>Check Sum:</strong> Test if <code>nums[i] + nums[j] == target</code>.",
                    "<strong>Return:</strong> Return <code>[i, j]</code> as soon as a matching pair is found."
                ]
            },
            ai1: {
                title: "AI 1 — Hash Map (Optimal)",
                time: "O(n)",
                space: "O(n)",
                steps: [
                    "<strong>Initialize Map:</strong> Create an empty Hash Map to record <code>value → index</code>.",
                    "<strong>Iterate Array:</strong> Loop through the array with index <code>i</code> and current value <code>num</code>.",
                    "<strong>Calculate Complement:</strong> Determine needed value <code>complement = target - num</code>.",
                    "<strong>Check Map:</strong> If <code>complement</code> exists in map, return <code>[map[complement], i]</code>.",
                    "<strong>Record:</strong> Otherwise, store current element <code>seen[num] = i</code> and continue."
                ]
            },
            ai2: {
                title: "AI 2 — Two Pointers (Sorted)",
                time: "O(n log n)",
                space: "O(n)",
                steps: [
                    "<strong>Preserve Indices:</strong> Pair each element with its original index: <code>(nums[i], i)</code>.",
                    "<strong>Sort Array:</strong> Sort pairs in ascending order by value (takes <code>O(n log n)</code> time).",
                    "<strong>Initialize Pointers:</strong> Set <code>left = 0</code> and <code>right = n - 1</code>.",
                    "<strong>Shrink Window:</strong> If <code>sum == target</code> return indices. If <code>sum < target</code> move <code>left++</code>, else <code>right--</code>."
                ]
            }
        };

        /* ---------- Code snippets ---------- */
        const code = {
            brute: {
                java: [
                    "public int[] twoSum(int[] nums, int target) {",
                    "    for (int i = 0; i < nums.length; i++) {",
                    "        for (int j = i + 1; j < nums.length; j++) {",
                    "            if (nums[i] + nums[j] == target) {",
                    "                return new int[] { i, j };",
                    "            }",
                    "        }",
                    "    }",
                    "    return new int[] {};",
                    "}"
                ],
                python: [
                    "def two_sum(nums, target):",
                    "    for i in range(len(nums)):",
                    "        for j in range(i + 1, len(nums)):",
                    "            if nums[i] + nums[j] == target:",
                    "                return [i, j]",
                    "    return []"
                ],
                go: [
                    "func twoSum(nums []int, target int) []int {",
                    "    for i := 0; i < len(nums); i++ {",
                    "        for j := i + 1; j < len(nums); j++ {",
                    "            if nums[i]+nums[j] == target {",
                    "                return []int{i, j}",
                    "            }",
                    "        }",
                    "    }",
                    "    return []int{}",
                    "}"
                ]
            },
            ai1: {
                java: [
                    "public int[] twoSum(int[] nums, int target) {",
                    "    Map<Integer, Integer> seen = new HashMap<>();",
                    "    for (int i = 0; i < nums.length; i++) {",
                    "        int complement = target - nums[i];",
                    "        if (seen.containsKey(complement)) {",
                    "            return new int[] { seen.get(complement), i };",
                    "        }",
                    "        seen.put(nums[i], i);",
                    "    }",
                    "    return new int[] {};",
                    "}"
                ],
                python: [
                    "def two_sum(nums, target):",
                    "    seen = {}",
                    "    for i, num in enumerate(nums):",
                    "        complement = target - num",
                    "        if complement in seen:",
                    "            return [seen[complement], i]",
                    "        seen[num] = i",
                    "    return []"
                ],
                go: [
                    "func twoSum(nums []int, target int) []int {",
                    "    seen := make(map[int]int)",
                    "    for i, num := range nums {",
                    "        complement := target - num",
                    "        if j, ok := seen[complement]; ok {",
                    "            return []int{j, i}",
                    "        }",
                    "        seen[num] = i",
                    "    }",
                    "    return []int{}",
                    "}"
                ]
            },
            ai2: {
                java: [
                    "public int[] twoSum(int[] nums, int target) {",
                    "    int[][] paired = new int[nums.length][2];",
                    "    for (int i = 0; i < nums.length; i++) paired[i] = new int[]{nums[i], i};",
                    "    Arrays.sort(paired, (a, b) -> Integer.compare(a[0], b[0]));",
                    "    int left = 0, right = nums.length - 1;",
                    "    while (left < right) {",
                    "        int sum = paired[left][0] + paired[right][0];",
                    "        if (sum == target) return new int[]{paired[left][1], paired[right][1]};",
                    "        if (sum < target) left++; else right--;",
                    "    }",
                    "    return new int[]{};",
                    "}"
                ],
                python: [
                    "def two_sum(nums, target):",
                    "    paired = sorted([(num, i) for i, num in enumerate(nums)])",
                    "    left, right = 0, len(nums) - 1",
                    "    while left < right:",
                    "        curr_sum = paired[left][0] + paired[right][0]",
                    "        if curr_sum == target:",
                    "            return [paired[left][1], paired[right][1]]",
                    "        elif curr_sum < target: left += 1",
                    "        else: right -= 1",
                    "    return []"
                ],
                go: [
                    "func twoSum(nums []int, target int) []int {",
                    "    // Sort pairs (val, origIndex)...",
                    "    left, right := 0, len(nums)-1",
                    "    for left < right {",
                    "        sum := paired[left].val + paired[right].val",
                    "        if sum == target { return []int{paired[left].idx, paired[right].idx} }",
                    "        if sum < target { left++ } else { right-- }",
                    "    }",
                    "    return []int{}",
                    "}"
                ]
            }
        };

        /* ---------- Line highlights mapping ---------- */
        const lineMap = {
            brute: {
                java: { "i-loop": 1, "j-loop": 2, "compare": 3, "found": 4 },
                python: { "i-loop": 1, "j-loop": 2, "compare": 3, "found": 4 },
                go: { "i-loop": 1, "j-loop": 2, "compare": 3, "found": 4 }
            },
            ai1: {
                java: { "i-loop": 2, "complement": 3, "check-map": 4, "found": 5, "insert": 7 },
                python: { "i-loop": 2, "complement": 3, "check-map": 4, "found": 5, "insert": 6 },
                go: { "i-loop": 2, "complement": 3, "check-map": 4, "found": 5, "insert": 7 }
            },
            ai2: {
                java: { "init": 3, "check-map": 5, "compare": 6, "found": 7, "i-loop": 8 },
                python: { "init": 1, "check-map": 3, "compare": 4, "found": 6, "i-loop": 7 },
                go: { "init": 2, "check-map": 3, "compare": 4, "found": 5, "i-loop": 6 }
            }
        };

        /* ---------- Execution simulation step generators ---------- */
        function bruteSteps() {
            const steps = [];
            for (let i = 0; i < nums.length; i++) {
                steps.push({ phase: "i-loop", i, desc: `i = ${i} → nums[${i}] = ${nums[i]}` });
                for (let j = i + 1; j < nums.length; j++) {
                    steps.push({ phase: "j-loop", i, j, desc: `j = ${j} → nums[${j}] = ${nums[j]}` });
                    const sum = nums[i] + nums[j];
                    const match = sum === target;
                    steps.push({ phase: "compare", i, j, desc: `${nums[i]} + ${nums[j]} = ${sum} ${match ? '= target ✓' : '≠ target'}`, found: match });
                    if (match) {
                        steps.push({ phase: "found", i, j, desc: `Match found → return [${i}, ${j}]`, found: true, final: true });
                        return steps;
                    }
                }
            }
            return steps;
        }

        function ai1Steps() {
            const steps = [];
            const seen = {};
            for (let i = 0; i < nums.length; i++) {
                const num = nums[i];
                steps.push({ phase: "i-loop", i, mapState: { ...seen }, desc: `i = ${i}, num = ${num}` });
                const complement = target - num;
                steps.push({ phase: "complement", i, mapState: { ...seen }, desc: `complement = ${target} - ${num} = ${complement}` });
                if (complement in seen) {
                    steps.push({ phase: "check-map", i, mapState: { ...seen }, desc: `${complement} found in map at index ${seen[complement]} ✓`, found: true });
                    steps.push({ phase: "found", i, j: seen[complement], mapState: { ...seen }, desc: `Match found → return [${seen[complement]}, ${i}]`, found: true, final: true });
                    return steps;
                }
                steps.push({ phase: "check-map", i, mapState: { ...seen }, desc: `${complement} not in map` });
                seen[num] = i;
                steps.push({ phase: "insert", i, mapState: { ...seen }, desc: `Add ${num} → ${i} to map` });
            }
            return steps;
        }

        function ai2Steps() {
            const steps = [];
            // Paired sorted: [(2,1), (3,0), (4,2), (5,4), (6,3)]
            const sorted = [
                { val: 2, orig: 1 },
                { val: 3, orig: 0 },
                { val: 4, orig: 2 },
                { val: 5, orig: 4 },
                { val: 6, orig: 3 }
            ];
            let l = 0, r = sorted.length - 1;
            steps.push({ phase: "init", desc: "Array sorted with original indices retained." });

            while (l < r) {
                const sum = sorted[l].val + sorted[r].val;
                const match = sum === target;
                steps.push({
                    phase: "compare",
                    i: sorted[l].orig,
                    j: sorted[r].orig,
                    desc: `left=${sorted[l].val} (idx ${sorted[l].orig}) + right=${sorted[r].val} (idx ${sorted[r].orig}) = ${sum}`,
                    found: match
                });
                if (match) {
                    steps.push({
                        phase: "found",
                        i: sorted[l].orig,
                        j: sorted[r].orig,
                        desc: `Match found! Return original indices [${sorted[l].orig}, ${sorted[r].orig}]`,
                        found: true,
                        final: true
                    });
                    return steps;
                }
                if (sum < target) {
                    l++;
                    steps.push({ phase: "i-loop", desc: `Sum ${sum} < target ${target} → move left pointer right` });
                } else {
                    r--;
                    steps.push({ phase: "i-loop", desc: `Sum ${sum} > target ${target} → move right pointer left` });
                }
            }
            return steps;
        }

        const stepsByApproach = { brute: bruteSteps(), ai1: ai1Steps(), ai2: ai2Steps() };

        /* ---------- State ---------- */
        let currentApproach = "brute";
        let activeLangs = ["java", "python"];
        let stepIdx = -1;
        let playTimer = null;

        /* ---------- Render high-level steps ---------- */
        function renderHighLevelSteps() {
            const container = document.getElementById("highLevelSteps");
            const info = strategyInfo[currentApproach];
            container.innerHTML = info.steps.map(s => `<li>${s}</li>`).join("");
        }

        /* ---------- Render code panels ---------- */
        function renderCodePanes() {
            const grid = document.getElementById("codeComparisonGrid");
            if (activeLangs.length === 0) {
                grid.innerHTML = `<div style="padding:20px;color:var(--text-dim);text-align:center;grid-column:1/-1;">Select at least one language to view code.</div>`;
                return;
            }
            grid.innerHTML = activeLangs.map(l => {
                const lines = code[currentApproach][l] || [];
                return `
      <div class="code-pane" data-lang="${l}">
        <div class="code-pane-header">${l.toUpperCase()}</div>
        <div class="code-lines">
          ${lines.map((line, idx) => `
            <div class="code-line" data-idx="${idx}"><span class="ln">${idx + 1}</span><span>${escapeHtml(line)}</span></div>
          `).join('')}
        </div>
      </div>
    `;
            }).join('');
        }

        function escapeHtml(s) {
            return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        /* ---------- Simulation renderers ---------- */
        function renderArray(step) {
            const chartStage = document.getElementById('chartStage');
            if(!chartStage) return;
            const maxVal = Math.max(...nums);
            chartStage.innerHTML = nums.map((n, idx) => {
                let barClass = 'bar';
                let pointerHTML = '';
                let pointerClass = 'pointer-marker';
                
                if (step) {
                    if (step.found && (idx === step.i || idx === step.j)) {
                        barClass += ' match';
                        pointerClass += ' visible match';
                        pointerHTML = `▲<br>${idx === step.i ? 'i' : 'j'}`;
                    } else if (idx === step.i) {
                        barClass += ' active';
                        pointerClass += ' visible left';
                        pointerHTML = `▲<br>i`;
                    } else if (idx === step.j) {
                        barClass += ' active';
                        pointerClass += ' visible right';
                        pointerHTML = `▲<br>j`;
                    }
                }

                return `
                <div class="bar-wrapper">
                    <div class="${barClass}" style="height: ${(n / maxVal) * 160}px"></div>
                    <div class="bar-value">${n}</div>
                    <div class="${pointerClass}">${pointerHTML}</div>
                </div>
                `;
            }).join('');
        }

        function renderMap(step) {
            const mapPanelWrap = document.getElementById('mapPanelWrap');
            if (currentApproach !== 'ai1') { mapPanelWrap.innerHTML = ''; return; }
            const state = (step && step.mapState) || {};
            const entries = Object.entries(state);
            mapPanelWrap.innerHTML = `<div class="map-panel">${entries.length
                    ? entries.map(([k, v]) => `<span class="map-chip">${k} → ${v}</span>`).join('')
                    : '<span class="empty">Hashmap is empty</span>'
                }</div>`;
        }

        function renderDesc(step) {
            const descLine = document.getElementById('descLine');
            if (!step) { descLine.textContent = 'Press play to start the execution simulation.'; descLine.classList.remove('win'); return; }
            descLine.textContent = step.desc;
            descLine.classList.toggle('win', !!step.final);
        }

        function highlightLines(step) {
            document.querySelectorAll('.code-line').forEach(el => el.classList.remove('active-line'));
            if (!step) return;
            activeLangs.forEach(l => {
                const pane = document.querySelector(`.code-pane[data-lang="${l}"]`);
                if (!pane) return;
                const mapObj = lineMap[currentApproach][l];
                if (!mapObj) return;
                const idx = mapObj[step.phase];
                if (idx === undefined) return;
                const el = pane.querySelector(`.code-line[data-idx="${idx}"]`);
                if (el) el.classList.add('active-line');
            });
        }

        function renderStep() {
            const steps = stepsByApproach[currentApproach];
            const step = stepIdx >= 0 ? steps[stepIdx] : null;
            renderArray(step);
            renderMap(step);
            renderDesc(step);
            highlightLines(step);

            document.getElementById('stepCount').textContent = `Step ${Math.max(stepIdx + 1, 0)} / ${steps.length}`;
            document.getElementById('progressFill').style.width = steps.length ? `${Math.max(stepIdx + 1, 0) / steps.length * 100}%` : '0%';

            if (step && step.final) { stopPlay(); }
        }

        function goTo(idx) {
            const steps = stepsByApproach[currentApproach];
            stepIdx = Math.max(-1, Math.min(idx, steps.length - 1));
            renderStep();
        }

        function stopPlay() {
            clearInterval(playTimer);
            playTimer = null;
            document.getElementById('btnPlay').textContent = '▶';
        }

        function togglePlay() {
            if (playTimer) { stopPlay(); return; }
            const steps = stepsByApproach[currentApproach];
            if (stepIdx >= steps.length - 1) stepIdx = -1;
            document.getElementById('btnPlay').textContent = '⏸';
            playTimer = setInterval(() => {
                const steps = stepsByApproach[currentApproach];
                if (stepIdx >= steps.length - 1) { stopPlay(); return; }
                goTo(stepIdx + 1);
            }, 850);
        }

        function setApproach(app) {
            currentApproach = app;
            stopPlay();
            stepIdx = -1;

            document.querySelectorAll('#approachSeg button').forEach(b => b.classList.toggle('active', b.dataset.approach === app));

            const info = strategyInfo[app];
            document.getElementById('approachLabel').textContent = info.title;
            document.getElementById('timeVal').textContent = info.time;
            document.getElementById('spaceVal').textContent = info.space;

            renderHighLevelSteps();
            renderCodePanes();
            renderStep();
            drawChart();
        }

        /* ---------- Complexity Chart ---------- */
        function drawChart() {
            const svg = document.getElementById('complexityChart');
            const w = 480, h = 180, pad = 30;
            const n = 10;
            const maxY = n * n;
            const pts = arr => arr.map((v, i) => {
                const x = pad + (i / (arr.length - 1)) * (w - pad * 2);
                const y = h - pad - (v / maxY) * (h - pad * 2);
                return `${x},${y}`;
            }).join(' ');

            const linear = Array.from({ length: n }, (_, i) => i + 1);
            const linearithmic = Array.from({ length: n }, (_, i) => (i + 1) * Math.log2(i + 2) * 2);
            const quad = Array.from({ length: n }, (_, i) => (i + 1) * (i + 1));

            svg.innerHTML = `
    <line x1="${pad}" y1="${h - pad}" x2="${w - pad}" y2="${h - pad}" stroke="#1c2438" stroke-width="1"/>
    <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${h - pad}" stroke="#1c2438" stroke-width="1"/>
    <text x="${w - pad}" y="${h - 10}" fill="#4c5573" font-size="10" text-anchor="end" font-family="JetBrains Mono">Elements (n) →</text>
    <text x="${pad + 4}" y="${pad + 8}" fill="#4c5573" font-size="10" font-family="JetBrains Mono">Operations</text>
    
    <!-- Quadratic (Brute Force) -->
    <polyline points="${pts(quad)}" fill="none" stroke="#f2705a" stroke-width="${currentApproach === 'brute' ? 3 : 1.2}" opacity="${currentApproach === 'brute' ? 1 : 0.35}"/>
    
    <!-- Linearithmic (Two Pointers) -->
    <polyline points="${pts(linearithmic)}" fill="none" stroke="#c792ea" stroke-width="${currentApproach === 'ai2' ? 3 : 1.2}" opacity="${currentApproach === 'ai2' ? 1 : 0.35}"/>

    <!-- Linear (Hash Map) -->
    <polyline points="${pts(linear)}" fill="none" stroke="#5ec98f" stroke-width="${currentApproach === 'ai1' ? 3 : 1.2}" opacity="${currentApproach === 'ai1' ? 1 : 0.35}"/>
  `;
        }

        /* ---------- Event Listeners ---------- */
        document.getElementById('approachSeg').addEventListener('click', e => {
            const btn = e.target.closest('button');
            if (btn) setApproach(btn.dataset.approach);
        });

        document.getElementById('langToggles').addEventListener('change', () => {
            const checkboxes = document.querySelectorAll('#langToggles input[type="checkbox"]');
            activeLangs = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);

            checkboxes.forEach(cb => {
                cb.parentElement.classList.toggle('selected', cb.checked);
            });

            renderCodePanes();
            renderStep();
        });

        document.getElementById('btnPlay').addEventListener('click', togglePlay);
        document.getElementById('btnNext').addEventListener('click', () => { stopPlay(); goTo(stepIdx + 1); });
        document.getElementById('btnPrev').addEventListener('click', () => { stopPlay(); goTo(stepIdx - 1); });
        document.getElementById('btnReset').addEventListener('click', () => { stopPlay(); goTo(-1); });

        /* ---------- Initialization ---------- */
        renderHighLevelSteps();
        renderCodePanes();
        renderStep();
        drawChart();