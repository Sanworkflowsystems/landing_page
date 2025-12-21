document.addEventListener('DOMContentLoaded', () => {
    // Typewriter effect for hero heading
    const heroHeading = document.querySelector('#hero h1');
    if (heroHeading) {
        const fullText = heroHeading.innerHTML;
        heroHeading.innerHTML = '';
        heroHeading.style.opacity = '1';

        let charIndex = 0;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = fullText;
        const textContent = tempDiv.textContent;

        function typeWriter() {
            if (charIndex < textContent.length) {
                const currentHTML = fullText.substring(0, getHTMLIndex(charIndex + 1));
                heroHeading.innerHTML = currentHTML + '<span class="cursor-blink">|</span>';
                charIndex++;
                setTimeout(typeWriter, 50);
            } else {
                heroHeading.innerHTML = fullText;
            }
        }

        function getHTMLIndex(textIndex) {
            let count = 0;
            let htmlIndex = 0;
            let inTag = false;

            for (let i = 0; i < fullText.length; i++) {
                if (fullText[i] === '<') inTag = true;
                if (!inTag) count++;
                if (fullText[i] === '>') inTag = false;
                htmlIndex = i + 1;
                if (count >= textIndex) break;
            }
            return htmlIndex;
        }

        setTimeout(typeWriter, 500);
    }

    // Header border on scroll
    const header = document.getElementById('main-header');
    const hero = document.getElementById('hero');

    if (header && hero) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    header.classList.remove('border-b', 'border-glass-border');
                } else {
                    header.classList.add('border-b', 'border-glass-border');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(hero);
    }

    // Mobile menu (side drawer)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Optional: prevent body scroll when menu is open
            document.body.classList.toggle('overflow-hidden');
        });

        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    // Accessible FAQ Accordion
    document.querySelectorAll('.faq button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !expanded);
            const panel = document.getElementById(btn.getAttribute('aria-controls'));
            panel.hidden = expanded;
            // Optional: Close other FAQs
            if (!expanded) {
                document.querySelectorAll('.faq button').forEach(otherBtn => {
                    if (otherBtn !== btn) {
                        otherBtn.setAttribute('aria-expanded', 'false');
                        const otherPanel = document.getElementById(otherBtn.getAttribute('aria-controls'));
                        otherPanel.hidden = true;
                    }
                });
            }
        });
    });

    // Enhanced reveal-on-scroll with dynamic effects
    (function(){
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if(prefersReduced) {
        document.querySelectorAll('.reveal-up, .reveal-item').forEach(el => el.classList.add('revealed'));
        return;
      }
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      document.querySelectorAll('.reveal-up, .reveal-item').forEach(el => io.observe(el));
    })();

    // Staggered reveal with enhanced delays for card grids
    document.querySelectorAll('.cards-grid .reveal-up').forEach((el,i)=> {
        el.style.setProperty('--reveal-delay', `${i*0.15}s`);
    });
    document.querySelectorAll('.step-card').forEach((el,i)=> {
        el.style.setProperty('--reveal-delay', `${i*0.1}s`);
    });

    // Add parallax effect to cards on mouse move
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Clone logos for infinite scroll effect
    const marquee = document.querySelector('.logo-marquee');
    if(marquee){
      const logos = marquee.innerHTML;
      marquee.innerHTML = logos + logos;
    }

    // Add smooth scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add subtle parallax to hero section
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.getElementById('hero');
                if (hero && scrolled < window.innerHeight) {
                    hero.style.transform = `translateY(${scrolled * 0.4}px)`;
                    hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Optional: Add basic form validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Basic validation, can be expanded
            const email = contactForm.querySelector('input[type="email"]');
            if (!email.value || !email.value.includes('@')) {
                e.preventDefault();
                // TODO: Show an inline error message
                alert('Please enter a valid email address.');
            }
        });
    }

    // --- Runtime Sanitizers ---

    function removeEmDashesFromDOM() {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      const re = /[\u2014\u2013]|--/g;
      let node;
      while (node = walker.nextNode()) {
        if(node.parentElement && !['SCRIPT','STYLE'].includes(node.parentElement.tagName)) {
          node.nodeValue = node.nodeValue.replace(re, ' ');
        }
      }
    }

    function sanitizeTextNodes() {
      document.querySelectorAll('h1, h2, h3, p, a, li, span').forEach(el=>{
        if(el.children.length === 0) el.textContent = el.textContent.replace(/[\u2014\u2013]|--/g,' ');
      });
    }

    removeEmDashesFromDOM();
    sanitizeTextNodes();
});

