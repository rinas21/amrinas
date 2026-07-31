/* ── Demo data ── */
const nums = [3, 1, 4, 7, 2, 5];

/* ── Strategy metadata ── */
const strategyInfo = {
    brute: {
        title: "My Answer — Sort & Sum",
        time: "O(n log n)",
        space: "O(1)",
        steps: [
            "<strong>Sort array:</strong> Call <code>Arrays.sort(nums)</code> so the minimum is guaranteed at <code>nums[0]</code>.",
            "<strong>Iterate:</strong> For each index <code>i</code>, compute <code>count = nums[i] - nums[0]</code> (difference from minimum).",
            "<strong>Accumulate:</strong> Add <code>count</code> to <code>total</code>.",
            "<strong>Return total:</strong> The sum of all differences equals the minimum number of moves."
        ]
    },
    ai1: {
        title: "AI 1 — Math Single-Pass",
        time: "O(n)",
        space: "O(1)",
        steps: [
            "<strong>Single pass:</strong> Iterate once, tracking both <code>min</code> value and <code>sum</code> of all elements simultaneously.",
            "<strong>Apply formula:</strong> Incrementing n-1 elements by 1 is equivalent to decrementing 1 element by 1.",
            "<strong>Math insight:</strong> Total moves = <code>sum - n × min</code>. Every element needs to come down to the minimum.",
            "<strong>Overflow note:</strong> Use <code>long</code> for the sum accumulator to prevent 32-bit integer overflow."
        ]
    },
    ai2: {
        title: "AI 2 — Relative Accumulation",
        time: "O(n)",
        space: "O(1)",
        steps: [
            "<strong>Pass 1 — find minimum:</strong> Scan the array once to locate the minimum value.",
            "<strong>Pass 2 — accumulate diffs:</strong> Sum up <code>nums[i] - min</code> for every element.",
            "<strong>Overflow safe:</strong> Accumulating differences instead of the total sum prevents overflow — each diff fits in an int.",
            "<strong>Return moves:</strong> Result equals the total cost of pulling all elements down to the minimum."
        ]
    }
};

/* ── Code snippets ── */
const code = {
    brute: {
        java: [
            "public int minMoves(int[] nums) {",
            "    int count = 0, total = 0;",
            "    Arrays.sort(nums);",
            "    for (int i = 0; i < nums.length; i++) {",
            "        count = nums[i] - nums[0];",
            "        total += count;",
            "    }",
            "    return total;",
            "}"
        ],
        python: [
            "def minMoves(self, nums: list[int]) -> int:",
            "    nums.sort()",
            "    total = 0",
            "    for n in nums:",
            "        total += n - nums[0]",
            "    return total"
        ],
        go: [
            "func minMoves(nums []int) int {",
            "    sort.Ints(nums)",
            "    total := 0",
            "    for _, n := range nums {",
            "        total += n - nums[0]",
            "    }",
            "    return total",
            "}"
        ]
    },
    ai1: {
        java: [
            "public int minMoves(int[] nums) {",
            "    int min = Integer.MAX_VALUE;",
            "    long sum = 0;",
            "    for (int num : nums) {",
            "        sum += num;",
            "        if (num < min) min = num;",
            "    }",
            "    return (int)(sum - (long) nums.length * min);",
            "}"
        ],
        python: [
            "def minMoves(self, nums: list[int]) -> int:",
            "    # Python ints have no overflow",
            "    return sum(nums) - len(nums) * min(nums)"
        ],
        go: [
            "func minMoves(nums []int) int {",
            "    minVal, sum := math.MaxInt32, 0",
            "    for _, num := range nums {",
            "        sum += num",
            "        if num < minVal { minVal = num }",
            "    }",
            "    return sum - (len(nums) * minVal)",
            "}"
        ]
    },
    ai2: {
        java: [
            "public int minMoves(int[] nums) {",
            "    int min = Integer.MAX_VALUE;",
            "    for (int num : nums) {",
            "        if (num < min) min = num;",
            "    }",
            "    int moves = 0;",
            "    for (int num : nums) {",
            "        moves += (num - min);",
            "    }",
            "    return moves;",
            "}"
        ],
        python: [
            "def minMoves(self, nums: list[int]) -> int:",
            "    min_val = min(nums)",
            "    return sum(num - min_val for num in nums)"
        ],
        go: [
            "func minMoves(nums []int) int {",
            "    minVal := math.MaxInt32",
            "    for _, num := range nums {",
            "        if num < minVal { minVal = num }",
            "    }",
            "    moves := 0",
            "    for _, num := range nums {",
            "        moves += (num - minVal)",
            "    }",
            "    return moves",
            "}"
        ]
    }
};

/* ── Line highlight maps ── */
const lineMap = {
    brute: {
        java:   { "sort": 2, "loop": 3, "diff": 4, "accum": 5, "done": 7 },
        python: { "sort": 1, "loop": 3, "diff": 4, "done": 5 },
        go:     { "sort": 1, "loop": 3, "diff": 4, "done": 6 }
    },
    ai1: {
        java:   { "init": 1, "loop": 3, "sum": 4, "min": 5, "formula": 7 },
        python: { "formula": 2 },
        go:     { "init": 1, "loop": 2, "sum": 3, "min": 4, "formula": 6 }
    },
    ai2: {
        java:   { "find-min": 2, "min-loop": 3, "accum-loop": 6, "accum": 7, "done": 9 },
        python: { "find-min": 1, "formula": 2 },
        go:     { "find-min": 1, "min-loop": 2, "accum-loop": 5, "accum": 6, "done": 9 }
    }
};

/* ── Step generators ── */
function bruteSteps() {
    const steps = [];
    const sorted = [...nums].sort((a, b) => a - b);
    const minVal = sorted[0];
    steps.push({ phase: "sort", arr: sorted, minVal, activeIdx: -1, desc: `Array sorted: [${sorted}]. Minimum is now at index 0: ${minVal}.` });
    let total = 0;
    for (let i = 0; i < sorted.length; i++) {
        const diff = sorted[i] - minVal;
        steps.push({ phase: "diff", arr: sorted, minVal, activeIdx: i, diff, total, desc: `i=${i}: nums[${i}]=${sorted[i]} − min(${minVal}) = ${diff}. Running total = ${total} + ${diff}.` });
        total += diff;
        steps.push({ phase: "accum", arr: sorted, minVal, activeIdx: i, diff, total, desc: `Accumulated total = ${total}.` });
    }
    steps.push({ phase: "done", arr: sorted, minVal, activeIdx: -1, total, desc: `Done. Minimum moves = ${total}.`, final: true });
    return steps;
}

function ai1Steps() {
    const steps = [];
    steps.push({ phase: "init", arr: [...nums], activeIdx: -1, minVal: null, sum: null, desc: `Single-pass: track min and sum simultaneously. n = ${nums.length}.` });
    let minVal = Infinity, sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (nums[i] < minVal) minVal = nums[i];
        steps.push({ phase: "loop", arr: [...nums], activeIdx: i, minVal, sum, desc: `i=${i}: num=${nums[i]}. sum=${sum}, min so far=${minVal}.` });
    }
    const result = sum - nums.length * minVal;
    steps.push({ phase: "formula", arr: [...nums], minVal, sum, activeIdx: -1, desc: `Formula: sum(${sum}) − n(${nums.length}) × min(${minVal}) = ${result}.`, final: true });
    return steps;
}

function ai2Steps() {
    const steps = [];
    let minVal = Infinity;
    steps.push({ phase: "find-min", arr: [...nums], activeIdx: -1, minVal: null, moves: 0, desc: `Pass 1: find minimum value.` });
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < minVal) minVal = nums[i];
        steps.push({ phase: "min-loop", arr: [...nums], activeIdx: i, minVal, moves: 0, desc: `i=${i}: nums[${i}]=${nums[i]}. Min so far = ${minVal}.` });
    }
    steps.push({ phase: "accum-loop", arr: [...nums], activeIdx: -1, minVal, moves: 0, desc: `Min found: ${minVal}. Pass 2: accumulate differences.` });
    let moves = 0;
    for (let i = 0; i < nums.length; i++) {
        const diff = nums[i] - minVal;
        steps.push({ phase: "accum", arr: [...nums], activeIdx: i, minVal, diff, moves, desc: `i=${i}: nums[${i}]=${nums[i]} − min(${minVal}) = ${diff}. moves = ${moves} + ${diff}.` });
        moves += diff;
    }
    steps.push({ phase: "done", arr: [...nums], activeIdx: -1, minVal, moves, desc: `Done. Minimum moves = ${moves}.`, final: true });
    return steps;
}

const stepsByApproach = { brute: bruteSteps(), ai1: ai1Steps(), ai2: ai2Steps() };

/* ── State ── */
let currentApproach = "brute";
let activeLangs = ["java", "python"];
let stepIdx = -1;
let playTimer = null;

/* ── Helpers ── */
function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ── Render high-level steps ── */
function renderHighLevelSteps() {
    document.getElementById("highLevelSteps").innerHTML =
        strategyInfo[currentApproach].steps.map(s => `<li>${s}</li>`).join("");
}

/* ── Render code panes ── */
function renderCodePanes() {
    const grid = document.getElementById("codeComparisonGrid");
    if (activeLangs.length === 0) {
        grid.innerHTML = `<div style="padding:20px;color:var(--text-dim);text-align:center;grid-column:1/-1;">Select at least one language.</div>`;
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
      </div>`;
    }).join('');
}

/* ── Render bar chart ── */
function renderChart(step) {
    const stage = document.getElementById('chartStage');
    if (!stage) return;

    const arr = (step && step.arr) ? step.arr : nums;
    const minVal = (step && step.minVal !== null && step.minVal !== undefined) ? step.minVal : null;
    const activeIdx = step ? step.activeIdx : -1;
    const isDone = step && step.final;
    const maxVal = Math.max(...arr);

    stage.innerHTML = arr.map((v, i) => {
        const heightPx = Math.max(8, Math.round((v / maxVal) * 150));
        let barCls = 'bar';
        let deltaHtml = '';

        if (isDone) {
            barCls += ' done';
        } else if (minVal !== null && v === minVal && (activeIdx === -1 || i !== activeIdx)) {
            barCls += ' min-bar';
        } else if (i === activeIdx) {
            barCls += ' current';
        }

        if (step && step.diff !== undefined && i === activeIdx && !isDone) {
            deltaHtml = `<div class="delta-label">−${step.diff}</div>`;
        }

        return `
      <div class="bar-wrapper">
        ${deltaHtml}
        <div class="${barCls}" style="height:${heightPx}px"></div>
        <div class="bar-value">${v}</div>
        <div class="bar-idx">${i}</div>
      </div>`;
    }).join('');
}

/* ── Render info chips ── */
function renderInfo(step) {
    const panel = document.getElementById('infoPanel');
    if (!panel) return;
    if (!step) { panel.innerHTML = `<span class="info-empty">Stats appear during simulation.</span>`; return; }

    const chips = [];
    if (step.minVal !== null && step.minVal !== undefined && step.minVal !== Infinity) {
        chips.push(`<span class="info-chip ok">min = ${step.minVal}</span>`);
    }
    if (step.sum !== undefined && step.sum !== null) {
        chips.push(`<span class="info-chip">sum = ${step.sum}</span>`);
    }
    if (step.total !== undefined) {
        chips.push(`<span class="info-chip">total = ${step.total}</span>`);
    }
    if (step.moves !== undefined) {
        chips.push(`<span class="info-chip">moves = ${step.moves}</span>`);
    }
    if (step.diff !== undefined) {
        chips.push(`<span class="info-chip">diff = ${step.diff}</span>`);
    }

    panel.innerHTML = chips.length ? chips.join('') : `<span class="info-empty">—</span>`;
}

/* ── Render desc ── */
function renderDesc(step) {
    const el = document.getElementById('descLine');
    if (!step) { el.textContent = 'Press play to start the execution simulation.'; el.classList.remove('win'); return; }
    el.textContent = step.desc;
    el.classList.toggle('win', !!step.final);
}

/* ── Highlight code ── */
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

/* ── Render step ── */
function renderStep() {
    const steps = stepsByApproach[currentApproach];
    const step = stepIdx >= 0 ? steps[stepIdx] : null;
    renderChart(step);
    renderInfo(step);
    renderDesc(step);
    highlightLines(step);
    document.getElementById('stepCount').textContent = `Step ${Math.max(stepIdx + 1, 0)} / ${steps.length}`;
    document.getElementById('progressFill').style.width = steps.length ? `${Math.max(stepIdx + 1, 0) / steps.length * 100}%` : '0%';
    if (step && step.final) stopPlay();
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
    }, 900);
}

/* ── Set approach ── */
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

/* ── Complexity Chart ── */
function drawChart() {
    const svg = document.getElementById('complexityChart');
    const w = 480, h = 180, pad = 30, n = 20;
    const maxY = n * Math.log2(n + 1);

    const pts = arr => arr.map((v, i) => {
        const x = pad + (i / (arr.length - 1)) * (w - pad * 2);
        const y = h - pad - (Math.min(v, maxY) / maxY) * (h - pad * 2);
        return `${x},${y}`;
    }).join(' ');

    const nlogn  = Array.from({ length: n }, (_, i) => (i + 1) * Math.log2(i + 2));
    const linear = Array.from({ length: n }, (_, i) => (i + 1) * (maxY / n));

    svg.innerHTML = `
    <line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="#1c2438" stroke-width="1"/>
    <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${h-pad}" stroke="#1c2438" stroke-width="1"/>
    <text x="${w-pad}" y="${h-10}" fill="#4c5573" font-size="10" text-anchor="end" font-family="JetBrains Mono">Elements (n) →</text>
    <text x="${pad+4}" y="${pad+8}" fill="#4c5573" font-size="10" font-family="JetBrains Mono">Operations</text>

    <polyline points="${pts(nlogn)}" fill="none" stroke="#f2705a"
      stroke-width="${currentApproach === 'brute' ? 3 : 1.2}"
      opacity="${currentApproach === 'brute' ? 1 : 0.35}"/>

    <polyline points="${pts(linear)}" fill="none" stroke="#5ec98f"
      stroke-width="${currentApproach === 'ai1' ? 3 : 1.2}"
      opacity="${currentApproach === 'ai1' ? 1 : 0.35}"/>

    <polyline points="${pts(linear.map(v => v * 0.9))}" fill="none" stroke="#c792ea"
      stroke-width="${currentApproach === 'ai2' ? 3 : 1.2}"
      opacity="${currentApproach === 'ai2' ? 1 : 0.35}"/>
  `;
}

/* ── Events ── */
document.getElementById('approachSeg').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (btn) setApproach(btn.dataset.approach);
});

document.getElementById('langToggles').addEventListener('change', () => {
    const cbs = document.querySelectorAll('#langToggles input[type="checkbox"]');
    activeLangs = Array.from(cbs).filter(cb => cb.checked).map(cb => cb.value);
    cbs.forEach(cb => cb.parentElement.classList.toggle('selected', cb.checked));
    renderCodePanes();
    renderStep();
});

document.getElementById('btnPlay').addEventListener('click', togglePlay);
document.getElementById('btnNext').addEventListener('click', () => { stopPlay(); goTo(stepIdx + 1); });
document.getElementById('btnPrev').addEventListener('click', () => { stopPlay(); goTo(stepIdx - 1); });
document.getElementById('btnReset').addEventListener('click', () => { stopPlay(); goTo(-1); });

/* ── Init ── */
renderHighLevelSteps();
renderCodePanes();
renderStep();
drawChart();
