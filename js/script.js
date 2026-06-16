document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Mouse Tracking Glow Effect for Cards
    const cards = document.querySelectorAll('.feature-card, .divisi-card, .lab-card, .member-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // 4. Number Counter Animation (Hanya di Beranda)
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;
    const statsSection = document.querySelector('.stats');
    
    if (statsSection && counters.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + '+';
                        }
                    };
                    updateCounter();
                });
            }
        }, { threshold: 0.5 });
        countObserver.observe(statsSection);
    }

    // 5. Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 8, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(5, 5, 8, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 6. DIVISI PAGE: Interactive Lab Logic
    const bannerInput = document.getElementById('bannerInput');
    const liveText = document.getElementById('liveText');
    if (bannerInput && liveText) {
        bannerInput.addEventListener('input', (e) => {
            liveText.textContent = e.target.value === '' ? 'Ketik sesuatu...' : e.target.value;
        });
    }

    const exposureSlider = document.getElementById('exposureSlider');
    const bokehSlider = document.getElementById('bokehSlider');
    const viewfinder = document.getElementById('viewfinder');
    const vfSettings = document.getElementById('vf-settings');

    if (exposureSlider && bokehSlider && viewfinder) {
        const updateViewfinder = () => {
            const exposure = exposureSlider.value;
            const bokeh = bokehSlider.value;
            viewfinder.style.filter = `brightness(${exposure}) blur(${bokeh}px)`;
            const iso = Math.round(400 * exposure);
            const aperture = (2.8 + (bokeh * 0.5)).toFixed(1);
            vfSettings.textContent = `ISO ${iso} | f/${aperture}`;
        };
        exposureSlider.addEventListener('input', updateViewfinder);
        bokehSlider.addEventListener('input', updateViewfinder);
    }

    // ==========================================
    // 7. KARYA PAGE: Portfolio Filter Logic
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const showcaseItems = document.querySelectorAll('.showcase-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                showcaseItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hidden');
                        item.classList.add('fade-in');
                        // Remove animation class after it plays so it can play again
                        setTimeout(() => item.classList.remove('fade-in'), 500);
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
});