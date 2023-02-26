function updateRoute(templateId) {
  const template = document.getElementById(templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(view); //skipping the cloining bit and just passing template.content here seems to work just fine
}

updateRoute('dashboard');