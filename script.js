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

    // Fallback for cinematic scrollytelling in browsers lacking native CSS animation-timeline
    if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
        
        const storyScroll = document.querySelector('.scrolly-story');
        const steps = document.querySelectorAll('.story-step');

        window.addEventListener('scroll', () => {
            if (storyScroll && steps.length > 0) {
                const rect = storyScroll.getBoundingClientRect();
                const topBound = rect.top; 
                const height = rect.height - window.innerHeight; 
                
                let progress = 0;
                if (topBound <= 0) {
                    progress = Math.min(1, -topBound / height);
                }

                steps.forEach((step, index) => {
                    const stepCount = steps.length;
                    const duration = 1 / stepCount;
                    const start = index * duration;
                    const end = (index + 1) * duration;
                    const peak = (start + end) / 2;
                    
                    let opacity = 0;
                    let translateY = 40;

                    if (progress > start && progress < end) {
                        const dist = Math.abs(progress - peak) / (duration / 2);
                        opacity = 1 - dist;
                        translateY = dist * (progress < peak ? 40 : -40);
                    }
                    
                    step.style.opacity = Math.max(0, opacity);
                    step.style.transform = `translateY(${translateY}px)`;
                });
            }
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


});
