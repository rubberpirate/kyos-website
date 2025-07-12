// KyOS Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initInstallerShowcase();
    initDesktopGallery();
    initScrollAnimations();
    initTerminalAnimation();
    initParallaxEffects();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Installer Showcase Mode Switching
function initInstallerShowcase() {
    const modeCards = document.querySelectorAll('.mode-card');
    const demoScreens = document.querySelectorAll('.demo-screen');
    
    modeCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            
            // Remove active class from all cards
            modeCards.forEach(c => c.classList.remove('active'));
            
            // Remove active class from all demo screens
            demoScreens.forEach(screen => screen.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Show corresponding demo screen
            const targetDemo = document.getElementById(`demo-${mode}`);
            if (targetDemo) {
                targetDemo.classList.add('active');
            }
        });
    });
}

// Desktop Gallery
function initDesktopGallery() {
    const galleryBtns = document.querySelectorAll('.gallery-btn');
    const screenshots = document.querySelectorAll('.screenshot');
    
    galleryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const screenshotType = this.getAttribute('data-screenshot');
            
            // Remove active class from all buttons
            galleryBtns.forEach(b => b.classList.remove('active'));
            
            // Remove active class from all screenshots
            screenshots.forEach(screenshot => screenshot.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding screenshot
            const targetScreenshot = document.getElementById(`screenshot-${screenshotType}`);
            if (targetScreenshot) {
                targetScreenshot.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .download-card, .desktop-feature, .doc-category'
    );
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Terminal Animation
function initTerminalAnimation() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    const cursor = document.querySelector('.cursor');
    
    if (terminalLines.length > 0 && cursor) {
        // Initially hide all lines except the first
        terminalLines.forEach((line, index) => {
            if (index > 0) {
                line.style.opacity = '0';
                line.style.transform = 'translateX(-20px)';
            }
        });
        
        // Animate lines appearing one by one
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
                
                // Type effect for command line
                if (index === 0) {
                    typeCommand(line.querySelector('.command'));
                }
            }, index * 800);
        });
    }
}

// Type effect for terminal command
function typeCommand(element) {
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid #00ff00';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        
        if (i === text.length) {
            clearInterval(typeInterval);
            element.style.borderRight = 'none';
        }
    }, 100);
}

// Parallax Effects
function initParallaxEffects() {
    const heroAnimation = document.querySelector('.hero-bg-animation');
    
    if (heroAnimation) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            heroAnimation.style.transform = `translateY(${parallax}px)`;
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
});

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .feature-card,
    .download-card,
    .desktop-feature,
    .doc-category {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animate-in,
    .download-card.animate-in,
    .desktop-feature.animate-in,
    .doc-category.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card.animate-in {
        transition-delay: 0.1s;
    }
    
    .feature-card:nth-child(2).animate-in {
        transition-delay: 0.2s;
    }
    
    .feature-card:nth-child(3).animate-in {
        transition-delay: 0.3s;
    }
    
    .feature-card:nth-child(4).animate-in {
        transition-delay: 0.4s;
    }
    
    .feature-card:nth-child(5).animate-in {
        transition-delay: 0.5s;
    }
    
    .feature-card:nth-child(6).animate-in {
        transition-delay: 0.6s;
    }
`;
document.head.appendChild(style);

// Download button interactions
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtns = document.querySelectorAll('.btn-primary[href="#"]');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a temporary notification
            const notification = document.createElement('div');
            notification.innerHTML = `
                <div style="position: fixed; top: 20px; right: 20px; background: var(--primary-color); color: var(--bg-primary); padding: 1rem 2rem; border-radius: 8px; z-index: 10000; font-weight: 600; box-shadow: 0 4px 12px rgba(0, 255, 0, 0.3);">
                    <i class="fas fa-info-circle" style="margin-right: 0.5rem;"></i>
                    Download links will be available in the next release!
                </div>
            `;
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    });
});

// Feature card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div id="loader" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-primary); display: flex; align-items: center; justify-content: center; z-index: 10000; transition: opacity 0.5s ease;">
            <div style="text-align: center;">
                <div style="width: 60px; height: 60px; border: 3px solid var(--border-color); border-top: 3px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
                <div style="color: var(--primary-color); font-weight: 600; font-size: 1.2rem;">Loading KyOS...</div>
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after a short delay
    setTimeout(() => {
        const loaderElement = document.getElementById('loader');
        if (loaderElement) {
            loaderElement.style.opacity = '0';
            setTimeout(() => {
                loaderElement.remove();
            }, 500);
        }
    }, 1000);
});

// Enhanced scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: var(--bg-primary);
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 255, 0, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(100px)';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(0) scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(0, 255, 0, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(0, 255, 0, 0.3)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTop);
