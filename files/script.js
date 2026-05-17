// ===== TYPED.JS =====
var typed = new Typed(".text", {
    strings: ["Software Engineering", "Full-Stack Development", "Cloud Computing", "AI & Machine Learning", "DevOps Automation", "QA Engineering"],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1800,
    loop: true
});

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = (scrollTop / scrollHeight * 100) + "%";
}, { passive: true });

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById("cursor-glow");
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let glowX = mouseX, glowY = mouseY;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}, { passive: true });

(function animateCursor() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + "px";
    cursorGlow.style.top  = glowY + "px";
    requestAnimationFrame(animateCursor);
})();

// ===== HERO PARTICLE CANVAS =====
(function initParticles() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [];

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const COUNT = 60;
    const CONNECT_DIST = 130;
    const ACCENT = "242,168,95";

    for (let i = 0; i < COUNT; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.5 + 0.5
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < COUNT; i++) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${ACCENT},0.5)`;
            ctx.fill();

            for (let j = i + 1; j < COUNT; j++) {
                const q = particles[j];
                const dx = p.x - q.x, dy = p.y - q.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(${ACCENT},${(1 - dist / CONNECT_DIST) * 0.25})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// ===== SCROLL TO TOP =====
const toTop = document.querySelector(".top");
window.addEventListener("scroll", () => {
    toTop.classList.toggle("active", window.pageYOffset > 200);
}, { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("myLinks");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navbar.classList.toggle("nav-open");
});
navbar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navbar.classList.remove("nav-open");
    });
});
document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("open");
        navbar.classList.remove("nav-open");
    }
});

// ===== ACTIVE NAV ON SCROLL =====
const sections  = document.querySelectorAll("section, .about, .home");
const navLinks  = document.querySelectorAll(".navbar a");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(s => {
        const id = s.getAttribute("id");
        if (id && window.pageYOffset >= s.offsetTop - 120) {
            current = id;
        }
    });
    
    // Force 'Contact' active if we've reached the absolute bottom of the page
    if (window.innerHeight + Math.ceil(window.pageYOffset) >= document.documentElement.scrollHeight - 5) {
        current = "Contact";
    }
    
    navLinks.forEach(l => {
        l.classList.remove("active");
        if (l.getAttribute("href") === "#" + current) l.classList.add("active");
    });
}, { passive: true });

// ===== STATS COUNTER =====
function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1800;
    const start = performance.now();
    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    }
    requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll(".stat-num").forEach(animateCounter);
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector(".hero-stats");
if (heroStats) statsObserver.observe(heroStats);

// ===== 3D TILT ON CARDS =====
function addTilt(selector, intensity = 12) {
    document.querySelectorAll(selector).forEach(card => {
        // Add shine div
        const shine = document.createElement("div");
        shine.className = "card-shine";
        card.style.position = "relative";
        card.appendChild(shine);

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const cx   = rect.left + rect.width  / 2;
            const cy   = rect.top  + rect.height / 2;
            const dx   = (e.clientX - cx) / (rect.width  / 2);
            const dy   = (e.clientY - cy) / (rect.height / 2);
            const rotX = -dy * intensity;
            const rotY =  dx * intensity;
            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
            // Move shine to cursor
            const sx = ((e.clientX - rect.left) / rect.width)  * 100;
            const sy = ((e.clientY - rect.top)  / rect.height) * 100;
            shine.style.background = `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.1) 0%, transparent 60%)`;
            shine.style.opacity = "1";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            shine.style.opacity  = "0";
        });
    });
}

addTilt(".project-card", 10);
addTilt(".prj-list div", 8);

// ===== MAGNETIC SOCIAL BUTTONS =====
document.querySelectorAll(".social-btn").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width  / 2);
        const dy = e.clientY - (rect.top  + rect.height / 2);
        btn.style.transform = `translate(${dx * 0.35}px, ${dy * 0.35}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
    });
});

// ===== TIMELINE LEFT BORDER REVEAL =====
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll(".timeline-content").forEach(el => timelineObserver.observe(el));

// ===== GSAP SCROLL ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

function makeScrollAnim(elements, fromVars, toVars, staggerDelay = 0) {
    const targets = typeof elements === 'string' ? gsap.utils.toArray(elements) : elements;
    if (!targets || !targets.length) return;
    targets.forEach((el, i) => {
        gsap.fromTo(el, fromVars, {
            ...toVars,
            delay: staggerDelay * i,
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none", once: true }
        });
    });
}

// Section titles
makeScrollAnim(".gsap-fade-up", { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" });

// About slide
makeScrollAnim(".gsap-slide-left",  { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" });
makeScrollAnim(".gsap-slide-right", { opacity: 0, x:  80 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" });

// Tech groups stagger
makeScrollAnim(".tech-group.gsap-fade-up", { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" }, 0.06);

// Badge micro-stagger
gsap.utils.toArray(".tech-group").forEach(group => {
    const badges = group.querySelectorAll(".badge-group img");
    if (!badges.length) return;
    gsap.fromTo(badges,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.035,
          scrollTrigger: { trigger: group, start: "top 88%", toggleActions: "play none none none", once: true } }
    );
});

// Timeline items
makeScrollAnim(".gsap-timeline-item", { opacity: 0, y: 55, x: -15 }, { opacity: 1, y: 0, x: 0, duration: 0.9, ease: "power3.out" }, 0.13);

// Cards
gsap.utils.toArray(".gsap-card").forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, y: 38, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none", once: true } }
    );
});

// Contact
makeScrollAnim(".contacts.gsap-fade-up", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" });

// Rotating gradient angle on tech groups
gsap.utils.toArray(".tech-group").forEach((group, i) => {
    gsap.to(group, {
        "--grad-angle": "495deg",
        duration: 6 + i * 0.5,
        repeat: -1,
        ease: "none"
    });
});

window.addEventListener("load", () => ScrollTrigger.refresh());
