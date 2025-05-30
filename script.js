document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    console.log("Dark mode toggle initialized");

    // Check if dark mode is already enabled in localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.checked = true;
        console.log("Dark mode is enabled");
    }

    // Toggle dark mode on checkbox change
    darkModeToggle.addEventListener("change", () => {
        if (darkModeToggle.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
            console.log("Dark mode enabled");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
            console.log("Dark mode disabled");
        }
    });
});

// Animate skill bars when scrolled into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        const isVisible = bar.getBoundingClientRect().top < window.innerHeight;
        
        if(isVisible) {
            bar.style.width = percent;
        }
    });
}
// Toggle navigation menu for small screens
const settingsIcon = document.getElementById('settingsIcon');
const navLinks = document.getElementById('navLinks');

// Show/hide navigation menu when settings icon is clicked
settingsIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Auto-hide navigation menu after clicking a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
// Trigger slide-in animations on page load
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '1';
    });
});
// Show social media icons only when scrolling
const socialMedia = document.querySelector('.social-media');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        // Show icons when scrolling down
        socialMedia.classList.add('visible');
    } else {
        // Hide icons when scrolling up or at the top
        socialMedia.classList.remove('visible');
    }

    lastScrollY = currentScrollY; // Update the last scroll position
});
// Run on initial load and scroll
window.addEventListener('load', animateSkillBars);
window.addEventListener('scroll', animateSkillBars);
