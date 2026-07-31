/* ── Demo data ── */
const nums1 = [1, 3, 8, 10];
const nums2 = [2, 4, 6, 7, 9];

/* ── Strategy metadata ── */
const strategyInfo = {
    brute: {
        title: "My Answer — Merge & Sort",
        time: "O((m+n) log(m+n))",
        space: "O(m+n)",
        steps: [
            "<strong>Create merged array:</strong> Allocate new array of size <code>m + n</code>.",
            "<strong>Copy nums1:</strong> Copy all elements of <code>nums1</code> into the merged array.",
            "<strong>Copy nums2:</strong> Copy all elements of <code>nums2</code> into the merged array.",
            "<strong>Sort:</strong> Call <code>Arrays.sort()</code> on the merged array — O((m+n) log(m+n)).",
            "<strong>Pick median:</strong> If odd length return middle; if even return average of two middle elements."
        ]
    },
    ai1: {
        title: "AI 1 — Binary Search Partition",
        time: "O(log(min(m,n)))",
        space: "O(1)",
        steps: [
            "<strong>Ensure shorter array first:</strong> Binary search on the smaller array to keep it O(log(min(m,n))).",
            "<strong>Binary search partition X:</strong> Search for <code>partitionX</code> in nums1 using <code>low</code> and <code>high</code> pointers.",
            "<strong>Derive partition Y:</strong> Compute <code>partitionY = (m+n+1)/2 - partitionX</code> so left halves are equal size.",
            "<strong>Find boundary values:</strong> Compute <code>maxLeftX, minRightX, maxLeftY, minRightY</code> using sentinel ±∞.",
            "<strong>Validate partition:</strong> If <code>maxLeftX ≤ minRightY && maxLeftY ≤ minRightX</code>, partition is correct — compute median.",
            "<strong>Adjust search:</strong> If <code>maxLeftX > minRightY</code>, move <code>high</code> left; else move <code>low</code> right."
        ]
    },
    ai2: {
        title: "AI 2 — K-th Element Elimination",
        time: "O(log(m+n))",
        space: "O(log(m+n))",
        steps: [
            "<strong>Define target k:</strong> For odd total, find element at position <code>total/2 + 1</code>; for even, find two middle elements.",
            "<strong>Base cases:</strong> If one array exhausted, return from the other; if k=1, return min of both fronts.",
            "<strong>Compare k/2-th elements:</strong> Compare <code>nums1[start1 + k/2 - 1]</code> vs <code>nums2[start2 + k/2 - 1]</code>.",
            "<strong>Eliminate smaller half:</strong> The side with the smaller k/2-th element cannot contain the k-th smallest — advance that start pointer by k/2.",
            "<strong>Recurse with reduced k:</strong> Call recursively with <code>k - k/2</code> until base case reached."
        ]
    }
};

/* ── Code snippets ── */
const code = {
    brute: {
        java: [
            "public double findMedianSortedArrays(int[] nums1, int[] nums2) {",
            "    int[] arr = new int[nums1.length + nums2.length];",
            "    for (int i = 0; i < nums1.length; i++) arr[i] = nums1[i];",
            "    for (int j = 0; j < nums2.length; j++) arr[j + nums1.length] = nums2[j];",
            "    Arrays.sort(arr);",
            "    if (arr.length % 2 != 0) return arr[arr.length / 2];",
            "    return (arr[arr.length/2] + arr[arr.length/2 - 1]) / 2.0;",
            "}"
        ],
        python: [
            "def findMedianSortedArrays(self, nums1, nums2):",
            "    arr = nums1 + nums2",
            "    arr.sort()",
            "    n = len(arr)",
            "    if n % 2 != 0:",
            "        return float(arr[n // 2])",
            "    return (arr[n // 2] + arr[n // 2 - 1]) / 2.0"
        ],
        go: [
            "func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {",
            "    arr := append(nums1, nums2...)",
            "    sort.Ints(arr)",
            "    n := len(arr)",
            "    if n%2 != 0 { return float64(arr[n/2]) }",
            "    return float64(arr[n/2]+arr[n/2-1]) / 2.0",
            "}"
        ]
    },
    ai1: {
        java: [
            "public double findMedianSortedArrays(int[] nums1, int[] nums2) {",
            "    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);",
            "    int m = nums1.length, n = nums2.length, low = 0, high = m;",
            "    while (low <= high) {",
            "        int pX = (low + high) / 2;",
            "        int pY = (m + n + 1) / 2 - pX;",
            "        int mLX = pX == 0 ? Integer.MIN_VALUE : nums1[pX - 1];",
            "        int mRX = pX == m ? Integer.MAX_VALUE : nums1[pX];",
            "        int mLY = pY == 0 ? Integer.MIN_VALUE : nums2[pY - 1];",
            "        int mRY = pY == n ? Integer.MAX_VALUE : nums2[pY];",
            "        if (mLX <= mRY && mLY <= mRX) {",
            "            if ((m+n)%2!=0) return Math.max(mLX, mLY);",
            "            return (Math.max(mLX,mLY) + Math.min(mRX,mRY)) / 2.0;",
            "        } else if (mLX > mRY) { high = pX - 1; }",
            "        else { low = pX + 1; }",
            "    }",
            "    throw new IllegalArgumentException();",
            "}"
        ],
        python: [
            "def findMedianSortedArrays(self, nums1, nums2):",
            "    if len(nums1) > len(nums2): return self.findMedianSortedArrays(nums2, nums1)",
            "    m, n = len(nums1), len(nums2)",
            "    low, high = 0, m",
            "    while low <= high:",
            "        pX = (low + high) // 2",
            "        pY = (m + n + 1) // 2 - pX",
            "        mLX = float('-inf') if pX == 0 else nums1[pX - 1]",
            "        mRX = float('inf')  if pX == m else nums1[pX]",
            "        mLY = float('-inf') if pY == 0 else nums2[pY - 1]",
            "        mRY = float('inf')  if pY == n else nums2[pY]",
            "        if mLX <= mRY and mLY <= mRX:",
            "            if (m+n)%2 != 0: return float(max(mLX, mLY))",
            "            return (max(mLX,mLY) + min(mRX,mRY)) / 2.0",
            "        elif mLX > mRY: high = pX - 1",
            "        else: low = pX + 1"
        ],
        go: [
            "func findMedianSortedArrays(nums1, nums2 []int) float64 {",
            "    if len(nums1) > len(nums2) { return findMedianSortedArrays(nums2, nums1) }",
            "    m, n := len(nums1), len(nums2)",
            "    low, high := 0, m",
            "    for low <= high {",
            "        pX := (low + high) / 2",
            "        pY := (m+n+1)/2 - pX",
            "        mLX, mRX := math.MinInt64, math.MaxInt64",
            "        if pX > 0 { mLX = nums1[pX-1] }",
            "        if pX < m { mRX = nums1[pX] }",
            "        mLY, mRY := math.MinInt64, math.MaxInt64",
            "        if pY > 0 { mLY = nums2[pY-1] }",
            "        if pY < n { mRY = nums2[pY] }",
            "        if mLX <= mRY && mLY <= mRX {",
            "            if (m+n)%2 != 0 { return float64(max(mLX,mLY)) }",
            "            return float64(max(mLX,mLY)+min(mRX,mRY)) / 2.0",
            "        } else if mLX > mRY { high = pX - 1 } else { low = pX + 1 }",
            "    }",
            "    return 0.0",
            "}"
        ]
    },
    ai2: {
        java: [
            "public double findMedianSortedArrays(int[] nums1, int[] nums2) {",
            "    int total = nums1.length + nums2.length;",
            "    if (total % 2 != 0) return getKth(nums1,0,nums2,0,total/2+1);",
            "    return (getKth(nums1,0,nums2,0,total/2) + getKth(nums1,0,nums2,0,total/2+1)) / 2.0;",
            "}",
            "private int getKth(int[] a, int s1, int[] b, int s2, int k) {",
            "    if (s1 >= a.length) return b[s2+k-1];",
            "    if (s2 >= b.length) return a[s1+k-1];",
            "    if (k == 1) return Math.min(a[s1], b[s2]);",
            "    int m1 = s1+k/2-1 < a.length ? a[s1+k/2-1] : Integer.MAX_VALUE;",
            "    int m2 = s2+k/2-1 < b.length ? b[s2+k/2-1] : Integer.MAX_VALUE;",
            "    if (m1 < m2) return getKth(a, s1+k/2, b, s2, k-k/2);",
            "    else return getKth(a, s1, b, s2+k/2, k-k/2);",
            "}"
        ],
        python: [
            "def findMedianSortedArrays(self, nums1, nums2):",
            "    total = len(nums1) + len(nums2)",
            "    def getKth(s1, s2, k):",
            "        if s1 >= len(nums1): return nums2[s2+k-1]",
            "        if s2 >= len(nums2): return nums1[s1+k-1]",
            "        if k == 1: return min(nums1[s1], nums2[s2])",
            "        idx1 = s1+k//2-1; idx2 = s2+k//2-1",
            "        m1 = nums1[idx1] if idx1 < len(nums1) else float('inf')",
            "        m2 = nums2[idx2] if idx2 < len(nums2) else float('inf')",
            "        if m1 < m2: return getKth(s1+k//2, s2, k-k//2)",
            "        else: return getKth(s1, s2+k//2, k-k//2)",
            "    if total%2!=0: return float(getKth(0,0,total//2+1))",
            "    return (getKth(0,0,total//2) + getKth(0,0,total//2+1)) / 2.0"
        ],
        go: [
            "func findMedianSortedArrays(nums1, nums2 []int) float64 {",
            "    total := len(nums1) + len(nums2)",
            "    if total%2 != 0 { return float64(getKth(nums1,0,nums2,0,total/2+1)) }",
            "    l := getKth(nums1,0,nums2,0,total/2)",
            "    r := getKth(nums1,0,nums2,0,total/2+1)",
            "    return float64(l+r) / 2.0",
            "}",
            "func getKth(a []int, s1 int, b []int, s2, k int) int {",
            "    if s1 >= len(a) { return b[s2+k-1] }",
            "    if s2 >= len(b) { return a[s1+k-1] }",
            "    if k == 1 { return min(a[s1], b[s2]) }",
            "    m1, m2 := math.MaxInt32, math.MaxInt32",
            "    if s1+k/2-1 < len(a) { m1 = a[s1+k/2-1] }",
            "    if s2+k/2-1 < len(b) { m2 = b[s2+k/2-1] }",
            "    if m1 < m2 { return getKth(a, s1+k/2, b, s2, k-k/2) }",
            "    return getKth(a, s1, b, s2+k/2, k-k/2)",
            "}"
        ]
    }
};

/* ── Line highlight maps ── */
const lineMap = {
    brute: {
        java:   { "copy1": 2, "copy2": 3, "sort": 4, "pick": 5 },
        python: { "copy1": 1, "sort": 2, "pick": 5 },
        go:     { "copy1": 1, "sort": 2, "pick": 4 }
    },
    ai1: {
        java:   { "init": 2, "partition": 4, "bounds": 6, "check": 10, "found": 11, "adjust": 13 },
        python: { "init": 1, "partition": 5, "bounds": 7, "check": 11, "found": 12, "adjust": 14 },
        go:     { "init": 2, "partition": 5, "bounds": 7, "check": 13, "found": 14, "adjust": 16 }
    },
    ai2: {
        java:   { "kth-call": 2, "base1": 6, "base2": 7, "base3": 8, "compare": 9, "elim": 11 },
        python: { "kth-call": 1, "base1": 3, "base2": 4, "base3": 5, "compare": 7, "elim": 9 },
        go:     { "kth-call": 2, "base1": 8, "base2": 9, "base3": 10, "compare": 11, "elim": 13 }
    }
};

/* ── Step generators ── */
function bruteSteps() {
    const arr = [...nums1, ...nums2].sort((a, b) => a - b);
    const steps = [];
    steps.push({ phase: "copy1", merged: [...nums1], desc: `Copy nums1 = [${nums1}] into merged array.` });
    steps.push({ phase: "copy2", merged: [...nums1, ...nums2], desc: `Copy nums2 = [${nums2}] into merged array → [${nums1.concat(nums2)}].` });
    steps.push({ phase: "sort", merged: arr, desc: `Sort merged array → [${arr}].` });
    const n = arr.length;
    if (n % 2 !== 0) {
        steps.push({ phase: "pick", merged: arr, medianIdx: [Math.floor(n / 2)], desc: `Odd length: median = arr[${Math.floor(n/2)}] = ${arr[Math.floor(n/2)]}.`, final: true });
    } else {
        steps.push({ phase: "pick", merged: arr, medianIdx: [n/2 - 1, n/2], desc: `Even length: median = (arr[${n/2-1}] + arr[${n/2}]) / 2 = (${arr[n/2-1]} + ${arr[n/2]}) / 2 = ${(arr[n/2-1]+arr[n/2])/2}.`, final: true });
    }
    return steps;
}

function ai1Steps() {
    const steps = [];
    const m = nums1.length, n = nums2.length;
    let low = 0, high = m;
    steps.push({ phase: "init", pX: -1, pY: -1, desc: `Binary search on nums1 (shorter). m=${m}, n=${n}. low=0, high=${m}.` });

    while (low <= high) {
        const pX = Math.floor((low + high) / 2);
        const pY = Math.floor((m + n + 1) / 2) - pX;
        steps.push({ phase: "partition", pX, pY, desc: `pX=${pX} (nums1 partition), pY=${pY} (nums2 partition). low=${low}, high=${high}.` });

        const maxLX = pX === 0 ? -Infinity : nums1[pX - 1];
        const minRX = pX === m ?  Infinity : nums1[pX];
        const maxLY = pY === 0 ? -Infinity : nums2[pY - 1];
        const minRY = pY === n ?  Infinity : nums2[pY];

        const mLXStr = pX === 0 ? "-∞" : nums1[pX-1];
        const mRXStr = pX === m ? "+∞" : nums1[pX];
        const mLYStr = pY === 0 ? "-∞" : nums2[pY-1];
        const mRYStr = pY === n ? "+∞" : nums2[pY];

        steps.push({
            phase: "bounds", pX, pY,
            desc: `maxLX=${mLXStr}, minRX=${mRXStr} | maxLY=${mLYStr}, minRY=${mRYStr}`
        });

        if (maxLX <= minRY && maxLY <= minRX) {
            const total = m + n;
            let result;
            if (total % 2 !== 0) {
                result = Math.max(maxLX, maxLY);
                steps.push({ phase: "found", pX, pY, desc: `Partition valid! Odd total. Median = max(maxLX,maxLY) = max(${mLXStr},${mLYStr}) = ${result}.`, final: true });
            } else {
                result = (Math.max(maxLX, maxLY) + Math.min(minRX, minRY)) / 2;
                steps.push({ phase: "found", pX, pY, desc: `Partition valid! Even total. Median = (max(${mLXStr},${mLYStr}) + min(${mRXStr},${mRYStr})) / 2 = ${result}.`, final: true });
            }
            return steps;
        } else if (maxLX > minRY) {
            steps.push({ phase: "adjust", pX, pY, desc: `maxLX(${mLXStr}) > minRY(${mRYStr}): too many from nums1. Move high = pX-1 = ${pX-1}.` });
            high = pX - 1;
        } else {
            steps.push({ phase: "adjust", pX, pY, desc: `maxLY(${mLYStr}) > minRX(${mRXStr}): too few from nums1. Move low = pX+1 = ${pX+1}.` });
            low = pX + 1;
        }
    }
    return steps;
}

function ai2Steps() {
    const steps = [];
    const a = nums1, b = nums2;
    const total = a.length + b.length;
    const callLog = [];

    function getKth(s1, s2, k, depth) {
        if (depth > 12) return; // safety
        const indent = " ".repeat(depth * 2);
        steps.push({ phase: "kth-call", k, s1, s2, desc: `${indent}getKth(s1=${s1}, s2=${s2}, k=${k})` });

        if (s1 >= a.length) {
            steps.push({ phase: "base1", k, s1, s2, desc: `${indent}nums1 exhausted. Return nums2[${s2+k-1}] = ${b[s2+k-1]}.`, final: k === Math.ceil(total/2) });
            return;
        }
        if (s2 >= b.length) {
            steps.push({ phase: "base2", k, s1, s2, desc: `${indent}nums2 exhausted. Return nums1[${s1+k-1}] = ${a[s1+k-1]}.`, final: k === Math.ceil(total/2) });
            return;
        }
        if (k === 1) {
            const res = Math.min(a[s1], b[s2]);
            steps.push({ phase: "base3", k, s1, s2, desc: `${indent}k=1: min(nums1[${s1}]=${a[s1]}, nums2[${s2}]=${b[s2]}) = ${res}.`, final: true });
            return;
        }
        const idx1 = s1 + Math.floor(k/2) - 1;
        const idx2 = s2 + Math.floor(k/2) - 1;
        const m1 = idx1 < a.length ? a[idx1] : Infinity;
        const m2 = idx2 < b.length ? b[idx2] : Infinity;
        const m1Str = idx1 < a.length ? `nums1[${idx1}]=${m1}` : "+∞";
        const m2Str = idx2 < b.length ? `nums2[${idx2}]=${m2}` : "+∞";
        steps.push({ phase: "compare", k, s1, s2, desc: `${indent}Compare k/2=${Math.floor(k/2)} elements: ${m1Str} vs ${m2Str}.` });
        if (m1 < m2) {
            steps.push({ phase: "elim", k, s1, s2, desc: `${indent}${m1Str} smaller → eliminate first ${Math.floor(k/2)} of nums1. Advance s1 to ${s1+Math.floor(k/2)}.` });
            getKth(s1 + Math.floor(k/2), s2, k - Math.floor(k/2), depth + 1);
        } else {
            steps.push({ phase: "elim", k, s1, s2, desc: `${indent}${m2Str} smaller/equal → eliminate first ${Math.floor(k/2)} of nums2. Advance s2 to ${s2+Math.floor(k/2)}.` });
            getKth(s1, s2 + Math.floor(k/2), k - Math.floor(k/2), depth + 1);
        }
    }

    if (total % 2 !== 0) {
        steps.push({ phase: "kth-call", desc: `Odd total (${total}). Find element at position ${Math.floor(total/2)+1}.`, k: Math.floor(total/2)+1, s1:0, s2:0 });
        getKth(0, 0, Math.floor(total / 2) + 1, 1);
    } else {
        steps.push({ phase: "kth-call", desc: `Even total (${total}). Find elements at positions ${total/2} and ${total/2+1}.`, k: total/2, s1:0, s2:0 });
        getKth(0, 0, total / 2, 1);
        getKth(0, 0, total / 2 + 1, 1);
    }
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
    const container = document.getElementById("highLevelSteps");
    container.innerHTML = strategyInfo[currentApproach].steps.map(s => `<li>${s}</li>`).join("");
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
      </div>
    `;
    }).join('');
}

/* ── Render arrays visualizer ── */
function renderArrays(step) {
    const display = document.getElementById('arraysDisplay');
    if (!display) return;

    if (currentApproach === 'brute') {
        // Show merged array being built
        const merged = (step && step.merged) ? step.merged : [];
        const medianIdx = (step && step.medianIdx) ? step.medianIdx : [];
        display.innerHTML = `
      <div class="array-row-wrap">
        <span class="array-label">merged:</span>
        <div class="arr-row">
          ${merged.length ? merged.map((v, i) => {
            const isMed = medianIdx.includes(i);
            return `<div class="arr-box ${isMed ? 'median-el' : ''}"><span>${v}</span><span class="idx">${i}</span></div>`;
          }).join('') : '<span style="color:var(--text-dim);font-size:12px;">building...</span>'}
        </div>
      </div>
    `;
        return;
    }

    if (currentApproach === 'ai1') {
        const pX = (step && step.pX !== undefined && step.pX >= 0) ? step.pX : -1;
        const pY = (step && step.pY !== undefined && step.pY >= 0) ? step.pY : -1;
        display.innerHTML = `
      <div class="array-row-wrap">
        <span class="array-label">nums1:</span>
        <div class="arr-row">
          ${nums1.map((v, i) => {
            let cls = '';
            if (pX >= 0) cls = i < pX ? 'left-part' : (i === pX ? 'partition-ptr' : 'right-part');
            return `<div class="arr-box ${cls}"><span>${v}</span><span class="idx">${i}</span></div>`;
          }).join('')}
        </div>
      </div>
      <div class="array-row-wrap">
        <span class="array-label">nums2:</span>
        <div class="arr-row">
          ${nums2.map((v, i) => {
            let cls = '';
            if (pY >= 0) cls = i < pY ? 'left-part' : (i === pY ? 'partition-ptr' : 'right-part');
            return `<div class="arr-box ${cls}"><span>${v}</span><span class="idx">${i}</span></div>`;
          }).join('')}
        </div>
      </div>
    `;
        return;
    }

    // ai2: just show both arrays
    display.innerHTML = `
    <div class="array-row-wrap">
      <span class="array-label">nums1:</span>
      <div class="arr-row">
        ${nums1.map((v, i) => `<div class="arr-box"><span>${v}</span><span class="idx">${i}</span></div>`).join('')}
      </div>
    </div>
    <div class="array-row-wrap">
      <span class="array-label">nums2:</span>
      <div class="arr-row">
        ${nums2.map((v, i) => `<div class="arr-box"><span>${v}</span><span class="idx">${i}</span></div>`).join('')}
      </div>
    </div>
  `;
}

/* ── Render partition info chips ── */
function renderPartition(step) {
    const pd = document.getElementById('partitionDisplay');
    if (!pd) return;
    if (!step || currentApproach !== 'ai1') {
        pd.innerHTML = '';
        return;
    }
    const pX = step.pX;
    const pY = step.pY;
    if (pX === undefined || pX < 0) { pd.innerHTML = ''; return; }

    const maxLX = pX === 0 ? "-∞" : nums1[pX - 1];
    const minRX = pX === nums1.length ? "+∞" : nums1[pX];
    const maxLY = pY === 0 ? "-∞" : nums2[pY - 1];
    const minRY = pY === nums2.length ? "+∞" : nums2[pY];

    const valid = step.phase === 'found';
    pd.innerHTML = `
    <span class="part-chip ${valid ? 'ok' : ''}">pX = ${pX}</span>
    <span class="part-chip ${valid ? 'ok' : ''}">pY = ${pY}</span>
    <span class="part-chip">maxLX = ${maxLX}</span>
    <span class="part-chip">minRX = ${minRX}</span>
    <span class="part-chip">maxLY = ${maxLY}</span>
    <span class="part-chip">minRY = ${minRY}</span>
  `;
}

/* ── Render description ── */
function renderDesc(step) {
    const descLine = document.getElementById('descLine');
    if (!step) {
        descLine.textContent = 'Press play to start the execution simulation.';
        descLine.classList.remove('win');
        return;
    }
    descLine.textContent = step.desc;
    descLine.classList.toggle('win', !!step.final);
}

/* ── Highlight code lines ── */
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
    renderArrays(step);
    renderPartition(step);
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
    }, 950);
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
    const w = 480, h = 180, pad = 30;
    const n = 20;
    const maxY = n * Math.log2(n + 1) * (n + 1);

    const pts = arr => arr.map((v, i) => {
        const x = pad + (i / (arr.length - 1)) * (w - pad * 2);
        const y = h - pad - (Math.min(v, maxY) / maxY) * (h - pad * 2);
        return `${x},${y}`;
    }).join(' ');

    // O((m+n)log(m+n)) — merge+sort
    const mergeSort = Array.from({ length: n }, (_, i) => (i + 1) * Math.log2(i + 2) * (i + 1));
    // O(log(m+n)) — kth element
    const logN = Array.from({ length: n }, (_, i) => Math.log2(i + 2) * 8);
    // O(log(min(m,n))) — binary search partition (roughly same curve, slightly lower)
    const logMin = Array.from({ length: n }, (_, i) => Math.log2(Math.floor((i + 2) / 2) + 1) * 6);

    svg.innerHTML = `
    <line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="#1c2438" stroke-width="1"/>
    <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${h-pad}" stroke="#1c2438" stroke-width="1"/>
    <text x="${w-pad}" y="${h-10}" fill="#4c5573" font-size="10" text-anchor="end" font-family="JetBrains Mono">Elements (n) →</text>
    <text x="${pad+4}" y="${pad+8}" fill="#4c5573" font-size="10" font-family="JetBrains Mono">Operations</text>

    <!-- Merge+Sort -->
    <polyline points="${pts(mergeSort)}" fill="none" stroke="#f2705a"
      stroke-width="${currentApproach === 'brute' ? 3 : 1.2}"
      opacity="${currentApproach === 'brute' ? 1 : 0.35}"/>

    <!-- K-th Element -->
    <polyline points="${pts(logN)}" fill="none" stroke="#c792ea"
      stroke-width="${currentApproach === 'ai2' ? 3 : 1.2}"
      opacity="${currentApproach === 'ai2' ? 1 : 0.35}"/>

    <!-- Binary Search Partition -->
    <polyline points="${pts(logMin)}" fill="none" stroke="#5ec98f"
      stroke-width="${currentApproach === 'ai1' ? 3 : 1.2}"
      opacity="${currentApproach === 'ai1' ? 1 : 0.35}"/>
  `;
}

/* ── Event Listeners ── */
document.getElementById('approachSeg').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (btn) setApproach(btn.dataset.approach);
});

document.getElementById('langToggles').addEventListener('change', () => {
    const checkboxes = document.querySelectorAll('#langToggles input[type="checkbox"]');
    activeLangs = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    checkboxes.forEach(cb => cb.parentElement.classList.toggle('selected', cb.checked));
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
