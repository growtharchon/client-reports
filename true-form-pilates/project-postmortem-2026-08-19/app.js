const filterButtons = document.querySelectorAll('[data-filter]');
const timelineItems = document.querySelectorAll('[data-kind]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    timelineItems.forEach((item) => {
      item.hidden = filter !== 'all' && item.dataset.kind !== filter;
    });
  });
});

document.querySelector('[data-print]')?.addEventListener('click', () => window.print());

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { rootMargin: '-20% 0px -65%', threshold: [0.05, 0.25, 0.5] });

sections.forEach((section) => observer.observe(section));
