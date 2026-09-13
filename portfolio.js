(() => {
  const filters = document.querySelectorAll('[data-filter]');
  const projects = [...document.querySelectorAll('.project')];
  const count = document.querySelector('.result-count');
  function showProjects(filter) {
    let visible = 0;
    projects.forEach(project => {
      const show = filter === 'all' || project.dataset.tags.split(' ').includes(filter);
      project.hidden = !show;
      if (show) visible++;
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    count.textContent = `${visible} project${visible === 1 ? '' : 's'}`;
  }
  filters.forEach(button => button.addEventListener('click', () => showProjects(button.dataset.filter)));
  function revealHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (target?.classList.contains('project') && target.hidden) {
      showProjects('all');
      requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
    }
  }
  window.addEventListener('hashchange', revealHash);
  document.querySelectorAll('.desk-card').forEach(link => link.addEventListener('click', () => showProjects('all')));
  revealHash();
})();
