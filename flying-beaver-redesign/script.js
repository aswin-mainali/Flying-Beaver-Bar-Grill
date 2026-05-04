const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Highlight today's feature automatically.
const today = new Date().getDay();
document.querySelectorAll('[data-day]').forEach((card) => {
  if (Number(card.dataset.day) === today) card.classList.add('today');
});

// Small reveal animation.
const revealTargets = document.querySelectorAll('.story, .experience, .daily-features, .bottom-cta, .site-footer');
revealTargets.forEach((el) => el.classList.add('reveal'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.12 });
revealTargets.forEach((el) => observer.observe(el));

// Gallery lightbox.
const images = [
  'assets/harbour-air-view.png',
  'assets/cocktails-river.png',
  'assets/waterfront-dining.png',
  'assets/patio-atmosphere.png',
  'assets/interior-river.png',
  'assets/waterfront-building.png',
];
let currentIndex = 0;
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');
function showLightbox(index) {
  currentIndex = (index + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}
document.getElementById('openGallery')?.addEventListener('click', () => showLightbox(0));
document.querySelectorAll('.gallery-card img').forEach((img, index) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => showLightbox(index));
});
document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.getElementById('prevImage')?.addEventListener('click', () => showLightbox(currentIndex - 1));
document.getElementById('nextImage')?.addEventListener('click', () => showLightbox(currentIndex + 1));
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
  if (lightbox?.classList.contains('open') && event.key === 'ArrowRight') showLightbox(currentIndex + 1);
  if (lightbox?.classList.contains('open') && event.key === 'ArrowLeft') showLightbox(currentIndex - 1);
});
