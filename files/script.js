// ===== TYPED.JS =====
var typed = new Typed(".text", {
    strings: ["Software Engineering", "Full-Stack Development", "Cloud Computing", "AI & Machine Learning", "DevOps Automation", "QA Engineering"],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1800,
    loop: true
});

// ===== SCROLL TO TOP =====
const toTop = document.querySelector(".top");
window.addEventListener("scroll", () => {
    toTop.classList.toggle("active", window.pageYOffset > 200);
});
toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

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

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section, .about, .home");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id") || "";
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ===== GSAP SCROLL ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Use GSAP to set initial states (not CSS) so content is never invisible without GSAP
function makeScrollAnim(elements, fromVars, toVars, staggerDelay = 0) {
    if (!elements || (elements.length !== undefined && elements.length === 0)) return;
    const targets = typeof elements === 'string' ? gsap.utils.toArray(elements) : elements;
    if (!targets || targets.length === 0) return;

    targets.forEach((el, i) => {
        gsap.fromTo(el, fromVars, {
            ...toVars,
            delay: staggerDelay * i,
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
                once: true
            }
        });
    });
}

// Section titles fade up
makeScrollAnim(".gsap-fade-up", 
    { opacity: 0, y: 45 }, 
    { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
);

// About image slide left
makeScrollAnim(".gsap-slide-left",
    { opacity: 0, x: -80 },
    { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
);

// About text slide right
makeScrollAnim(".gsap-slide-right",
    { opacity: 0, x: 80 },
    { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
);

// Tech groups stagger
makeScrollAnim(".tech-group.gsap-fade-up",
    { opacity: 0, y: 36 },
    { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" },
    0.06
);

// Badge micro-stagger inside each group
gsap.utils.toArray(".tech-group").forEach(group => {
    const badges = group.querySelectorAll(".badge-group img");
    if (!badges.length) return;
    gsap.fromTo(badges,
        { opacity: 0, y: 10 },
        {
            opacity: 1, y: 0,
            duration: 0.35,
            ease: "power2.out",
            stagger: 0.035,
            scrollTrigger: {
                trigger: group,
                start: "top 88%",
                toggleActions: "play none none none",
                once: true
            }
        }
    );
});

// Timeline items
makeScrollAnim(".gsap-timeline-item",
    { opacity: 0, y: 55, x: -15 },
    { opacity: 1, y: 0, x: 0, duration: 0.9, ease: "power3.out" },
    0.13
);

// Project & service cards stagger
gsap.utils.toArray(".gsap-card").forEach((el) => {
    gsap.fromTo(el,
        { opacity: 0, y: 38, scale: 0.97 },
        {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 92%",
                toggleActions: "play none none none",
                once: true
            }
        }
    );
});

// Contact section
makeScrollAnim(".contacts.gsap-fade-up",
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
);

// Refresh ScrollTrigger after page settles
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});
