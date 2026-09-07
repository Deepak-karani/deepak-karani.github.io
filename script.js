const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
const emptyState = document.querySelector('.empty-state');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const selected = button.dataset.filter;
    let visible = 0;

    projects.forEach((project) => {
      const matches = selected === 'all' || project.dataset.tags.split(' ').includes(selected);
      project.hidden = !matches;
      if (matches) visible += 1;
    });

    emptyState.hidden = visible !== 0;
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.project-card, .hardware-card').forEach((card) => observer.observe(card));
