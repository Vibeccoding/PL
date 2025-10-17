// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Enhanced Smooth scrolling for navigation links with proper offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav link immediately
            updateActiveNavLink(targetId);
        }
    });
});

// Enhanced scroll spy for navigation with proper section detection
function updateActiveNavLink(activeId = null) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.navbar').offsetHeight;
    
    let current = activeId;
    
    if (!current) {
        // Find the current section based on scroll position
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                current = section.getAttribute('id');
                break;
            }
        }
        
        // If we're at the top, highlight the first section
        if (window.pageYOffset < 100) {
            current = 'about';
        }
    }
    
    // Update nav link active states
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Navbar background change on scroll and active link updating
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
            
            // Update active navigation link
            updateActiveNavLink();
            isScrolling = false;
        });
    }
    isScrolling = true;
});

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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.business-unit, .value-item, .award, .program-card, .timeline-item, .training-domain, .process-step, .assessment-item'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

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

// Trigger progress animation when section is visible
const progressSection = document.querySelector('.assessment-progress');
if (progressSection) {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgress();
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    progressObserver.observe(progressSection);
}

// Assessment Button Interactions
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

// Stats Counter Animation
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
            // Handle numbers without + suffix
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

// Trigger stats animation when hero section is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 500);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statsObserver.observe(heroSection);
}

// Timeline Animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Trigger timeline animation
const timelineSection = document.querySelector('.timeline-section');
if (timelineSection) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineObserver.observe(timelineSection);
}

// Add hover effects to cards
document.querySelectorAll('.business-unit, .training-domain, .program-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Search functionality for assessments (basic implementation)
function createSearchBar() {
    const assessmentsSection = document.querySelector('.assessments-section .container');
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        text-align: center;
        margin-bottom: 2rem;
    `;
    
    searchContainer.innerHTML = `
        <input type="text" id="assessment-search" placeholder="Search assessments..." 
               style="padding: 1rem; border: 2px solid #e0e0e0; border-radius: 50px; width: 300px; font-size: 1rem;">
    `;
    
    assessmentsSection.insertBefore(searchContainer, assessmentsSection.children[1]);
    
    // Search functionality
    document.getElementById('assessment-search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const assessmentItems = document.querySelectorAll('.assessment-item');
        
        assessmentItems.forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Initialize search bar when DOM is loaded
document.addEventListener('DOMContentLoaded', createSearchBar);

// Add loading screen
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #f8fafe 0%, #e8f4fd 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        flex-direction: column;
    `;
    
    loadingScreen.innerHTML = `
        <div style="width: 80px; height: 80px; border: 4px solid #e0e0e0; border-top: 4px solid #0066cc; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem;"></div>
        <p style="color: #0066cc; font-size: 1.2rem; font-weight: 500;">Loading Pacific Life...</p>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(loadingScreen);
            }, 500);
        }, 1000);
    });
}

// Show loading screen immediately
showLoadingScreen();

// Enhanced scroll spy for navigation
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add particle background to hero section
function createParticleBackground() {
    const hero = document.querySelector('.hero');
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.1;
    `;
    
    hero.style.position = 'relative';
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = hero.clientWidth;
    canvas.height = hero.clientHeight;
    
    const particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = '#0066cc';
            ctx.strokeStyle = '#0066cc';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    function init() {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#0066cc';
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = hero.clientWidth;
        canvas.height = hero.clientHeight;
    });
}

// Initialize particle background after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createParticleBackground, 1000);
});

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    updateActiveNavLink();
    
    // Add scroll event listener for better performance
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateActiveNavLink);
            ticking = true;
            setTimeout(() => { ticking = false; }, 100);
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
});

console.log('Pacific Life website loaded successfully!');
