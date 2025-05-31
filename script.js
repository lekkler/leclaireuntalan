document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode Toggle
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

    // Navigation Menu Toggle
    const settingsIcon = document.getElementById('settingsIcon');
    const navLinks = document.getElementById('navLinks');

    if (settingsIcon && navLinks) {
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
    }

    // Initialize reaction counts
    initializeReactions();
    
    // Set up reaction buttons
    document.querySelectorAll('.reaction-btn').forEach(button => {
        button.addEventListener('click', function() {
            const blogId = this.getAttribute('data-blog');
            const reactionType = this.getAttribute('data-reaction');
            
            // Check if user already reacted
            const userReactions = JSON.parse(localStorage.getItem(`blog_${blogId}_user_reactions`) || '{}');
            
            // If same reaction clicked, remove reaction
            if (userReactions[blogId] === reactionType) {
                removeReaction(blogId, reactionType);
                userReactions[blogId] = null;
                this.classList.remove('active');
            } 
            // If different reaction clicked, switch reactions
            else {
                // If previous reaction exists, decrement that count first
                if (userReactions[blogId]) {
                    decrementReactionCount(blogId, userReactions[blogId]);
                    document.querySelector(`.reaction-btn[data-blog="${blogId}"][data-reaction="${userReactions[blogId]}"]`).classList.remove('active');
                }
                
                // Add new reaction
                incrementReactionCount(blogId, reactionType);
                userReactions[blogId] = reactionType;
                this.classList.add('active');
            }
            
            // Save user's reaction
            localStorage.setItem(`blog_${blogId}_user_reactions`, JSON.stringify(userReactions));
        });
    });

    // Social media scroll behavior
    const socialMedia = document.querySelector('.social-media');
    let lastScrollY = window.scrollY;

    if (socialMedia) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                // Show icons when scrolling down
                socialMedia.classList.add('visible');
            } else {
                // Hide icons when scrolling up or at the top
                socialMedia.classList.remove('visible');
            }
            lastScrollY = currentScrollY;
        });
    }
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

// Reaction functions
function initializeReactions() {
    document.querySelectorAll('.reaction-btn').forEach(button => {
        const blogId = button.getAttribute('data-blog');
        const reactionType = button.getAttribute('data-reaction');
        
        // Load reaction counts
        const count = localStorage.getItem(`blog_${blogId}_${reactionType}_count`) || 0;
        const countElement = button.querySelector(`.${reactionType}-count`);
        if (countElement) {
            countElement.textContent = count;
        }
        
        // Check if user already reacted to this post
        const userReactions = JSON.parse(localStorage.getItem(`blog_${blogId}_user_reactions`) || '{}');
        if (userReactions[blogId] === reactionType) {
            button.classList.add('active');
        }
    });
}

function incrementReactionCount(blogId, reactionType) {
    const countElement = document.querySelector(`.${reactionType}-btn[data-blog="${blogId}"] .${reactionType}-count`);
    if (countElement) {
        let count = parseInt(localStorage.getItem(`blog_${blogId}_${reactionType}_count`) || 0);
        count++;
        countElement.textContent = count;
        localStorage.setItem(`blog_${blogId}_${reactionType}_count`, count);
    }
}

function decrementReactionCount(blogId, reactionType) {
    const countElement = document.querySelector(`.${reactionType}-btn[data-blog="${blogId}"] .${reactionType}-count`);
    if (countElement) {
        let count = parseInt(localStorage.getItem(`blog_${blogId}_${reactionType}_count`) || 0);
        if (count > 0) {
            count--;
            countElement.textContent = count;
            localStorage.setItem(`blog_${blogId}_${reactionType}_count`, count);
        }
    }
}

function removeReaction(blogId, reactionType) {
    decrementReactionCount(blogId, reactionType);
}

// Run on initial load and scroll
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '1';
    });
    
    animateSkillBars();
});

window.addEventListener('scroll', animateSkillBars);