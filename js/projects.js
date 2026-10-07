// projects.js — projects listing page, tier tabs (alphabetical within each tier)
// Uses: sanity.js (getAllProjects), common.js helpers

const TIER_IDS = ['beginner', 'intermediate', 'advanced', 'pro']

function switchTier(tier, focus) {
  if (!TIER_IDS.includes(tier)) tier = 'beginner'
  TIER_IDS.forEach(id => {
    const tab = document.getElementById('tab-' + id)
    const on = id === tier
    tab.setAttribute('aria-selected', String(on))
    tab.tabIndex = on ? 0 : -1
    document.getElementById('panel-' + id).hidden = !on
  })
  try { history.replaceState(null, '', '#' + tier) } catch (e) {}
  if (focus) document.getElementById('tab-' + tier).focus()
}

function projectCard(p) {
  const thumb = img(p.thumbnail, 640)
  const tags = (p.skills || []).slice(0, 3)
  return `
    <a class="pcard" href="project.html?slug=${encodeURIComponent(p.slug.current)}">
      <div class="pc-media">
        ${thumb ? `<img src="${esc(thumb)}" alt="" loading="lazy">` : `<div class="pc-ph">${icon('wrench')}</div>`}
      </div>
      <div class="pc-body">
        <h3 class="pc-title">${esc(p.title)}</h3>
        ${p.description ? `<p class="pc-desc">${esc(p.description)}</p>` : ''}
        ${tags.length ? `<div class="badge-row">${tags.map(t => `<span class="badge badge-plain">${esc(tagLabel(t))}</span>`).join('')}</div>` : ''}
        <div class="pc-foot">
          ${p.estimatedCost ? `<span class="pc-cost">${esc(p.estimatedCost)}</span>` : '<span></span>'}
          <span class="link-more">View ${icon('arrow-right')}</span>
        </div>
      </div>
    </a>`
}

async function loadProjectsPage() {
  TIER_IDS.forEach((id, i) => {
    const tab = document.getElementById('tab-' + id)
    tab.addEventListener('click', () => switchTier(id))
    tab.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      switchTier(TIER_IDS[(i + (e.key === 'ArrowRight' ? 1 : TIER_IDS.length - 1)) % TIER_IDS.length], true)
    })
  })
  switchTier(location.hash.replace('#', ''))

  const projects = await getAllProjects()
  if (!projects) {
    TIER_IDS.forEach(id => {
      document.getElementById('grid-' + id).innerHTML =
        `<div class="state" style="grid-column:1/-1">Couldn't load projects. Check your connection and refresh.</div>`
    })
    return
  }
  const valid = projects.filter(p => p && p.slug && p.slug.current)
  TIER_IDS.forEach(id => {
    const list = valid.filter(p => p.tier === id).sort((a, b) => String(a.title).localeCompare(String(b.title)))
    document.getElementById('grid-' + id).innerHTML = list.length
      ? list.map(projectCard).join('')
      : `<div class="state" style="grid-column:1/-1">No ${id} projects yet. Check back soon.</div>`
  })
}

loadProjectsPage()
