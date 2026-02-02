// Interactivity: filters, modal, skill animation, mobile nav, smooth scroll
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '0.5rem';
  });

  // filtering
  const filters = document.getElementById('filters');
  const projectsGrid = document.getElementById('projectsGrid');
  filters.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    [...filters.children].forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    const type = e.target.dataset.filter;
    [...projectsGrid.children].forEach(card => {
      if (type === 'all' || card.dataset.type === type) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // modal details
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');
  const modalLinks = document.getElementById('modalLinks');
  const modalClose = document.getElementById('modalClose');

  function openModal(title, imgSrc, desc, linksHtml){
    modalTitle.textContent = title;
    modalImg.src = imgSrc || 'https://via.placeholder.com/800x400?text=Project';
    modalDesc.textContent = desc || '';
    modalLinks.innerHTML = linksHtml || '';
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal(){ modal.setAttribute('aria-hidden', 'true'); }

  document.querySelectorAll('.details-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      const title = card.querySelector('h3').textContent;
      const img = card.querySelector('img').src;
      const desc = card.querySelector('p').textContent;
      const linksHtml = card.querySelector('.card-actions a') ? card.querySelector('.card-actions a').outerHTML : '';
      openModal(title, img, desc, linksHtml);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // animate skill bars when visible
  const skillBars = document.querySelectorAll('.skill-bar');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const level = el.dataset.level || 60;
        el.querySelector('.fill').style.width = `${level}%`;
        io.unobserve(el);
      }
    });
  }, {threshold: 0.3});
  skillBars.forEach(b => io.observe(b));

  // smooth scroll for nav links
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      document.getElementById(id).scrollIntoView({behavior:'smooth', block:'start'});
      if (window.innerWidth < 640) nav.style.display = ''; // hide mobile nav after click
    });
  });
});
