// Interactivity: filters, modal, skill animation, mobile nav, smooth scroll, certificates modal
document.addEventListener('DOMContentLoaded', () => {
  // year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '0.5rem';
    });
  }

  // PROJECT filtering
  const filters = document.getElementById('filters');
  const projectsGrid = document.getElementById('projectsGrid');
  if (filters && projectsGrid) {
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
  }

  // PROJECT modal details
  const modal = document.getElementById('modal');
  if (modal) {
    const modalTitle = document.getElementById('modalTitle');
    const modalImg = document.getElementById('modalImg');
    const modalDesc = document.getElementById('modalDesc');
    const modalLinks = document.getElementById('modalLinks');
    const modalClose = document.getElementById('modalClose');

    function openModal(title, imgSrc, desc, linksHtml){
      if (modalTitle) modalTitle.textContent = title;
      if (modalImg) modalImg.src = imgSrc || 'https://via.placeholder.com/800x400?text=Project';
      if (modalDesc) modalDesc.textContent = desc || '';
      if (modalLinks) modalLinks.innerHTML = linksHtml || '';
      modal.setAttribute('aria-hidden', 'false');
    }
    function closeModal(){ modal.setAttribute('aria-hidden', 'true'); }

    document.querySelectorAll('.details-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        const title = card.querySelector('h3').textContent;
        const img = card.querySelector('img').src;
        const desc = card.querySelector('p').textContent;
        const linksHtml = card.querySelector('.card-actions a') ? card.querySelector('.card-actions a').outerHTML : '';
        openModal(title, img, desc, linksHtml);
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // CERTIFICATES: filtering and modal
  const certFilters = document.getElementById('certFilters');
  const certGrid = document.getElementById('certGrid');
  if (certFilters && certGrid) {
    certFilters.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') return;
      [...certFilters.children].forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const type = e.target.dataset.filter;
      [...certGrid.children].forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Certificate modal
  const certModal = document.getElementById('certModal');
  if (certModal && certGrid) {
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalImg = document.getElementById('certModalImg');
    const certModalMeta = document.getElementById('certModalMeta');
    const certModalActions = document.getElementById('certModalActions');
    const certModalClose = document.getElementById('certModalClose');

    function openCertModal(title, imgSrc, metaText, pdfUrl){
      if (certModalTitle) certModalTitle.textContent = title;
      if (certModalImg) { certModalImg.src = imgSrc || ''; certModalImg.alt = title || ''; }
      if (certModalMeta) certModalMeta.textContent = metaText || '';
      if (certModalActions) {
        certModalActions.innerHTML = `
          <a class="btn" href="${pdfUrl || '#'}" target="_blank" rel="noopener">Open</a>
          <a class="btn outline" href="${pdfUrl || '#'}" download>Download</a>
        `;
      }
      certModal.setAttribute('aria-hidden', 'false');
    }
    function closeCertModal(){ certModal.setAttribute('aria-hidden', 'true'); }

    // attach view handlers for certificates
    certGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="view-cert"]');
      if (!btn) return;
      const card = btn.closest('.cert-card');
      if (!card) return;
      const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
      const img = card.querySelector('img') ? card.querySelector('img').src : '';
      const meta = card.querySelector('.muted-sm') ? card.querySelector('.muted-sm').textContent : '';
      const pdf = card.dataset.pdf || '';
      openCertModal(title, img, meta, pdf);
    });

    if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  // animate skill bars when visible
  const skillBars = document.querySelectorAll('.skill-bar');
  if (skillBars && skillBars.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const level = el.dataset.level || 60;
          const fill = el.querySelector('.fill');
          if (fill) fill.style.width = `${level}%`;
          io.unobserve(el);
        }
      });
    }, {threshold: 0.3});
    skillBars.forEach(b => io.observe(b));
  }

  // smooth scroll for nav links
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      document.getElementById(id).scrollIntoView({behavior:'smooth', block:'start'});
      if (window.innerWidth < 640) nav.style.display = '';
    });
  });

  // keyboard: close modals with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal.getAttribute('aria-hidden') === 'false') closeModal();
      if (certModal.getAttribute('aria-hidden') === 'false') closeCertModal();
    }
  });
});
