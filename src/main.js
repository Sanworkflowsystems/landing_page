document.addEventListener('DOMContentLoaded', () => {
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

    // Reveal-on-scroll for .reveal-up and .reveal-item elements
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
      }, { threshold: 0.12 });
      document.querySelectorAll('.reveal-up, .reveal-item').forEach(el => io.observe(el));
    })();

    // Staggered reveal for card grids
    document.querySelectorAll('.cards-grid .reveal-up').forEach((el,i)=> el.style.setProperty('--reveal-delay', `${i*0.1}s`));
    document.querySelectorAll('.step-card').forEach((el,i)=> el.style.setProperty('--reveal-delay', `${i*0.08}s`));

    // Clone logos for infinite scroll effect
    const marquee = document.querySelector('.logo-marquee');
    if(marquee){
      const logos = marquee.innerHTML;
      marquee.innerHTML = logos + logos;
    }

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

