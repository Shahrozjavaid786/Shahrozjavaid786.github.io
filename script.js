const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const links = [...document.querySelectorAll('.nav-links a')];

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});

links.forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const updateNavigation = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  const marker = window.scrollY + 130;
  document.querySelectorAll('main section[id]').forEach(section => {
    if (section.offsetTop <= marker && section.offsetTop + section.offsetHeight > marker) {
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`));
    }
  });
};
window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(item => reveal.observe(item));
document.querySelector('#year').textContent = new Date().getFullYear();
