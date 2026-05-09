const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const sections = document.querySelectorAll('main section[id]');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = document.body.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        document.body.classList.remove('menu-open');
        menuToggle?.setAttribute('aria-expanded', 'false');
    });
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section, .metrics, .contact-section').forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
});

const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }

        const id = entry.target.id;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    });
}, {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0
});

sections.forEach(section => activeObserver.observe(section));
