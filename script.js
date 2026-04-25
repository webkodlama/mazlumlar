/**
 * UMUT - Mazlumlar İçin Yardım Platformu
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // Loading Screen
    // ========================================
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);

    // ========================================
    // Navigation
    // ========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    function setActiveNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Particle Effect for Hero
    // ========================================
    const particlesContainer = document.getElementById('particles');
    const particleCount = 25;

    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // ========================================
    // Counter Animation
    // ========================================
    const counters = document.querySelectorAll('[data-count]');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        // Sayaç daha önce animasyon yaptıysa tekrar yapma kontrolü
        if (counter.classList.contains('counted')) return;
        counter.classList.add('counted');

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString('tr-TR');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString('tr-TR');
            }
        };

        updateCounter();
    }

    // Intersection Observer ile sayaçları izle
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ========================================
    // Scroll Animations (AOS-like)
    // ========================================
    const animatedElements = document.querySelectorAll('[data-aos]');

    function checkAnimations() {
        const triggerBottom = window.innerHeight * 0.85;

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('aos-animate');
            }
        });
    }

    // Initial check
    checkAnimations();

    // Check on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTop = document.getElementById('backToTop');

    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // Testimonials Slider
    // ========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            testimonialDots[i].classList.remove('active');
        });

        currentSlide = index;
        if (currentSlide >= testimonialCards.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = testimonialCards.length - 1;

        testimonialCards[currentSlide].classList.add('active');
        testimonialDots[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto slide
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 6000);

    // ========================================
    // Donation Form
    // ========================================
    const donationBtns = document.querySelectorAll('.donation-btn');
    const donationForm = document.getElementById('donationForm');

    donationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            donationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // If "Other" button clicked, could show custom amount input
            if (this.classList.contains('other')) {
                showToast('Özel tutar girişi için lütfen iletişime geçin');
            }
        });
    });

    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = document.getElementById('donorName').value;
        
        // Simulate form submission
        showToast(`Teşekkürler ${name}! Bağışınız için yönlendiriliyorsunuz...`);
        
        // Reset form
        this.reset();
        donationBtns.forEach(b => b.classList.remove('active'));
    });

    // ========================================
    // Contact Form
    // ========================================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        
        showToast(`Mesajınız alındı ${name}! En kısa sürede size dönüş yapacağız.`);
        
        this.reset();
    });

    // ========================================
    // Newsletter Form
    // ========================================
    const newsletterForm = document.getElementById('newsletterForm');

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        showToast('Bülten aboneliğiniz başarıyla tamamlandı!');
        
        this.reset();
    });

    // ========================================
    // Toast Notification
    // ========================================
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        
        toastMessage.textContent = message;
        toast.classList.add('visible');
        
        setTimeout(() => {
            toast.classList.remove('visible');
        }, 4000);
    }

    // ========================================
    // Intersection Observer for Advanced Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });

    // Observe impact cards
    document.querySelectorAll('.impact-card').forEach(card => {
        observer.observe(card);
    });

    // ========================================
    // Parallax Effect for Hero Orbs
    // ========================================
    const orbs = document.querySelectorAll('.gradient-orb');

    function parallaxOrbs(e) {
        if (window.innerWidth < 768) return; // Disable on mobile
        
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (0.5 - x) * speed;
            const yOffset = (0.5 - y) * speed;
            
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    }

    document.addEventListener('mousemove', parallaxOrbs);

    // ========================================
    // Typing Effect for Hero (Optional enhancement)
    // ========================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ========================================
    // Form Validation Enhancements
    // ========================================
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateInput(this);
                }
            });
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        
        if (input.hasAttribute('required') && !value) {
            showInputError(input, 'Bu alan zorunludur');
            return false;
        }
        
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showInputError(input, 'Geçerli bir e-posta adresi giriniz');
                return false;
            }
        }
        
        if (input.type === 'tel' && value) {
            const phoneRegex = /^[0-9+\s()-]{10,}$/;
            if (!phoneRegex.test(value)) {
                showInputError(input, 'Geçerli bir telefon numarası giriniz');
                return false;
            }
        }
        
        clearInputError(input);
        return true;
    }

    function showInputError(input, message) {
        input.classList.add('error');
        
        // Remove existing error message
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 0.25rem;
        `;
        
        input.parentElement.appendChild(errorDiv);
        input.style.borderColor = '#ef4444';
    }

    function clearInputError(input) {
        input.classList.remove('error');
        input.style.borderColor = '';
        
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) errorMessage.remove();
    }

    // ========================================
    // Performance: Lazy Load Images
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========================================
    // Keyboard Navigation
    // ========================================
    document.addEventListener('keydown', (e) => {
        // Escape to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Escape to close modal
        if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
            closeModal();
        }
        
        // Arrow keys for testimonials
        if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            showSlide(currentSlide + 1);
        }
    });

    // ========================================
    // Service Modal
    // ========================================
    const serviceModal = document.getElementById('serviceModal');
    const modalClose = document.getElementById('modalClose');
    const serviceLinks = document.querySelectorAll('.service-link[data-service]');
    
    // Modal elementleri
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    
    function openModal(data) {
        // Modal içeriğini doldur
        modalIcon.textContent = data.icon;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.desc;
        
        // Özellikleri ekle
        modalFeatures.innerHTML = '';
        const features = data.features.split('|');
        features.forEach(feature => {
            const featureItem = document.createElement('div');
            featureItem.className = 'modal-feature-item';
            featureItem.innerHTML = `<span class="modal-feature-text">${feature}</span>`;
            modalFeatures.appendChild(featureItem);
        });
        
        // Modal'ı aç
        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Her "Detayları Gör" linkine tıklama olayı ekle
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const data = {
                service: this.dataset.service,
                icon: this.dataset.icon,
                title: this.dataset.title,
                desc: this.dataset.desc,
                features: this.dataset.features
            };
            
            openModal(data);
        });
    });
    
    // Kapatma butonu
    modalClose.addEventListener('click', closeModal);
    
    // Modal dışına tıklayınca kapat
    serviceModal.addEventListener('click', function(e) {
        if (e.target === serviceModal) {
            closeModal();
        }
    });

    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c🕊️ Umut Derneği', 'font-size: 24px; font-weight: bold; color: #2dd4bf;');
    console.log('%cMazlumlar için umut oluyoruz.', 'font-size: 14px; color: #64748b;');
    console.log('%cwww.umut.org.tr', 'font-size: 12px; color: #6366f1;');
});

// ========================================
// Service Worker Registration (for PWA)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added later for offline support
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ========================================
// Utility Functions
// ========================================

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format number with Turkish locale
function formatNumber(num) {
    return num.toLocaleString('tr-TR');
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
