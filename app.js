// ===================================================================
// BAMBINOZ – The Perfect Baby Shop - JavaScript Functionality
// ===================================================================

// Application data from provided JSON
const appData = {
  company: {
    name: "BAMBINOZ - THE PERFECT BABY SHOP",
    tagline: "Making Parenting a Stylish Adventure",
    established: "1973",
    rating: "4.7",
    location: "Manacaud, Thiruvananthapuram, Kerala, India",
    experience: "50+ Years of Trust"
  },
  services: [
    {
      title: "Newborn Essentials",
      description: "Baby bottles, pacifiers, swaddles and more for the first months of joy.",
      icon: "🍼"
    },
    {
      title: "Fashion & Apparel", 
      description: "Soft, stylish clothing for babies and toddlers aged 0-5 years.",
      icon: "👶"
    },
    {
      title: "Toys & Play",
      description: "Educational and fun toys tested for safety standards.",
      icon: "🧸"
    },
    {
      title: "Travel Gear",
      description: "Strollers, car seats and carriers that keep your little one secure.",
      icon: "🚗"
    },
    {
      title: "Nursery Furniture",
      description: "Cribs, high-chairs and décor to create a cozy nursery.",
      icon: "🛏️"
    },
    {
      title: "Bath & Hygiene",
      description: "Gentle skincare, bath tubs and grooming kits for clean, happy babies.",
      icon: "🛁"
    }
  ],
  bestSellers: [
    {
      name: "Ergonomic Baby Carrier",
      description: "Comfortable carrier for parents and babies"
    },
    {
      name: "Convertible Crib 4-in-1",
      description: "Grows with your child from crib to bed"
    },
    {
      name: "Organic Cotton Onesies (5-pack)",
      description: "Soft, breathable organic cotton essentials"
    },
    {
      name: "Interactive Learning Cube",
      description: "Educational toy for early development"
    },
    {
      name: "Premium Stroller System",
      description: "All-terrain stroller with safety features"
    },
    {
      name: "Baby Monitor with Camera",
      description: "Keep an eye on your little one 24/7"
    }
  ],
  aboutUs: {
    story: "Founded in 1973 in the heart of Manacaud, Thiruvananthapuram, Bambinoz has grown from a small family-run store into the city's most trusted destination for parents.",
    mission: "To make parenting a stylish adventure by curating safe, high-quality products that bring comfort to babies and peace of mind to parents.",
    values: ["Safety", "Quality", "Trust", "Community"],
    customerSatisfaction: "Rated 4.7★ by hundreds of happy families"
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  renderServices();
  renderBestSellers();
  renderAboutUs();
  initSmoothScrolling();
  initMobileNavigation();
  initScrollSpy();
  initRevealAnimations();
  initCarousel();
  initContactForm();
}

// ===== SMOOTH SCROLLING NAVIGATION =====
function initSmoothScrolling() {
  // Handle all navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Close mobile menu if open
        const navLinksContainer = document.getElementById('nav-links');
        const hamburger = document.getElementById('hamburger');
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
          navLinksContainer.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
        
        // Smooth scroll to target
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===== SERVICES RENDERING =====
function renderServices() {
  const servicesGrid = document.getElementById('services-grid');
  if (!servicesGrid) return;

  const servicesHTML = appData.services.map(service => `
    <div class="service__card reveal">
      <div class="service__icon">${service.icon}</div>
      <h3 class="service__title">${service.title}</h3>
      <p class="service__description">${service.description}</p>
    </div>
  `).join('');

  servicesGrid.innerHTML = servicesHTML;
}

// ===== BEST SELLERS CAROUSEL =====
function renderBestSellers() {
  const carouselTrack = document.getElementById('carousel-track');
  if (!carouselTrack) return;

  const carouselHTML = appData.bestSellers.map(product => `
    <div class="carousel__item reveal">
      <div class="carousel__item-inner">
        <h4 class="carousel__title">${product.name}</h4>
        <p class="carousel__desc">${product.description}</p>
      </div>
    </div>
  `).join('');

  carouselTrack.innerHTML = carouselHTML;
}

// ===== ABOUT US RENDERING =====
function renderAboutUs() {
  const aboutText = document.getElementById('about-text');
  if (!aboutText) return;

  const aboutHTML = `
    <h3>Our Story</h3>
    <p>${appData.aboutUs.story}</p>
    
    <h3>Our Mission</h3>
    <p>${appData.aboutUs.mission}</p>
    
    <h3>Our Values</h3>
    <ul>
      ${appData.aboutUs.values.map(value => `<li>${value}</li>`).join('')}
    </ul>
    
    <h3>Customer Satisfaction</h3>
    <p>${appData.aboutUs.customerSatisfaction}</p>
  `;

  aboutText.innerHTML = aboutHTML;
}

// ===== MOBILE NAVIGATION =====
function initMobileNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function() {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', (!expanded).toString());
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

// ===== SCROLL SPY =====
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function activateLink(id) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activateLink(entry.target.id);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// ===== REVEAL ANIMATIONS =====
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));
}

// ===== CAROUSEL FUNCTIONALITY =====
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.querySelector('.carousel__btn.prev');
  const nextBtn = document.querySelector('.carousel__btn.next');

  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let autoplayInterval;

  function getSlides() {
    return Array.from(track.children);
  }

  function updateCarousel() {
    const slides = getSlides();
    if (slides.length === 0) return;
    
    const slideWidth = slides[0].offsetWidth + 24; // 24px gap
    const offset = -currentIndex * slideWidth;
    track.style.transform = `translateX(${offset}px)`;
  }

  function showNext() {
    const slides = getSlides();
    if (slides.length === 0) return;
    
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function showPrev() {
    const slides = getSlides();
    if (slides.length === 0) return;
    
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function startAutoplay() {
    autoplayInterval = setInterval(showNext, 4000);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  // Event listeners
  prevBtn.addEventListener('click', function() {
    stopAutoplay();
    showPrev();
    startAutoplay();
  });

  nextBtn.addEventListener('click', function() {
    stopAutoplay();
    showNext();
    startAutoplay();
  });

  // Pause on hover
  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);

  // Handle window resize
  window.addEventListener('resize', updateCarousel);
  
  // Initialize carousel after DOM is fully loaded
  setTimeout(() => {
    updateCarousel();
    startAutoplay();
  }, 100);
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusElement = document.getElementById('form-status');
  
  if (!form || !statusElement) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      phone: formData.get('phone').trim(),
      message: formData.get('message').trim()
    };

    // Validate form
    const errors = validateForm(data);
    if (errors.length > 0) {
      showStatus(errors.join('. '), 'error');
      return;
    }

    // Show loading state
    showStatus('Sending message...', 'info');
    
    // Simulate sending (replace with actual implementation)
    setTimeout(() => {
      showStatus('Message sent successfully! We\'ll get back to you soon.', 'success');
      form.reset();
    }, 2000);
  });

  function validateForm(data) {
    const errors = [];
    
    if (!data.name) {
      errors.push('Name is required');
    }
    
    if (!data.email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!data.message) {
      errors.push('Message is required');
    }
    
    return errors;
  }

  function showStatus(message, type) {
    statusElement.textContent = message;
    statusElement.className = `status status--${type}`;
    statusElement.classList.remove('hidden');
    
    if (type === 'success') {
      setTimeout(() => {
        statusElement.classList.add('hidden');
      }, 5000);
    }
  }
}