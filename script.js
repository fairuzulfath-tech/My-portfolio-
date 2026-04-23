const cursor = document.getElementById('cursor');
        const ring = document.getElementById('cursor-ring');
        let mx = 0, my = 0, rx = 0, ry = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        function animCursor() {
            cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
            rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
            ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
            requestAnimationFrame(animCursor);
        }
        animCursor();
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => { ring.style.width = '54px'; ring.style.height = '54px'; });
            el.addEventListener('mouseleave', () => { ring.style.width = '34px'; ring.style.height = '34px'; });
        });

        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 60); });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.12 });
        document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

        const skillsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.tag').forEach((tag, i) => {
                        tag.style.opacity = '0'; tag.style.transform = 'translateY(8px)';
                        setTimeout(() => {
                            tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            tag.style.opacity = '1'; tag.style.transform = 'translateY(0)';
                        }, i * 45);
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        document.querySelectorAll('.skills-grid').forEach(el => skillsObserver.observe(el));
