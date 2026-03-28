document.addEventListener('DOMContentLoaded', () => {

    /* --- Custom Cursor --- */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-scale]');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Animate dot instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Animate outline with slight delay natively using CSS transition 
        // Or for smoother JS animation:
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursorOutline.style.width = "50px";
            cursorOutline.style.height = "50px";
            cursorOutline.style.backgroundColor = "rgba(0, 240, 255, 0.1)";
        });
        el.addEventListener("mouseleave", () => {
            cursorOutline.style.width = "30px";
            cursorOutline.style.height = "30px";
            cursorOutline.style.backgroundColor = "transparent";
        });
    });

    /* --- Scroll Progress Bar --- */
    const scrollIndicator = document.getElementById('scrollIndicator');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollIndicator.style.width = `${scrollPercentage}%`;
    });


    /* --- Mobile Navigation Toggle --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const i = hamburger.querySelector('i');
        i.classList.toggle('fa-bars');
        i.classList.toggle('fa-times');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const i = hamburger.querySelector('i');
                i.classList.remove('fa-times');
                i.classList.add('fa-bars');
            }
        });
    });

    /* --- Sticky Header & Active Link Status on Scroll --- */
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    /* --- Scroll Reveal Animation --- */
    // Ensure staggered elements or sections fade in
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe core sections and wrapper areas
    const animatedElements = document.querySelectorAll('.hidden-section, .stagger-wrapper');
    animatedElements.forEach(el => sectionObserver.observe(el));

    // Initially trigger hero section animation slightly after load
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('section-visible');
        document.querySelector('.hero-image-wrapper').classList.add('section-visible');
    }, 100);

    /* --- Typewriter Effect --- */
    const typewriterElement = document.querySelector('.typewriter');
    const words = ["digital experiences.", "web applications.", "beautiful UIs.", "stunning aesthetics."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function type() {
        if(!typewriterElement) return;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeDelay = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 500;
        }

        setTimeout(type, typeDelay);
    }
    setTimeout(type, 1000);

    /* --- Form Submission Demo --- */
    const form = document.querySelector('.contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                btn.innerHTML = 'Sent! <i class="fas fa-check"></i>';
                btn.style.background = 'transparent';
                btn.style.color = '#00f0ff';
                btn.style.border = '2px solid #00f0ff';
                btn.style.boxShadow = 'none';
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.removeAttribute('style');
                }, 3000);
            }, 1500);
        });
    }

    /* --- Particles.js Initialization --- */
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#00f0ff" },
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": { "enable": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8b5cf6",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

});
