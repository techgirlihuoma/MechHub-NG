 // ─── RENDER RESOURCES ─────────────────────────────────────
function renderResources(resources) {
  const grids = {
    book: document.getElementById('grid-books'),
    software: document.getElementById('grid-software'),
    website: document.getElementById('grid-websites'),
    video: document.getElementById('grid-videos')
  }

  // clear grids
  Object.values(grids).forEach(grid => {
    if (grid) grid.innerHTML = ''
  })

  if (!resources || resources.length === 0) {
    Object.values(grids).forEach(grid => {
      if (grid) grid.innerHTML = '<div class="error-state">No resources found.</div>'
    })
    return
  }

  resources.forEach(resource => {
    const grid = grids[resource.type]
    if (!grid) return

    const card = `
      <div class="resource-card">
        <div class="resource-badge">${resource.badge || resource.type}</div>
        <div class="resource-title">${resource.title}</div>
        <div class="resource-desc">${resource.description}</div>
        ${resource.link ? `
          <a href="${resource.link}" target="_blank" style="
            display:inline-flex;align-items:center;gap:6px;
            font-family:var(--mono);font-size:10px;
            letter-spacing:0.08em;text-transform:uppercase;
            color:var(--green);margin-top:12px;
            transition:opacity 0.2s;
          ">
            Visit Resource →
          </a>
        ` : ''}
        ${resource.recommended ? `
          <div style="
            display:inline-block;margin-top:8px;margin-left:8px;
            font-family:var(--mono);font-size:9px;
            letter-spacing:0.1em;text-transform:uppercase;
            padding:3px 8px;border-radius:20px;
            background:rgba(255,214,10,0.1);
            color:var(--yellow);
            border:1px solid rgba(255,214,10,0.2);
          ">★ Recommended</div>
        ` : ''}
      </div>
    `
    grid.innerHTML += card
  })

  // check for empty tabs
  Object.entries(grids).forEach(([type, grid]) => {
    if (grid && grid.innerHTML === '') {
      grid.innerHTML = `<div class="error-state">No ${type} resources yet — check back soon.</div>`
    }
  })
}

// ─── SWITCH RESOURCE TAB ──────────────────────────────────
function switchResourceTab(type, btn) {
  document.querySelectorAll('.res-tab').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')

  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
  document.getElementById('panel-' + type).classList.add('active')
}

// ─── LOAD RESOURCES PAGE ──────────────────────────────────
async function loadResourcesPage() {
  const resources = await getAllResources()
  renderResources(resources)
}
