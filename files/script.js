// Initialize the Typed.js effect for text animation
var typed = new Typed(".text", {
    strings: ["Software Engineering", "Web Development", "Full-Stack Development", "Cloud Computing", "AI & Machine Learning", "Linux", "QA"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Scroll-to-top button functionality
const toTop = document.querySelector(".top");

// Adding an event listener for scroll events
window.addEventListener("scroll", () => {
    // Check if the scroll position is beyond 100px, if so show the button
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");  // Adds 'active' class to make button visible
    } else {
        toTop.classList.remove("active");  // Removes 'active' class to hide the button
    }
});

// Scroll functionality to smooth scroll to the top when the button is clicked
toTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"  // Smooth scroll to the top of the page
    });
});
