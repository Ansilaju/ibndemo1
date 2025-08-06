// BAMBINOZ website JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Gallery elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryBtns = document.querySelectorAll('.gallery-btn');

    console.log('Navigation elements found:', {
        navToggle: !!navToggle,
        navMenu: !!navMenu,
        navLinks: navLinks.length,
        navbar: !!navbar
    });

    console.log('Gallery elements found:', {
        galleryItems: galleryItems.length,
        galleryBtns: galleryBtns.length
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            console.log('Mobile menu toggled');
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            console.log('Navigation clicked:', targetId);
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetSection.offsetTop - navbarHeight;
                    
                    console.log('Scrolling to:', targetId, 'offset:', offsetTop);
                    
                    // Force smooth scrolling
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    setTimeout(() => {
                        updateActiveNavLink();
                    }, 100);
                } else {
                    console.warn('Target section not found:', targetId);
                }
            }
        });
    });

    // Update active navigation link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 120;

        let activeSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });

        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current section's nav link
        if (activeSection) {
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${activeSection}"]`);
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        } else {
            // If no section is active, activate home
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }

    // Gallery functionality - FIXED
    let currentGalleryIndex = 0;

    function showGalleryImage(index) {
        console.log('Showing gallery image:', index);
        
        // Hide all gallery items
        galleryItems.forEach(item => item.classList.remove('active'));
        galleryBtns.forEach(btn => btn.classList.remove('active'));

        // Show selected gallery item
        if (galleryItems[index] && galleryBtns[index]) {
            galleryItems[index].classList.add('active');
            galleryBtns[index].classList.add('active');
            currentGalleryIndex = index;
            console.log('Gallery image shown successfully:', index);
        } else {
            console.warn('Gallery elements not found for index:', index);
        }
    }

    // Gallery navigation buttons - FIXED
    galleryBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Gallery button clicked:', index);
            showGalleryImage(index);
            // Reset auto-advance timer
            if (typeof galleryInterval !== 'undefined') {
                clearInterval(galleryInterval);
                galleryInterval = setInterval(autoAdvanceGallery, 5000);
            }
        });
    });

    // Auto-advance gallery every 5 seconds - FIXED
    function autoAdvanceGallery() {
        if (galleryItems.length > 0) {
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
            showGalleryImage(currentGalleryIndex);
            console.log('Auto-advanced to gallery image:', currentGalleryIndex);
        }
    }

    // Start auto-advance gallery
    let galleryInterval;
    if (galleryItems.length > 0) {
        galleryInterval = setInterval(autoAdvanceGallery, 5000);
        console.log('Gallery auto-advance started');
    }

    // Pause auto-advance when user interacts with gallery
    const galleryContainer = document.querySelector('.bestsellers-gallery');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', function() {
            if (galleryInterval) {
                clearInterval(galleryInterval);
                console.log('Gallery auto-advance paused');
            }
        });

        galleryContainer.addEventListener('mouseleave', function() {
            galleryInterval = setInterval(autoAdvanceGallery, 5000);
            console.log('Gallery auto-advance resumed');
        });
    }

    // Navbar background change on scroll
    function handleNavbarScroll() {
        if (!navbar) return;
        
        if (window.pageYOffset > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Hero buttons smooth scroll - FIXED
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetSection.offsetTop - navbarHeight;
                    
                    console.log('Hero button clicked, scrolling to:', href);
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.service-card, .product-card, .feature-item, .contact-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Throttled scroll handler for performance
    let scrollTicking = false;

    function handleScroll() {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                handleNavbarScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }

    // Scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize gallery - FIXED
    if (galleryItems.length > 0) {
        showGalleryImage(0);
        console.log('Gallery initialized with first image');
    }

    // Initialize active nav link
    setTimeout(() => {
        updateActiveNavLink();
    }, 100);

    // Handle phone number click for mobile devices
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // On desktop, show a message about calling
            if (window.innerWidth > 768 && !('ontouchstart' in window)) {
                e.preventDefault();
                const phoneNumber = this.textContent;
                alert(`Call us at ${phoneNumber}`);
            }
            // On mobile, the tel: link will work naturally
        });
    });

    // Handle Instagram link
    const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
    instagramLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank', 'noopener,noreferrer');
        });
    });

    // Enhanced hero image loading - FIXED
    const heroImg = document.querySelector('.hero-img-full');
    if (heroImg) {
        console.log('Hero image found, setting up loading');
        
        // Ensure image is visible
        heroImg.style.opacity = '1';
        heroImg.style.display = 'block';
        
        // Check if image is already loaded
        if (heroImg.complete && heroImg.naturalWidth > 0) {
            console.log('Hero image already loaded');
            heroImg.style.opacity = '1';
        } else {
            heroImg.addEventListener('load', function() {
                console.log('Hero image loaded successfully');
                this.style.opacity = '1';
            });
            
            heroImg.addEventListener('error', function() {
                console.error('Hero image failed to load');
            });
        }
    } else {
        console.warn('Hero image element not found');
    }

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        console.log('Page fully loaded');
        
        // Trigger initial animations for hero content
        setTimeout(() => {
            const heroTextContainer = document.querySelector('.hero-text-container');
            if (heroTextContainer) {
                heroTextContainer.style.opacity = '1';
                heroTextContainer.style.transform = 'translateY(0)';
            }
            
            const heroImageFull = document.querySelector('.hero-image-full');
            if (heroImageFull) {
                heroImageFull.style.opacity = '1';
                heroImageFull.style.transform = 'translateY(0)';
            }
        }, 100);
    });

    // Handle resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768) {
                if (navMenu && navToggle) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
            // Recalculate active nav link
            updateActiveNavLink();
        }, 250);
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }

        // Arrow keys for gallery navigation when gallery is visible
        const bestSellersSection = document.querySelector('.bestsellers');
        if (bestSellersSection && galleryItems.length > 0) {
            const sectionRect = bestSellersSection.getBoundingClientRect();
            const isGalleryVisible = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;
            
            if (isGalleryVisible) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    currentGalleryIndex = currentGalleryIndex > 0 ? currentGalleryIndex - 1 : galleryItems.length - 1;
                    showGalleryImage(currentGalleryIndex);
                    if (galleryInterval) {
                        clearInterval(galleryInterval);
                        galleryInterval = setInterval(autoAdvanceGallery, 5000);
                    }
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
                    showGalleryImage(currentGalleryIndex);
                    if (galleryInterval) {
                        clearInterval(galleryInterval);
                        galleryInterval = setInterval(autoAdvanceGallery, 5000);
                    }
                }
            }
        }
    });

    // Debug function to check if sections exist
    function debugSections() {
        const sections = document.querySelectorAll('section[id]');
        console.log('Available sections:', Array.from(sections).map(s => s.id));
        
        const navLinkTargets = Array.from(navLinks).map(l => l.getAttribute('href'));
        console.log('Navigation targets:', navLinkTargets);
        
        // Check if all nav targets have corresponding sections
        navLinkTargets.forEach(target => {
            if (target && target.startsWith('#')) {
                const section = document.querySelector(target);
                if (!section) {
                    console.warn('Missing section for nav target:', target);
                } else {
                    console.log('Section found for:', target);
                }
            }
        });
    }

    // Force hero image to be visible
    function ensureHeroImageVisible() {
        const heroImageContainer = document.querySelector('.hero-image-full');
        const heroImage = document.querySelector('.hero-img-full');
        
        if (heroImageContainer) {
            heroImageContainer.style.display = 'block';
            heroImageContainer.style.opacity = '1';
            heroImageContainer.style.visibility = 'visible';
            console.log('Hero image container made visible');
        }
        
        if (heroImage) {
            heroImage.style.display = 'block';
            heroImage.style.opacity = '1';
            heroImage.style.visibility = 'visible';
            console.log('Hero image made visible');
        }
    }

    // Run debug and fixes
    debugSections();
    ensureHeroImageVisible();

    // Set initial gallery state
    setTimeout(() => {
        if (galleryItems.length > 0 && galleryBtns.length > 0) {
            showGalleryImage(0);
        }
    }, 500);

    console.log('BAMBINOZ website initialized successfully!');
});