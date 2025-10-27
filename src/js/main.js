// Teacher Lara - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize WhatsApp button visibility on page load
    const whatsappButtonInit = document.querySelector('.whatsapp-float');
    if (whatsappButtonInit) {
        if (window.innerWidth <= 768) {
            // On mobile, hide by default (will be controlled by scroll)
            if (window.scrollY > 100) {
                whatsappButtonInit.classList.remove('hide-on-home');
            } else {
                whatsappButtonInit.classList.add('hide-on-home');
            }
        } else {
            // On desktop, always show
            whatsappButtonInit.classList.remove('hide-on-home');
        }
    }
    
    // Initialize AOS (Animate On Scroll) with fallback
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1200,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            delay: 0,
            anchorPlacement: 'top-bottom',
            disable: false,
            startEvent: 'DOMContentLoaded',
            initClassName: 'aos-init',
            animatedClassName: 'aos-animate',
            useClassNames: false,
            disableMutationObserver: false,
            debounceDelay: 50,
            throttleDelay: 99
        });
    } else {
        // Fallback: Add simple fade-in animation for elements with data-aos
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Simple intersection observer for fallback animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    // Mobile Navigation Drawer Control
    const navToggle = document.getElementById('nav-toggle');
    const navDrawer = document.getElementById('nav-drawer');
    const drawerClose = document.getElementById('drawer-close');
    const drawerOverlay = document.getElementById('drawer-overlay');

    // Debug: Check if elements exist
    console.log('Nav Toggle:', navToggle);
    console.log('Nav Drawer:', navDrawer);
    console.log('Drawer Close:', drawerClose);
    console.log('Drawer Overlay:', drawerOverlay);

    // Toggle drawer function
    function toggleDrawer() {
        console.log('Toggle drawer called');
        console.log('Nav Drawer element:', navDrawer);
        
        if (!navDrawer) {
            console.error('Nav drawer element not found!');
            return;
        }
        
        const isActive = navDrawer.classList.contains('active');
        console.log('Is active:', isActive);
        
        if (isActive) {
            closeDrawer();
        } else {
            openDrawer();
        }
    }

    // Open drawer function
    function openDrawer() {
        console.log('Opening drawer...');
        if (navDrawer) navDrawer.classList.add('active');
        if (drawerOverlay) drawerOverlay.classList.add('active');
        if (navToggle) navToggle.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        console.log('Drawer opened');
    }

    // Close drawer function
    function closeDrawer() {
        console.log('Closing drawer...');
        if (navDrawer) navDrawer.classList.remove('active');
        if (drawerOverlay) drawerOverlay.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
        console.log('Drawer closed');
    }

    // Event listeners for mobile navigation
    if (navToggle) {
        navToggle.addEventListener('click', toggleDrawer);
    }

    if (drawerClose) {
        drawerClose.addEventListener('click', closeDrawer);
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }

    // Close drawer when clicking on drawer links
    drawerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close drawer first
                closeDrawer();
                
                // Then scroll to target
                setTimeout(() => {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 300); // Wait for drawer close animation
            }
        });
    });

    // Smooth scrolling for navigation links (desktop)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close drawer on window resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeDrawer();
        }
    });

    // Close drawer on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navDrawer.classList.contains('active')) {
            closeDrawer();
        }
    });


    // Navbar blur effect on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Control WhatsApp button visibility on mobile
        const whatsappButton = document.querySelector('.whatsapp-float');
        if (whatsappButton && window.innerWidth <= 768) {
            // Show WhatsApp button when scrolled (same logic as back-to-top)
            if (window.scrollY > 100) {
                whatsappButton.classList.remove('hide-on-home');
            } else {
                whatsappButton.classList.add('hide-on-home');
            }
        } else if (whatsappButton && window.innerWidth > 768) {
            // Always show on desktop
            whatsappButton.classList.remove('hide-on-home');
        }
    });

    // Handle WhatsApp button on window resize
    window.addEventListener('resize', function() {
        const whatsappButton = document.querySelector('.whatsapp-float');
        if (whatsappButton) {
            if (window.innerWidth > 768) {
                // Always show on desktop
                whatsappButton.classList.remove('hide-on-home');
            } else {
                // On mobile, show when scrolled (same logic as back-to-top)
                if (window.scrollY > 100) {
                    whatsappButton.classList.remove('hide-on-home');
                } else {
                    whatsappButton.classList.add('hide-on-home');
                }
            }
        }
    });

    // Intersection Observer for animations
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
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .interview-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Video autoplay handling
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('loadeddata', function() {
            this.play().catch(e => {
                console.log('Autoplay prevented:', e);
            });
        });
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
    
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // WhatsApp Floating Button functionality
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Add click tracking
        whatsappButton.addEventListener('click', function() {
            // Optional: Add analytics tracking here
            console.log('WhatsApp button clicked');
        });
    }

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }


    // Services Carousel
    initServicesCarousel(debounce);

});

// Services Carousel Functionality
function initServicesCarousel(debounce) {
    const carousel = document.getElementById('services-carousel');
    const dots = document.querySelectorAll('.dot');
    const cards = document.querySelectorAll('.carousel-card');
    
    if (!carousel || !dots.length || !cards.length) return;
    
    // Only initialize on desktop
    if (window.innerWidth < 1024) {
        console.log('Carousel not initialized - mobile view');
        return;
    }
    
    
    let currentIndex = 2; // Start with card 3 (middle card - index 2)
    let isTransitioning = false;
    const cardWidth = 400; // Base card width
    const gap = 32; // Gap between cards
    const totalCardWidth = cardWidth + gap;
    const totalCards = 5; // Number of cards
    
    function updateCarousel() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Calculate the transform value to center the active card
        const viewportWidth = window.innerWidth;
        const centerOffset = (viewportWidth - cardWidth) / 2;
        const translateX = centerOffset - (currentIndex * totalCardWidth);
        
        carousel.style.transform = `translateX(${translateX}px)`;
        
        // Update active states - only the middle card (currentIndex) should be active
        cards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentIndex) {
                card.classList.add('active');
            }
        });
        
        // Update dots based on service data
        dots.forEach((dot) => {
            dot.classList.remove('active');
            const dotService = dot.getAttribute('data-service');
            const activeCard = cards[currentIndex];
            if (activeCard && activeCard.getAttribute('data-service') === dotService) {
                dot.classList.add('active');
            }
        });
        
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        
        currentIndex++;
        
        // Stop at the last card - no infinite loop
        if (currentIndex >= totalCards) {
            currentIndex = totalCards - 1; // Stay at last card
        }
        
        updateCarousel();
    }
    
    function prevSlide() {
        if (isTransitioning) return;
        
        currentIndex--;
        
        // Stop at the first card - no infinite loop
        if (currentIndex < 0) {
            currentIndex = 0; // Stay at first card
        }
        
        updateCarousel();
    }
    
    function goToSlide(serviceNumber) {
        if (isTransitioning) return;
        
        // Find the first occurrence of the service number (original cards)
        const targetCardIndex = Array.from(cards).findIndex(card => 
            card.getAttribute('data-service') === serviceNumber
        );
        
        if (targetCardIndex !== -1) {
            currentIndex = targetCardIndex;
            updateCarousel();
        }
    }
    
    // Prevent card clicks from navigating
    cards.forEach((card) => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    });
    
    // Dot navigation
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const serviceNumber = dot.getAttribute('data-service');
            goToSlide(serviceNumber);
        });
    });
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                nextSlide(); // Swipe left = next
            } else {
                prevSlide(); // Swipe right = previous
            }
        }
    });
    
    // Mouse drag support
    carousel.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        e.preventDefault();
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        endX = e.clientX;
    });
    
    carousel.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                nextSlide(); // Drag left = next
            } else {
                prevSlide(); // Drag right = previous
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth >= 1024) {
            updateCarousel();
        }
    }, 250));
    
    // Initialize carousel
    updateCarousel();
    // Auto-play disabled
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            nextSlide();
        } else if (e.key === 'ArrowRight') {
            prevSlide();
        }
    });
}

// Utility functions
const Utils = {
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Get element offset from top
    getOffsetTop: function(element) {
        let offsetTop = 0;
        do {
            if (!isNaN(element.offsetTop)) {
                offsetTop += element.offsetTop;
            }
        } while (element = element.offsetParent);
        return offsetTop;
    },

    // Format phone number for WhatsApp
    formatWhatsAppNumber: function(phone) {
        return phone.replace(/\D/g, '');
    },

    // Generate WhatsApp URL
    generateWhatsAppURL: function(phone, message = '') {
        const formattedPhone = this.formatWhatsAppNumber(phone);
        const encodedMessage = encodeURIComponent(message);
        return `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}`;
    }
};

// Set current year dynamically
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Service Modals Functionality
document.addEventListener('DOMContentLoaded', function() {
    const serviceLinks = document.querySelectorAll('.service-link');
    const modals = document.querySelectorAll('.service-modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    // Modal mapping
    const modalMap = {
        'bolt-classroom': 'modal-bolt-classroom',
        'bolt-club': 'modal-bolt-club',
        'bolt-linkedin': 'modal-bolt-linkedin',
        'bolt-b2b': 'modal-bolt-b2b',
        'bolt-interview': null // Special case - scroll to section
    };

    // Open modal function
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Scroll to section function
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Close modal function
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close all modals
    function closeAllModals() {
        modals.forEach(modal => {
            closeModal(modal);
        });
    }

    // Event listeners for service links
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.service-card');
            if (card) {
                const planId = card.getAttribute('data-plan');
                // Special case: bolt-interview should scroll to section
                if (planId === 'bolt-interview') {
                    scrollToSection('interview');
                } else if (planId && modalMap[planId]) {
                    openModal(modalMap[planId]);
                }
            }
        });
    });

    // Close modal on close button click
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.service-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal on overlay click
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const modal = this.closest('.service-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Prevent modal body from closing modal when clicking inside
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});


