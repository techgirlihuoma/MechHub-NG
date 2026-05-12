 // ─── RENDER PROJECTS ──────────────────────────────────────
function renderProjects(projects) {
  const grids = {
    beginner: document.getElementById('grid-beginner'),
    intermediate: document.getElementById('grid-intermediate'),
    advanced: document.getElementById('grid-advanced'),
    pro: document.getElementById('grid-pro')
  }

  const thumbBg = {
    beginner: '#0a1f12',
    intermediate: '#1f160a',
    advanced: '#0a121f',
    pro: '#1a0a1f'
  }

  // clear grids
  Object.values(grids).forEach(grid => {
    if (grid) grid.innerHTML = ''
  })

  if (!projects || projects.length === 0) {
    Object.values(grids).forEach(grid => {
      if (grid) grid.innerHTML = '<div class="error-state">No projects found.</div>'
    })
    return
  }

  projects.forEach(project => {
    const grid = grids[project.tier]
    if (!grid) return

    const card = `
      <a class="project-card" href="project.html?slug=${project.slug.current}">
        <div class="project-thumb" style="background:${thumbBg[project.tier]};">
          ${project.emoji || '🔧'}
        </div>
        <div class="project-body">
          <div class="project-card-title">${project.title}</div>
          <div class="project-card-desc">${project.description}</div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="project-cost">// Est. Cost: ${project.estimatedCost || 'TBC'}</span>
            <span class="badge badge-${project.tier}">${project.tier}</span>
          </div>
        </div>
      </a>
    `
    grid.innerHTML += card
  })

  // check for empty tiers
  Object.entries(grids).forEach(([tier, grid]) => {
    if (grid && grid.innerHTML === '') {
      grid.innerHTML = `<div class="error-state">No ${tier} projects yet — check back soon.</div>`
    }
  })
}

// ─── SWITCH TIER TAB ──────────────────────────────────────
function switchTier(tier, btn) {
  document.querySelectorAll('.tier-tab').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')

  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
  document.getElementById('panel-' + tier).classList.add('active')
}

// ─── LOAD PROJECTS PAGE ───────────────────────────────────
async function loadProjectsPage() {
  const projects = await getAllProjects()
  renderProjects(projects)
}
