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
            
            // Dispatch custom event for section change
            document.dispatchEvent(new CustomEvent('sectionChanged', {
                detail: { sectionId: sectionId }
            }));
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

// Cognizant Learning Course Functionality
function initializeCognizantCourses() {
    // Add event listeners to all "Start Course" buttons
    const courseButtons = document.querySelectorAll('.start-course-btn');
    
    courseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the course name from the table row
            const row = this.closest('tr');
            const courseName = row.querySelector('td:first-child strong').textContent;
            
            // Show confirmation modal/alert
            const confirmStart = confirm(`Ready to start the course: "${courseName}"?\n\nYou will be redirected to the Cognizant Learning Platform.`);
            
            if (confirmStart) {
                // Add loading state to button
                this.textContent = 'Redirecting...';
                this.disabled = true;
                
                // Redirect to Cognizant Learning Platform after short delay
                setTimeout(() => {
                    window.open('https://cognizantlearning.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FCOGNIZANTLEARNING.sumtotal.host%2Flearning%2Fcore%2Factivitydetails%2FViewActivityDetails%3FUserMode%3D0%26ActivityId%3D1570787%26ClassUnderStruct%3DFalse%26CallerUrl%3D%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D0%26SearchCallerURL%3Dhttps%253A%252F%252FCOGNIZANTLEARNING.sumtotal.host%252Fcore%252FsearchRedirect%253FViewType%253DList%2526SearchText%253D%252528if4%252529%25252520insurance%25252520claims%25252520handling%25252520process%2526startRow%253D0%26SearchCallerID%3D2', '_blank');
                    
                    // Reset button after redirect
                    setTimeout(() => {
                        this.textContent = 'Start Course';
                        this.disabled = false;
                    }, 1000);
                }, 500);
            }
        });
    });
    
    // Add event listener to the main platform link
    const platformLink = document.querySelector('.platform-link');
    if (platformLink) {
        platformLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            this.style.opacity = '0.8';
            
            setTimeout(() => {
                window.open(this.href, '_blank');
                this.style.transform = 'scale(1)';
                this.style.opacity = '1';
            }, 150);
        });
    }
}

// Table interaction enhancements
function enhanceTableInteractions() {
    const tableRows = document.querySelectorAll('.courses-table tbody tr');
    
    tableRows.forEach(row => {
        // Add hover effects and click functionality
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f8ff';
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'translateX(0)';
        });
        
        // Optional: Make entire row clickable to start course
        row.addEventListener('click', function(e) {
            // Only trigger if not clicking on the button directly
            if (!e.target.classList.contains('start-course-btn')) {
                const button = this.querySelector('.start-course-btn');
                if (button) {
                    button.click();
                }
            }
        });
    });
}

// Training functionality for Domain Trainings section
function startTraining(trainingId) {
    const button = event.target;
    const originalText = button.textContent;
    
    // Disable button and show loading state
    button.disabled = true;
    button.textContent = 'Loading...';
    
    // Show confirmation dialog
    const confirmStart = confirm(`Are you ready to start this training course? You will be redirected to the Cognizant Learning Platform.`);
    
    if (confirmStart) {
        // Simulate loading and redirect to Cognizant Learning Platform
        setTimeout(() => {
            // Open Cognizant Learning Platform in new tab
            window.open('https://cognizantlearning.sumtotal.host/core/pillarRedirect?relyingParty=LM&url=https%3A%2F%2Fcognizantlearning.sumtotal.host%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D43', '_blank');
            
            // Reset button after redirect
            setTimeout(() => {
                button.disabled = false;
                button.textContent = originalText;
            }, 1000);
        }, 500);
    } else {
        // Reset button if user cancels
        button.disabled = false;
        button.textContent = originalText;
    }
}

// Initialize training functionality when DOM is loaded
function initializeTrainingCourses() {
    // Add event listeners to training buttons if they exist
    const trainingButtons = document.querySelectorAll('.start-training-btn');
    trainingButtons.forEach(button => {
        // Remove any existing event listeners
        button.removeEventListener('click', handleTrainingClick);
        // Add new event listener
        button.addEventListener('click', handleTrainingClick);
    });
}

function handleTrainingClick(event) {
    const button = event.target;
    const row = button.closest('tr');
    const courseName = row.querySelector('td:first-child').textContent;
    
    const originalText = button.textContent;
    
    // Disable button and show loading state
    button.disabled = true;
    button.textContent = 'Loading...';
    
    // Show confirmation dialog with course name
    const confirmStart = confirm(`Are you ready to start the "${courseName}" training course? You will be redirected to the Cognizant Learning Platform.`);
    
    if (confirmStart) {
        // Simulate loading and redirect to Cognizant Learning Platform
        setTimeout(() => {
            // Open Cognizant Learning Platform in new tab
            window.open('https://cognizantlearning.sumtotal.host/core/pillarRedirect?relyingParty=LM&url=https%3A%2F%2Fcognizantlearning.sumtotal.host%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D43', '_blank');
            
            // Reset button after redirect
            setTimeout(() => {
                button.disabled = false;
                button.textContent = originalText;
            }, 1000);
        }, 500);
    } else {
        // Reset button if user cancels
        button.disabled = false;
        button.textContent = originalText;
    }
}

// Initialize course functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for SPA navigation to be ready
    setTimeout(() => {
        initializeCognizantCourses();
        initializeTrainingCourses();
        enhanceTableInteractions();
    }, 100);
});

// Also initialize when navigating to sections
document.addEventListener('sectionChanged', (e) => {
    if (e.detail.sectionId === 'assessments') {
        setTimeout(() => {
            initializeCognizantCourses();
            enhanceTableInteractions();
        }, 100);
    } else if (e.detail.sectionId === 'trainings') {
        setTimeout(() => {
            initializeTrainingCourses();
            enhanceTableInteractions();
        }, 100);
    }
});
