
        // ========== Loading Animation ==========
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('loadingOverlay').classList.add('hidden');
            }, 1000);
        });

        // ========== Create Particles ==========
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                
                if (Math.random() > 0.5) {
                    particle.style.background = '#00B2FF';
                }
                
                particlesContainer.appendChild(particle);
            }
        }

        // ========== Mobile Menu Toggle ==========
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // ========== Active Navigation Highlighting ==========
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');

        function updateActiveNav() {
            const scrollPosition = window.pageYOffset + 100;

            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navItems.forEach(function(item) {
                        item.classList.remove('active');
                    });
                    const currentNav = document.querySelector('.nav-link[href="#' + section.id + '"]');
                    if (currentNav) {
                        currentNav.classList.add('active');
                    }
                }
            });
        }

        // ========== Navbar Scroll Effect ==========
        const navbar = document.getElementById('navbar');
        const scrollTop = document.getElementById('scrollTop');

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Show/hide scroll to top button
            if (window.scrollY > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
            
            updateActiveNav();
        });

        // ========== Scroll to Top ==========
        scrollTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ========== Smooth Scrolling ==========
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ========== Form Submission ==========
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `*رسالة جديدة من الموقع*%0A%0A*الاسم:* ${name}%0A*البريد:* ${email}%0A*الهاتف:* ${phone}%0A*الخدمة:* ${service}%0A*الرسالة:*%0A${message}`;
            
            // Open WhatsApp
            window.open(`https://wa.me/213656604882?text=${whatsappMessage}`, '_blank');
            
            // Show success message
            alert('شكراً لتواصلك معنا! سيتم توجيهك إلى واتساب لإكمال الرسالة.');
            
            // Reset form
            this.reset();
        });

        // ========== Intersection Observer for Animations ==========
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, observerOptions);

        // Observe service cards, portfolio cards, and testimonial cards
        document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card').forEach(function(card) {
            card.style.opacity = '0';
            observer.observe(card);
        });

        // ========== Initialize ==========
        updateActiveNav();
        createParticles();

        // ========== Stats Counter Animation ==========
        function animateCounter(element, target, duration) {
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(function() {
                start += increment;
                if (start >= target) {
                    element.textContent = '+' + target;
                    clearInterval(timer);
                } else {
                    element.textContent = '+' + Math.floor(start);
                }
            }, 16);
        }

        // Animate stats when they come into view
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const statElement = entry.target.querySelector('h3');
                    const targetValue = parseInt(statElement.textContent.replace('+', ''));
                    animateCounter(statElement, targetValue, 2000);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat').forEach(function(stat) {
            statsObserver.observe(stat);
        });

        // ========== Add hover sound effect (optional) ==========
        document.querySelectorAll('.btn, .service-card, .portfolio-card').forEach(function(element) {
            element.addEventListener('mouseenter', function() {
                // You can add a subtle sound effect here if desired
                this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
        });

        console.log('%c🚀 Mode Web - Website Loaded Successfully!', 'color: #00a8e8; font-size: 16px; font-weight: bold;');
