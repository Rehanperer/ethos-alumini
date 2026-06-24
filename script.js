document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-enabled');

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = '0 8px 32px rgba(107, 33, 168, 0.12)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.65)';
            navbar.style.boxShadow = '0 8px 32px rgba(107, 33, 168, 0.08)';
        }
    });

    // Reveal observer for standard cards
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    // --- GSAP ANIMATIONS ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Horizontal Scroll Section
        const horizontalSection = document.querySelector('.horizontal-scroll-section');
        const horizontalWrapper = document.querySelector('.horizontal-scroll-wrapper');
        
        if (horizontalSection && horizontalWrapper) {
            let mm = gsap.matchMedia();
            
            mm.add("(min-width: 769px)", () => {
                const getScrollAmount = () => -(horizontalWrapper.scrollWidth - window.innerWidth);
                
                const tween = gsap.to(horizontalWrapper, {
                    x: getScrollAmount,
                    ease: "none"
                });

                ScrollTrigger.create({
                    trigger: horizontalSection,
                    start: "top top",
                    end: () => `+=${getScrollAmount() * -1}`,
                    pin: true,
                    animation: tween,
                    scrub: 1,
                    invalidateOnRefresh: true
                });
                
                // Parallax images
                const parallaxImages = document.querySelectorAll('.parallax-img');
                parallaxImages.forEach(img => {
                    gsap.to(img, {
                        x: "15%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: horizontalSection,
                            start: "top top",
                            end: () => `+=${getScrollAmount() * -1}`,
                            scrub: 1,
                            invalidateOnRefresh: true
                        }
                    });
                });
            });
        }

        // Advanced Reveal Animations
        const revealElementsGSAP = document.querySelectorAll('.gs-reveal');
        revealElementsGSAP.forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0, y: 60, autoAlpha: 0 }, 
                { 
                    duration: 1.2, 
                    opacity: 1, 
                    y: 0, 
                    autoAlpha: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    // Spotlight Effect for Member Cards
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Simple Filter Button Logic (Visual Only for now)
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Expandable Accordion Logic (Core Values)
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            accordionItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
        // For touch devices
        item.addEventListener('click', () => {
            accordionItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Hero Slideshow Logic
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 5000); // Change slide every 5 seconds
    }
});
