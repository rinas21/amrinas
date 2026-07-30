(function() {
    // Initial Data
    let array = [3, 7, 9, 10, 12, 13, 17, 18, 19, 22, 23, 25];
    let target = 20;

    // State
    let steps = [];
    let currentStepIndex = 0;
    let isPlaying = false;
    let timer = null;

    // DOM Elements
    const chartStage = document.getElementById('chartStage');
    const equationEl = document.getElementById('equation');
    const targetValEl = document.getElementById('targetVal');
    const sumValEl = document.getElementById('sumVal');
    const statusMessageEl = document.getElementById('statusMessage');
    const playBtn = document.getElementById('visPlayBtn');
    const prevBtn = document.getElementById('visPrevBtn');
    const nextBtn = document.getElementById('visNextBtn');
    const progressBar = document.getElementById('visProgressBar');
    const stepCounter = document.getElementById('visStepCounter');
    const speedSelect = document.getElementById('visSpeedSelect');
    const randomizeBtn = document.getElementById('visRandomizeBtn');

    if (!chartStage) return;

    // Generate Simulation Steps
    function buildSteps() {
        steps = [];
        let left = 0;
        let right = array.length - 1;

        while (left < right) {
            const sum = array[left] + array[right];

            if (sum === target) {
                steps.push({
                    left, right, sum, target,
                    status: `found ${array[left]} + ${array[right]} = ${target} at indices ${left}, ${right}`,
                    matched: true
                });
                break;
            } else if (sum > target) {
                steps.push({
                    left, right, sum, target,
                    status: `Sum (${sum}) > Target (${target}). Shrink sum from right (R--)`,
                    matched: false
                });
                right--;
            } else {
                steps.push({
                    left, right, sum, target,
                    status: `Sum (${sum}) < Target (${target}). Grow sum from left (L++)`,
                    matched: false
                });
                left++;
            }
        }

        if (progressBar) progressBar.max = steps.length - 1;
    }

    // Render DOM Bars
    function renderChart() {
        chartStage.innerHTML = '';
        const maxVal = Math.max(...array);

        array.forEach((val, idx) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'bar-wrapper';

            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.id = `bar-${idx}`;
            bar.style.height = `${(val / maxVal) * 160}px`;

            const barVal = document.createElement('div');
            barVal.className = 'bar-value';
            barVal.innerText = val;

            // Pointer elements
            const pointer = document.createElement('div');
            pointer.className = `pointer-marker`;
            pointer.id = `pointer-${idx}`;

            wrapper.appendChild(bar);
            wrapper.appendChild(barVal);
            wrapper.appendChild(pointer);
            chartStage.appendChild(wrapper);
        });
    }

    // Update Visual state to specific step
    function applyStep(stepIdx) {
        if (steps.length === 0) return;
        currentStepIndex = stepIdx;
        const step = steps[stepIdx];

        // Reset styles
        array.forEach((_, i) => {
            const bar = document.getElementById(`bar-${i}`);
            const pointer = document.getElementById(`pointer-${i}`);
            if (bar) bar.className = 'bar';
            if (pointer) {
                pointer.className = 'pointer-marker';
                pointer.innerHTML = '';
            }
        });

        const leftBar = document.getElementById(`bar-${step.left}`);
        const rightBar = document.getElementById(`bar-${step.right}`);
        const leftPointer = document.getElementById(`pointer-${step.left}`);
        const rightPointer = document.getElementById(`pointer-${step.right}`);

        const stateClass = step.matched ? 'match' : 'active';

        if (leftBar) leftBar.classList.add(stateClass);
        if (rightBar) rightBar.classList.add(stateClass);

        if (leftPointer) {
            leftPointer.classList.add('visible', stateClass);
            leftPointer.innerHTML = `▲<br>L`;
        }

        if (rightPointer) {
            rightPointer.classList.add('visible', stateClass);
            rightPointer.innerHTML = `▲<br>R`;
        }

        // Text Updates
        if (equationEl) equationEl.innerText = `${array[step.left]} + ${array[step.right]} = ${step.sum}`;
        if (targetValEl) targetValEl.innerText = step.target;
        if (sumValEl) sumValEl.innerText = step.sum;
        if (statusMessageEl) statusMessageEl.innerText = step.status;

        // Control Updates
        if (progressBar) progressBar.value = currentStepIndex;
        if (stepCounter) stepCounter.innerText = `${currentStepIndex + 1} / ${steps.length}`;
    }

    // Animation Controls
    function play() {
        if (currentStepIndex >= steps.length - 1) {
            currentStepIndex = 0;
        }
        isPlaying = true;
        if (playBtn) playBtn.innerText = '⏸';
        timer = setInterval(() => {
            if (currentStepIndex < steps.length - 1) {
                currentStepIndex++;
                applyStep(currentStepIndex);
            } else {
                pause();
            }
        }, parseInt(speedSelect.value));
    }

    function pause() {
        isPlaying = false;
        if (playBtn) playBtn.innerText = '▶';
        clearInterval(timer);
    }

    // Event Listeners
    if (playBtn) playBtn.addEventListener('click', () => isPlaying ? pause() : play());

    if (prevBtn) prevBtn.addEventListener('click', () => {
        pause();
        if (currentStepIndex > 0) applyStep(--currentStepIndex);
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        pause();
        if (currentStepIndex < steps.length - 1) applyStep(++currentStepIndex);
    });

    if (progressBar) progressBar.addEventListener('input', (e) => {
        pause();
        applyStep(parseInt(e.target.value));
    });

    if (speedSelect) speedSelect.addEventListener('change', () => {
        if (isPlaying) {
            pause();
            play();
        }
    });

    if (randomizeBtn) randomizeBtn.addEventListener('click', () => {
        pause();
        // Generate new sorted array and target
        const size = 10;
        const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 25) + 1);
        newArr.sort((a, b) => a - b);
        array = [...new Set(newArr)]; // Unique values

        // Select valid target or random
        const randIndex1 = Math.floor(Math.random() * (array.length / 2));
        const randIndex2 = Math.floor(Math.random() * (array.length / 2)) + Math.floor(array.length / 2);
        target = array[randIndex1] + array[randIndex2];

        renderChart();
        buildSteps();
        applyStep(0);
    });

    // Init
    renderChart();
    buildSteps();
    applyStep(0);
})();
