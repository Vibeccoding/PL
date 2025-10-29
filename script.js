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

        // Footer navigation links
        const footerLinks = document.querySelectorAll('.footer-section a[href^="#"]');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                if (targetId) { // Only proceed if there's actually a target
                    this.showSection(targetId);
                    this.updateActiveNavLink(targetId);
                    // Scroll to top after navigation
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
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
        const sectionIds = ['hero', 'about', 'goals', 'business-units', 'bootcamp', 'timeline', 'architecture', 'trainings', 'processes', 'assessments', 'support'];
        const currentIndex = sectionIds.indexOf(this.currentSection);
        const nextIndex = (currentIndex + 1) % sectionIds.length;
        
        this.showSection(sectionIds[nextIndex]);
        this.updateActiveNavLink(sectionIds[nextIndex]);
    }

    prevSection() {
        const sectionIds = ['hero', 'about', 'goals', 'business-units', 'bootcamp', 'timeline', 'architecture', 'trainings', 'processes', 'assessments', 'support'];
        const currentIndex = sectionIds.indexOf(this.currentSection);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : sectionIds.length - 1;
        
        this.showSection(sectionIds[prevIndex]);
        this.updateActiveNavLink(sectionIds[prevIndex]);
    }
}

// Single consolidated DOM initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize SPA Navigation first
    new SPANavigation();
    
    // Initialize all other components after a brief delay
    setTimeout(() => {
        initializeCognizantCourses();
        initializeTrainingButtons();
        enhanceTableInteractions();
        initializeContactForm();
        initializeAssessmentButtons();
        initializeHeroAnimations();
    }, 100);
});

// Assessment button initialization function
function initializeAssessmentButtons() {
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
}

// Hero animations initialization function
function initializeHeroAnimations() {
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
}

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

// Assessment button handlers will be initialized in main DOM ready

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

// Hero animations will be initialized in main DOM ready
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
            
            // Define specific course URLs for assessments
            const assessmentUrls = {
                'Digital Transformation Fundamentals': 'https://cognizantlearning.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FCOGNIZANTLEARNING.sumtotal.host%2Flearning%2Fcore%2Factivitydetails%2FViewActivityDetails%3FUserMode%3D0%26ActivityId%3D1952495%26ClassUnderStruct%3DFalse%26CallerUrl%3D%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D0%26SearchCallerURL%3Dhttps%253A%252F%252FCOGNIZANTLEARNING.sumtotal.host%252Fcore%252FsearchRedirect%253FViewType%253DList%2526SearchText%253DDigital%25252520Transformation%25252520Fundamentals%2526startRow%253D0%26SearchCallerID%3D2',
                'Cloud-First Architecture': 'https://cognizantlearning.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FCOGNIZANTLEARNING.sumtotal.host%2Flearning%2Fcore%2Factivitydetails%2FViewActivityDetails%3FUserMode%3D0%26ActivityId%3D409083%26ClassUnderStruct%3DFalse%26CallerUrl%3D%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D0%26SearchCallerURL%3Dhttps%253A%252F%252FCOGNIZANTLEARNING.sumtotal.host%252Fcore%252FsearchRedirect%253FViewType%253DList%2526SearchText%253DCloud%25252520first%25252520Architecture%2526startRow%253D0%26SearchCallerID%3D2',
                'Data Analytics & AI in Insurance': 'https://cognizantlearning.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FCOGNIZANTLEARNING.sumtotal.host%2Flearning%2Fcore%2Factivitydetails%2FViewActivityDetails%3FUserMode%3D0%26ActivityId%3D2030656%26ClassUnderStruct%3DFalse%26CallerUrl%3D%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D0%26SearchCallerURL%3Dhttps%253A%252F%252FCOGNIZANTLEARNING.sumtotal.host%252Fcore%252FsearchRedirect%253FViewType%253DList%2526SearchText%253DData%25252520Anayltics%25252520%25252526%25252520AI%25252520insurance%2526startRow%253D0%26SearchCallerID%3D2',
                'Agile Delivery Excellence': 'https://cognizantlearning.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FCOGNIZANTLEARNING.sumtotal.host%2Flearning%2Fcore%2Factivitydetails%2FViewActivityDetails%3FUserMode%3D0%26ActivityId%3D855995%26ClassUnderStruct%3DFalse%26CallerUrl%3D%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D0%26SearchCallerURL%3Dhttps%253A%252F%252FCOGNIZANTLEARNING.sumtotal.host%252Fcore%252FsearchRedirect%253FViewType%253DList%2526SearchText%253DAgile%25252520Delivery%25252520excellence%2526startRow%253D0%26SearchCallerID%3D2',
                'Customer Experience Innovation': 'https://cognizantlearning.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FCOGNIZANTLEARNING.sumtotal.host%2Flearning%2Fcore%2Factivitydetails%2FViewActivityDetails%3FUserMode%3D0%26ActivityId%3D431177%26ClassUnderStruct%3DFalse%26CallerUrl%3D%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D0%26SearchCallerURL%3Dhttps%253A%252F%252FCOGNIZANTLEARNING.sumtotal.host%252Fcore%252FsearchRedirect%253FViewType%253DList%2526SearchText%253DCustomer%25252520experience%25252520innovation%2526startRow%253D0%26SearchCallerID%3D2'
            };
            
            // Get the specific course URL or use default
            const courseUrl = assessmentUrls[courseName] || 'https://cognizantlearning.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FCOGNIZANTLEARNING.sumtotal.host%2Flearning%2Fcore%2Factivitydetails%2FViewActivityDetails%3FUserMode%3D0%26ActivityId%3D1570787%26ClassUnderStruct%3DFalse%26CallerUrl%3D%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D0%26SearchCallerURL%3Dhttps%253A%252F%252FCOGNIZANTLEARNING.sumtotal.host%252Fcore%252FsearchRedirect%253FViewType%253DList%2526SearchText%253D%252528if4%252529%25252520insurance%25252520claims%25252520handling%25252520process%2526startRow%253D0%26SearchCallerID%3D2';
            
            // Show confirmation modal/alert
            const confirmStart = confirm(`Ready to start the course: "${courseName}"?\n\nYou will be redirected to the Cognizant Learning Platform.`);
            
            if (confirmStart) {
                // Add loading state to button
                this.textContent = 'Redirecting...';
                this.disabled = true;
                
                // Redirect to specific course URL after short delay
                setTimeout(() => {
                    window.open(courseUrl, '_blank');
                    
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

// Consolidated training button functionality
function initializeTrainingButtons() {
    // Add a flag to prevent multiple initializations
    if (window.trainingButtonsInitialized) {
        return;
    }
    
    // Clear all existing event listeners first by cloning buttons
    const trainingButtons = document.querySelectorAll('.start-training-btn');
    
    trainingButtons.forEach(button => {
        // Remove any existing data attributes and event listeners
        button.removeAttribute('data-processing');
        // Clone the button to remove all event listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });
    
    // Get the new buttons and add a single event listener
    const newTrainingButtons = document.querySelectorAll('.start-training-btn');
    newTrainingButtons.forEach(button => {
        // Add a flag to track if button is being processed
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Prevent double-clicks
            if (this.dataset.processing === 'true') {
                return;
            }
            
            const courseKey = this.getAttribute('data-course');
            if (courseKey) {
                this.dataset.processing = 'true';
                handleSingleTrainingCourse(courseKey, this);
            }
        }, { once: false }); // Explicitly set once to false
    });
    
    // Mark as initialized
    window.trainingButtonsInitialized = true;
    console.log('Training buttons initialized successfully');
}

// Single, clean training course handler
function handleSingleTrainingCourse(courseKey, button) {
    // Map course keys to URLs and names
    const courseData = {
        'life-insurance': {
            name: 'Life Insurance Fundamentals',
            url: 'https://cognizantlearning.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FCOGNIZANTLEARNING.sumtotal.host%2Flearning%2Fcore%2Factivitydetails%2FViewActivityDetails%3FUserMode%3D0%26ActivityId%3D2198393%26ClassUnderStruct%3DFalse%26CallerUrl%3D%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D0%26SearchCallerURL%3Dhttps%253A%252F%252FCOGNIZANTLEARNING.sumtotal.host%252Fcore%252FsearchRedirect%253FViewType%253DList%2526SearchText%253DLife%25252520Insurance%25252520Fundamentals%2526startRow%253D0%26SearchCallerID%3D2'
        },
        'annuity-products': {
            name: 'Annuity Products & Solutions',
            url: 'https://cognizantlearning.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FCOGNIZANTLEARNING.sumtotal.host%2Flearning%2Fcore%2Factivitydetails%2FViewActivityDetails%3FUserMode%3D0%26ActivityId%3D2288431%26ClassUnderStruct%3DFalse%26CallerUrl%3D%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D0%26SearchCallerURL%3Dhttps%253A%252F%252FCOGNIZANTLEARNING.sumtotal.host%252Fcore%252FsearchRedirect%253FViewType%253DList%2526SearchText%253DAnnuity%25252520Products%25252520%25252526%25252520Solutions%2526startRow%253D0%26SearchCallerID%3D2'
        },
        'risk-assessment': {
            name: 'Risk Assessment & Underwriting',
            url: 'https://cognizantlearning.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FCOGNIZANTLEARNING.sumtotal.host%2Flearning%2Fcore%2Factivitydetails%2FViewActivityDetails%3FUserMode%3D0%26ActivityId%3D430359%26ClassUnderStruct%3DFalse%26CallerUrl%3D%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D0%26SearchCallerURL%3Dhttps%253A%252F%252FCOGNIZANTLEARNING.sumtotal.host%252Fcore%252FsearchRedirect%253FViewType%253DList%2526SearchText%253DRisk%25252520Assessment%25252520%25252526%25252520Underwriting%2526startRow%253D20%26SearchCallerID%3D2'
        },
        'financial-planning': {
            name: 'Financial Planning & Analysis',
            url: 'https://cognizantlearning.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FCOGNIZANTLEARNING.sumtotal.host%2Flearning%2Fcore%2Factivitydetails%2FViewActivityDetails%3FUserMode%3D0%26ActivityId%3D1646323%26ClassUnderStruct%3DFalse%26CallerUrl%3D%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D0%26SearchCallerURL%3Dhttps%253A%252F%252FCOGNIZANTLEARNING.sumtotal.host%252Fcore%252FsearchRedirect%253FViewType%253DList%2526SearchText%253DFinancial%25252520Planning%25252520%25252526%25252520Analysis%2526startRow%253D0%26SearchCallerID%3D2'
        },
        'investment-mgmt': {
            name: 'Investment Management',
            url: 'https://cognizantlearning.sumtotal.host/rcore/c/pillarRedirect?isDeepLink=1&relyingParty=LM&url=https%3A%2F%2FCOGNIZANTLEARNING.sumtotal.host%2Flearning%2Fcore%2Factivitydetails%2FViewActivityDetails%3FUserMode%3D0%26ActivityId%3D447981%26ClassUnderStruct%3DFalse%26CallerUrl%3D%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D0%26SearchCallerURL%3Dhttps%253A%252F%252FCOGNIZANTLEARNING.sumtotal.host%252Fcore%252FsearchRedirect%253FViewType%253DList%2526SearchText%253DInvestment%25252520Management%2526startRow%253D0%26SearchCallerID%3D2'
        },
        'data-analytics': {
            name: 'Data Analytics & Business Intelligence',
            url: 'https://cognizantlearning.sumtotal.host/core/pillarRedirect?relyingParty=LM&url=https%3A%2F%2Fcognizantlearning.sumtotal.host%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D43'
        },
        'digital-cx': {
            name: 'Digital Customer Experience',
            url: 'https://cognizantlearning.sumtotal.host/core/pillarRedirect?relyingParty=LM&url=https%3A%2F%2Fcognizantlearning.sumtotal.host%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D43'
        },
        'cybersecurity': {
            name: 'Cybersecurity Fundamentals',
            url: 'https://cognizantlearning.sumtotal.host/core/pillarRedirect?relyingParty=LM&url=https%3A%2F%2Fcognizantlearning.sumtotal.host%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D43'
        },
        'crm': {
            name: 'CRM Systems & Tools',
            url: 'https://cognizantlearning.sumtotal.host/core/pillarRedirect?relyingParty=LM&url=https%3A%2F%2Fcognizantlearning.sumtotal.host%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D43'
        },
        'claims-processing': {
            name: 'Claims Processing & Management',
            url: 'https://cognizantlearning.sumtotal.host/core/pillarRedirect?relyingParty=LM&url=https%3A%2F%2Fcognizantlearning.sumtotal.host%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D43'
        },
        'compliance': {
            name: 'Compliance & Regulatory Training',
            url: 'https://cognizantlearning.sumtotal.host/core/pillarRedirect?relyingParty=LM&url=https%3A%2F%2Fcognizantlearning.sumtotal.host%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D43'
        },
        'leadership': {
            name: 'Leadership Development',
            url: 'https://cognizantlearning.sumtotal.host/core/pillarRedirect?relyingParty=LM&url=https%3A%2F%2Fcognizantlearning.sumtotal.host%2Flearning%2Flearner%2FHome%2FGoToPortal%3Fkey%3D43'
        }
    };

    const course = courseData[courseKey];
    if (!course) {
        console.error('Course not found:', courseKey);
        button.dataset.processing = 'false';
        return;
    }

    const originalText = button.textContent;
    
    // Disable button and show loading state
    button.disabled = true;
    button.textContent = 'Loading...';
    
    // Show confirmation dialog
    const confirmStart = confirm(`Are you ready to start the "${course.name}" training course? You will be redirected to the Cognizant Learning Platform.`);
    
    if (confirmStart) {
        // Redirect to course URL
        setTimeout(() => {
            window.open(course.url, '_blank');
            
            // Reset button after redirect
            setTimeout(() => {
                button.disabled = false;
                button.textContent = originalText;
                button.dataset.processing = 'false';
            }, 1000);
        }, 500);
    } else {
        // Reset button if user cancels
        button.disabled = false;
        button.textContent = originalText;
        button.dataset.processing = 'false';
    }
}

// Training buttons will be initialized in main DOM ready

// Also initialize when navigating to sections
document.addEventListener('sectionChanged', (e) => {
    if (e.detail.sectionId === 'assessments') {
        setTimeout(() => {
            initializeCognizantCourses();
            enhanceTableInteractions();
        }, 100);
    } else if (e.detail.sectionId === 'trainings') {
        setTimeout(() => {
            initializeTrainingButtons(); // Only call this once
            enhanceTableInteractions();
        }, 100);
    }
});

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Show success message
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }, 3000);
            
            // In a real application, you would send the data to your server
            console.log('Form Data:', Object.fromEntries(formData));
            
        }, 1500); // Simulate network delay
    });

    // Form validation enhancements
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const isValid = field.checkValidity();
    
    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = '#e53e3e';
    } else {
        field.classList.remove('error');
        field.style.borderColor = '#e2e8f0';
    }
    
    return isValid;
}

// Contact form will be initialized in main DOM ready

// Also initialize when navigating to support section
document.addEventListener('sectionChanged', (e) => {
    if (e.detail.sectionId === 'support') {
        setTimeout(() => {
            initializeContactForm();
        }, 100);
    }
});
