/* ============================================
   MAIN JAVASCRIPT
   ============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // STICKY HEADER ON SCROLL
    // ============================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    
    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for valid section links
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Reveal when element is 20% into viewport
            if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check on page load
    revealOnScroll();
    
    // Check on scroll with throttle for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            revealOnScroll();
        });
    });
    
    
    // ============================================
    // SERVICE BOX MOBILE CLICK BEHAVIOR
    // ============================================
    const serviceBoxes = document.querySelectorAll('.service-box');
    
    // Check if device is mobile/tablet
    const isMobileDevice = () => {
        return window.innerWidth <= 768;
    };
    
    serviceBoxes.forEach(box => {
        box.addEventListener('click', (e) => {
            // Only handle click on mobile
            if (isMobileDevice()) {
                // Close other boxes
                serviceBoxes.forEach(otherBox => {
                    if (otherBox !== box) {
                        otherBox.classList.remove('active');
                    }
                });
                
                // Toggle current box
                box.classList.toggle('active');
            }
        });
    });
    
    // Remove active class when resizing to desktop
    window.addEventListener('resize', () => {
        if (!isMobileDevice()) {
            serviceBoxes.forEach(box => {
                box.classList.remove('active');
            });
        }
    });
    
    
    // ============================================
    // PAUSE LOGO ANIMATION ON HOVER (Enhanced)
    // ============================================
    const logoRows = document.querySelectorAll('.logo-row');
    
    logoRows.forEach(row => {
        const track = row.querySelector('.logo-track');
        
        row.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        row.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    });
    
    
    // ============================================
    // PAUSE TESTIMONIALS ON HOVER (Enhanced)
    // ============================================
    const testimonialsScroll = document.querySelector('.testimonials-scroll');
    const testimonialsTrack = document.querySelector('.testimonials-track');
    
    if (testimonialsScroll && testimonialsTrack) {
        testimonialsScroll.addEventListener('mouseenter', () => {
            testimonialsTrack.style.animationPlayState = 'paused';
        });
        
        testimonialsScroll.addEventListener('mouseleave', () => {
            testimonialsTrack.style.animationPlayState = 'running';
        });
    }
    
    
    // ============================================
    // DYNAMIC YEAR IN FOOTER (Optional Enhancement)
    // ============================================
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.innerHTML = `&copy; ${currentYear} IdeaClicks. All rights reserved.`;
    }
    
    
    // ============================================
    // HEADER LOGO CLICK TO SCROLL TO TOP
    // ============================================
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    
    // ============================================
    // ADD SUBTLE PARALLAX EFFECT TO HERO MEDIA
    // ============================================
    // const heroMedia = document.querySelector('.hero-media');
    
    // if (heroMedia) {
    //     window.addEventListener('scroll', () => {
    //         const scrolled = window.pageYOffset;
    //         const rate = scrolled * 0.3;
            
    //         if (scrolled < window.innerHeight) {
    //             heroMedia.style.transform = `translateY(${rate}px)`;
    //         }
    //     });
    // }
    
    
    // ============================================
    // BUTTON RIPPLE EFFECT (Optional Enhancement)
    // ============================================
    const buttons = document.querySelectorAll('.btn-primary, .btn-call, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles dynamically
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            // Ensure button has position relative
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to stylesheet dynamically
    if (!document.querySelector('#ripple-animation-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation-style';
        style.innerHTML = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    
    // ============================================
    // PERFORMANCE OPTIMIZATION: LAZY LOAD IMAGES
    // (Placeholder for when real images are added)
    // ============================================
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    };
    
    // Call when images are added
    // lazyLoadImages();
    
    
    // ============================================
    // CONSOLE MESSAGE (Optional - Can be removed)
    // ============================================
    
});


// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Throttle function to limit execution rate
 * Useful for scroll and resize events
 */
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

/**
 * Debounce function to delay execution
 * Useful for resize events
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element, offset = 0) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Get scroll percentage
 */
function getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
}


// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add keyboard navigation for service boxes
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('service-box')) {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Add focus visible styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus-visible style
const style = document.createElement('style');
style.innerHTML = `
    .keyboard-nav *:focus {
        outline: 2px solid #398FA1;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);


// ============================================
// EXPORT FOR POTENTIAL MODULE USE
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        isInViewport,
        smoothScrollTo,
        getScrollPercentage
    };
}


/* ============================================
   HORIZONTAL SCROLL SERVICES SECTION
   PINNED SCROLL FOR BOTH DESKTOP AND MOBILE
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    const servicesSection = document.querySelector('.services-section');
    const servicesTrack = document.querySelector('.services-horizontal-track');
    const servicesWrapper = document.querySelector('.services-horizontal-wrapper');
    const servicesContainer = document.querySelector('.services-horizontal-container');
    
    if (!servicesSection || !servicesTrack || !servicesWrapper) return;
    
    let currentScroll = 0;
    let ticking = false;
    
    // Calculate dimensions
    function calculateScrollDistance() {
        const trackWidth = servicesTrack.scrollWidth;
        const containerWidth = servicesContainer.clientWidth;
        return trackWidth - containerWidth;
    }
    
    // Update fade indicators
    function updateFadeIndicators(scrollAmount, maxScroll) {
        if (scrollAmount > 50) {
            servicesWrapper.classList.add('show-left-fade');
        } else {
            servicesWrapper.classList.remove('show-left-fade');
        }
        
        if (scrollAmount < maxScroll - 50) {
            servicesWrapper.classList.add('show-right-fade');
        } else {
            servicesWrapper.classList.remove('show-right-fade');
        }
    }
    
    // Apply transform
    function applyTransform(scrollAmount) {
        servicesTrack.style.transform = `translateX(-${scrollAmount}px)`;
        const maxScroll = calculateScrollDistance();
        updateFadeIndicators(scrollAmount, maxScroll);
    }
    
    // Set the section height based on scroll distance needed
    function setScrollHeight() {
        const scrollDistance = calculateScrollDistance();
        // Extended height for scroll space
        servicesSection.style.height = `${window.innerHeight + scrollDistance}px`;
    }
    
    // Handle scroll animation
    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const sectionTop = servicesSection.offsetTop;
                const sectionHeight = servicesSection.offsetHeight;
                const scrollY = window.pageYOffset;
                
                // Check if we're in the section
                const sectionProgress = scrollY - sectionTop;
                
                if (sectionProgress >= 0 && sectionProgress <= sectionHeight - window.innerHeight) {
                    // We're in the section, calculate horizontal scroll
                    const maxScroll = calculateScrollDistance();
                    const scrollPercentage = sectionProgress / (sectionHeight - window.innerHeight);
                    currentScroll = scrollPercentage * maxScroll;
                    
                    applyTransform(currentScroll);
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    // Initialize
    setScrollHeight();
    handleScroll();
    
    // Listen to scroll (works on both desktop and mobile)
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Recalculate on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setScrollHeight();
            handleScroll();
        }, 250);
    });
    
    
    // ============================================
    // OPTIONAL: DRAG TO SCROLL (DESKTOP ONLY)
    // ============================================
    if (window.innerWidth > 768) {
        let isDragging = false;
        let startX;
        let startScrollAmount;
        
        servicesContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX;
            startScrollAmount = currentScroll;
            servicesContainer.style.cursor = 'grabbing';
            servicesTrack.style.transition = 'none';
        });
        
        servicesContainer.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                servicesContainer.style.cursor = 'grab';
            }
        });
        
        servicesContainer.addEventListener('mouseup', () => {
            isDragging = false;
            servicesContainer.style.cursor = 'grab';
        });
        
        servicesContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const x = e.pageX;
            const diff = startX - x;
            const maxScroll = calculateScrollDistance();
            
            currentScroll = startScrollAmount + diff;
            currentScroll = Math.max(0, Math.min(currentScroll, maxScroll));
            
            applyTransform(currentScroll);
        });
    }
    
    
    // ============================================
    // INITIALIZE FADE INDICATORS
    // ============================================
    const initialMaxScroll = calculateScrollDistance();
    updateFadeIndicators(0, initialMaxScroll);
    
    
    // ============================================
    // MOBILE TOUCH ENHANCEMENT (Optional)
    // Allow touch drag to assist scrolling
    // ============================================
    let touchStartX = 0;
    let touchStartY = 0;
    let isTouchScrolling = false;
    
    servicesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        touchStartY = e.touches[0].pageY;
        isTouchScrolling = false;
    }, { passive: true });
    
    servicesContainer.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].pageX;
        const touchY = e.touches[0].pageY;
        
        const diffX = Math.abs(touchX - touchStartX);
        const diffY = Math.abs(touchY - touchStartY);
        
        // If horizontal swipe is stronger, it's meant for the cards
        if (diffX > diffY && diffX > 10) {
            isTouchScrolling = true;
        }
    }, { passive: true });
    
});

// Cursor Circle 
const cursor = document.querySelector(".cursor-circle");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {

    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();


