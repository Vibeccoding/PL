// Single Page Application Navigation
class SPANavigation {
    constructor() {
        this.currentSection = 'hero';
        this.sections = document.querySelectorAll('section[id], .hero');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showSection('hero');
        this.updateActiveNavLink('hero');
    }

    setupEventListeners() {
        // Navigation link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.showSection(targetId);
                this.updateActiveNavLink(targetId);
                this.closeMobileMenu();
            });
        });

        // Mobile navigation toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Logo click - go to hero
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.addEventListener('click', () => {
                this.showSection('hero');
                this.updateActiveNavLink('hero');
                this.closeMobileMenu();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                this.nextSection();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                this.prevSection();
            }
        });
    }

    showSection(sectionId) {
        // Hide all sections
        this.sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId) || document.querySelector('.hero');
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }
    }

    updateActiveNavLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    nextSection() {
        const sectionIds = ['hero', 'about', 'business-units', 'bootcamp', 'timeline', 'architecture', 'trainings', 'processes', 'assessments'];
        const currentIndex = sectionIds.indexOf(this.currentSection);
        const nextIndex = (currentIndex + 1) % sectionIds.length;
        
        this.showSection(sectionIds[nextIndex]);
        this.updateActiveNavLink(sectionIds[nextIndex]);
    }

    prevSection() {
        const sectionIds = ['hero', 'about', 'business-units', 'bootcamp', 'timeline', 'architecture', 'trainings', 'processes', 'assessments'];
        const currentIndex = sectionIds.indexOf(this.currentSection);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : sectionIds.length - 1;
        
        this.showSection(sectionIds[prevIndex]);
        this.updateActiveNavLink(sectionIds[prevIndex]);
    }
}

// Initialize SPA Navigation
document.addEventListener('DOMContentLoaded', () => {
    new SPANavigation();
});

// Essential Functions for SPA

// Process Flow Tab Functionality
function showProcess(processType) {
    // Hide all process contents
    document.querySelectorAll('.process-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected process content
    document.getElementById(processType).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Assessment Progress Animation
function animateProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Assessment Button Interactions
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.take-assessment').forEach(button => {
        button.addEventListener('click', function() {
            const assessmentName = this.closest('.assessment-item').querySelector('h4').textContent;
            
            // Simulate assessment taking
            this.textContent = 'Starting...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'In Progress';
                this.style.background = '#f57c00';
            }, 1000);
            
            setTimeout(() => {
                this.textContent = 'Completed';
                this.style.background = '#2d7d32';
            }, 3000);
            
            setTimeout(() => {
                this.textContent = 'Take Assessment';
                this.style.background = '#0066cc';
                this.disabled = false;
            }, 5000);
            
            // Show a simple alert (in a real app, this would open the assessment)
            setTimeout(() => {
                alert(`Starting assessment: ${assessmentName}\n\nThis would normally open the assessment interface.`);
            }, 1500);
        });
    });
});

// Stats Counter Animation for Hero Section
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const text = stat.textContent.trim();
        if (text.includes('+')) {
            const numberStr = text.replace('+', '');
            const number = parseInt(numberStr);
            if (!isNaN(number)) {
                animateNumber(stat, 0, number, '+');
            }
        } else {
            const number = parseInt(text);
            if (!isNaN(number)) {
                animateNumber(stat, 0, number, '');
            }
        }
    });
}

function animateNumber(element, start, end, suffix = '') {
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentNumber = Math.floor(start + (end - start) * progress);
        
        element.textContent = currentNumber + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Add enhanced functionality that works with SPA
document.addEventListener('DOMContentLoaded', () => {
    // Animate stats when hero section becomes active
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('hero') && target.classList.contains('active')) {
                    setTimeout(animateStats, 500);
                }
            }
        });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection, { attributes: true });
        // Also animate on initial load if hero is active
        if (heroSection.classList.contains('active')) {
            setTimeout(animateStats, 1000);
        }
    }
});

console.log('Pacific Life SPA loaded successfully!');
