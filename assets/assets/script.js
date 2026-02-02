const projectsUrl = 'data/projects.json';
const projectsGrid = document.getElementById('projectsGrid');
const filterSelect = document.getElementById('filterSelect');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const themeToggle = document.getElementById('themeToggle');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

// theme
const userTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', userTheme);
themeToggle.textContent = userTheme === 'dark' ? '☀️' : '🌙';
themeToggle.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// load projects
let projects = [];
fetch(projectsUrl)
  .then(r => r.json())
  .then(data => {
    projects = data;
    populateFilter(data);
    renderProjects(data);
  })
  .catch(err => {
    projectsGrid.innerHTML = '<p>Failed to load projects.</p>';
    console.error(err);
  });

function populateFilter(list){
  const tags = new Set();
  list.forEach(p => p.tags.forEach(t => tags.add(t)));
  Array.from(tags).sort().forEach(tag => {
    const opt = document.createElement('option');
    opt.value = tag;
    opt.textContent = tag;
    filterSelect.appendChild(opt);
  });
}

function renderProjects(list){
  projectsGrid.innerHTML = '';
  if(list.length === 0){
    projectsGrid.innerHTML = '<p>No projects found.</p>';
    return;
  }
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.tabIndex = 0;
    card.setAttribute('role','button');
    card.innerHTML = `<h3>${p.title}</h3><p>${p.description}</p><div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`;
    card.addEventListener('click', () => openModal(p));
    card.addEventListener('keydown', (e) => { if(e.key === 'Enter') openModal(p); });
    projectsGrid.appendChild(card);
  });
}

function openModal(p){
  modalContent.innerHTML = `<h2>${p.title}</h2><p>${p.long || p.description}</p>
  ${p.link ? `<p><a href="${p.link}" target="_blank" rel="noopener">View project</a></p>` : ''}`;
  modal.showModal();
  modal.setAttribute('aria-hidden', 'false');
}

modalClose.addEventListener('click', () => {
  modal.close();
  modal.setAttribute('aria-hidden', 'true');
});
modal.addEventListener('cancel', (e) => {
  e.preventDefault(); modal.close(); modal.setAttribute('aria-hidden', 'true');
});

// filtering & search
filterSelect.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const tag = filterSelect.value;
  const filtered = projects.filter(p => {
    const matchesTag = tag ? p.tags.includes(tag) : true;
    const matchesQuery = q ? (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || (p.tags.join(' ').toLowerCase().includes(q))) : true;
    return matchesTag && matchesQuery;
  });
  renderProjects(filtered);
}
