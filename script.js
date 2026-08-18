const navToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
}

navToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

const updateActiveNavLink = (id) => {
    document.querySelectorAll('.nav-links a').forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
    });
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle?.setAttribute('aria-expanded', 'false');
        }

        updateActiveNavLink(target.id);
    });
});

const sectionObserver = new IntersectionObserver(
    (entries) => {
        const visibleSection = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
            updateActiveNavLink(visibleSection.target.id);
        }
    },
    {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.2, 0.4, 0.7]
    }
);

document.querySelectorAll('main section[id]').forEach((section) => {
    sectionObserver.observe(section);
});

themeToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
});

const cardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('.section, .project-card, .skill-card').forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(element);
});

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thanks for reaching out! Your message has been captured.');
    event.target.reset();
});
