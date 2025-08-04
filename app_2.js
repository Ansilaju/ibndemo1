// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('IBN AI Academy website loading...');
    
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sections for scroll spy
    const sections = document.querySelectorAll('section[id]');

    // Elements for animations
    const uspCards = document.querySelectorAll('.usp-card');

    // Fix: Ensure smooth scrolling works immediately
    document.documentElement.style.scrollBehavior = 'smooth';

    // Mobile Menu Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hamburger clicked');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            console.log('Nav link clicked:', this.getAttribute('href'));
        });
    });

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }

    // Active section highlighting (scroll spy)
    function updateActiveNavLink() {
        let current = 'home'; // Default to home
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Enhanced smooth scrolling - FIXED VERSION
    function scrollToSection(targetId) {
        console.log('Attempting to scroll to:', targetId);
        
        if (!targetId || !targetId.startsWith('#')) {
            console.warn('Invalid target ID:', targetId);
            return false;
        }

        const targetSection = document.querySelector(targetId);
        if (!targetSection) {
            console.warn('Target section not found:', targetId);
            return false;
        }

        const navbarHeight = navbar ? navbar.offsetHeight : 70;
        const offsetTop = targetSection.offsetTop - navbarHeight - 10; // Extra 10px padding
        
        console.log('Scrolling to position:', offsetTop, 'for section:', targetId);
        
        window.scrollTo({
            top: Math.max(0, offsetTop), // Ensure we don't scroll to negative position
            behavior: 'smooth'
        });
        
        return true;
    }

    function initSmoothScrolling() {
        console.log('Initializing smooth scrolling...');
        
        // Handle all navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                console.log('Navigation link clicked:', this.textContent, 'Target:', targetId);
                
                if (scrollToSection(targetId)) {
                    // Close mobile menu after successful scroll
                    hamburger?.classList.remove('active');
                    navMenu?.classList.remove('active');
                }
            });
        });

        // Handle CTA button - FIXED VERSION
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('CTA button clicked - scrolling to courses');
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Scroll to courses section
                scrollToSection('#courses');
            });
        }
    }

    // Notification system
    function showNotification(message, type = 'info') {
        console.log('Showing notification:', message, type);
        
        // Remove any existing notifications first
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        const styles = {
            position: 'fixed',
            top: '90px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            fontSize: '14px',
            zIndex: '9999',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            maxWidth: '300px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        };
        
        Object.assign(notification.style, styles);

        // Set background color based on type
        const colors = {
            success: '#10b981',
            info: '#3b82f6',
            warning: '#f59e0b',
            error: '#ef4444'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);
    }

    // Enhanced button interactions
    function initButtonInteractions() {
        console.log('Initializing button interactions...');
        
        // Enroll buttons
        const enrollButtons = document.querySelectorAll('.enroll-btn');
        console.log('Found enroll buttons:', enrollButtons.length);
        
        enrollButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Enroll button clicked:', index);
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Show notification
                const courseName = this.closest('.course-card')?.querySelector('h3')?.textContent || 'Course';
                showNotification(`Enrollment for ${courseName} - Contact us for more details!`, 'success');
            });
        });

        // Contact buttons
        const contactButtons = document.querySelectorAll('.contact-btn');
        console.log('Found contact buttons:', contactButtons.length);
        
        contactButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Contact button clicked');
                
                if (this.classList.contains('primary')) {
                    showNotification('Free demo session booking - Contact us to schedule!', 'success');
                } else {
                    showNotification('For more information, please contact IBN AI Academy!', 'info');
                }
            });
        });
    }

    // Enhanced course card hover effects
    function enhanceCourseCards() {
        const courseCards = document.querySelectorAll('.course-card');
        console.log('Enhancing course cards:', courseCards.length);
        
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 60px rgba(13, 71, 161, 0.25)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer for USP cards stagger animation
    const uspObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observer for general fade-in animations
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Initialize scroll animations
    function initScrollAnimations() {
        console.log('Initializing scroll animations...');
        
        // Observe USP cards for stagger animation
        uspCards.forEach(card => {
            uspObserver.observe(card);
        });

        // Add fade-in-on-scroll class to various elements
        const animatedSelectors = [
            '.overview-card',
            '.course-card',
            '.competitor-card',
            '.swot-card',
            '.gap-item',
            '.contact-content'
        ];

        animatedSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('fade-in-on-scroll');
                fadeObserver.observe(element);
            });
        });
    }

    // Counter animation for stats
    function initCounterAnimation() {
        const statItems = document.querySelectorAll('.stat-item');
        const speed = 50;

        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent);
            let current = 0;
            const increment = target / speed;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target.querySelector('h3');
                    if (counter && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        setTimeout(() => animateCounter(counter), 500);
                    }
                }
            });
        }, { threshold: 0.7 });

        statItems.forEach(item => {
            counterObserver.observe(item);
        });
    }

    // Debug function to check sections
    function debugSections() {
        console.log('Available sections:');
        sections.forEach(section => {
            console.log(`- ${section.id}: top=${section.offsetTop}, height=${section.clientHeight}`);
        });
    }

    // Initialize all functionality
    function init() {
        console.log('Initializing all functionality...');
        
        // Debug sections
        debugSections();
        
        // Set up smooth scrolling first
        initSmoothScrolling();
        
        // Set up button interactions
        initButtonInteractions();
        
        // Enhance course cards
        enhanceCourseCards();
        
        // Set up scroll animations
        initScrollAnimations();
        
        // Initialize counter animations
        initCounterAnimation();

        // Set up scroll event listeners
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            handleNavbarScroll();
            
            // Debounce the scroll spy for better performance
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateActiveNavLink, 10);
        });

        // Set initial states
        handleNavbarScroll();
        updateActiveNavLink();
        
        console.log('Initialization complete!');
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });

    // Enhanced accessibility
    navLinks.forEach(link => {
        link.addEventListener('focus', function() {
            this.style.outline = '2px solid rgba(255, 255, 255, 0.8)';
            this.style.outlineOffset = '2px';
        });
        
        link.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Initialize everything when DOM is ready
    init();

    setTimeout(() => {
        console.log('IBN AI Academy website fully initialized!');
    }, 100);
});