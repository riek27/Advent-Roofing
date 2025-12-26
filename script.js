// DOM Elements
const header = document.getElementById('main-header');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mainNav = document.getElementById('main-nav');
const servicesDropdown = document.getElementById('services-dropdown');
const typingElement = document.getElementById('typing');
const animateElements = document.querySelectorAll('.animate-on-scroll');
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const faqItems = document.querySelectorAll('.faq-item');
const currentPage = window.location.pathname.split('/').pop();

// Typing animation phrases
const phrases = [
    "Quality Craftsmanship",
    "Reliable Solutions",
    "Expert Installation",
    "24/7 Emergency Service",
    "Premium Materials",
    "Exceptional Service"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

// Typing animation function
function typeText() {
    if (!typingElement) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Delete characters
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Type characters
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    // If typing is complete
    if (!isDeleting && charIndex === currentPhrase.length) {
        isEnd = true;
        isDeleting = true;
        // Pause at the end of typing
        setTimeout(typeText, 1500);
        return;
    }
    
    // If deleting is complete
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        if (phraseIndex === phrases.length) {
            phraseIndex = 0;
        }
    }
    
    // Determine typing speed
    const typeSpeed = isDeleting ? 50 : 100;
    // Randomize speed slightly for natural effect
    const randomSpeed = Math.random() * 50 + typeSpeed;
    
    setTimeout(typeText, randomSpeed);
}

// Set active navigation link
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Check if this link points to the current page
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
        
        // Special handling for services dropdown
        if (linkHref === 'services.html' && currentPage === 'services.html') {
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            if (dropdownToggle) dropdownToggle.classList.add('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set active navigation
    setActiveNavLink();
    
    // Start typing animation if element exists
    if (typingElement) {
        setTimeout(typeText, 1000);
    }
    
    // Initialize scroll animations
    checkScroll();
    
    // Form submission handlers
    const leadForm = document.getElementById('lead-form');
    const contactForm = document.getElementById('contact-form');
    
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your request! We will contact you shortly.');
            this.reset();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will respond within 24 hours.');
            this.reset();
        });
    }
    
    // Gallery filter functionality
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // FAQ functionality
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Check for scroll animations
    checkScroll();
});

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuToggle.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Services dropdown toggle for mobile
if (servicesDropdown) {
    servicesDropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            servicesDropdown.classList.toggle('active');
        }
    });
    
    // Handle dropdown hover for desktop
    if (window.innerWidth > 992) {
        servicesDropdown.addEventListener('mouseenter', () => {
            servicesDropdown.classList.add('active');
        });
        
        servicesDropdown.addEventListener('mouseleave', () => {
            servicesDropdown.classList.remove('active');
        });
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992 && mainNav.classList.contains('active')) {
        if (!e.target.closest('#main-nav') && !e.target.closest('#mobile-menu-toggle')) {
            mainNav.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    }
});

// Scroll animation function
function checkScroll() {
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
}

// Initialize animations on page load
window.addEventListener('load', checkScroll);

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu if resizing to larger screen
    if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    // Reset dropdown state on resize
    if (window.innerWidth > 992 && servicesDropdown) {
        servicesDropdown.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only process internal page anchors (not external links)
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});  fix this script.js, the mobile menu toggle is not working, make it work and fix all other issue , make it very very better and nice and smooth that will make the website look really nice
