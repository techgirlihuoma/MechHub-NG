// community.js — builds grid on community.html
// Uses: sanity.js (getAllBuilds), common.js helpers

function buildCard(b) {
  const photo = (b.photos || []).map(p => img(p, 640)).find(Boolean)
  const where = [b.authorLevel, b.authorSchool].filter(Boolean).join(' · ')
  return `
    <a class="pcard" href="build.html?slug=${esc(b.slug.current)}">
      <div class="pc-media">
        ${photo ? `<img src="${esc(photo)}" alt="" loading="lazy">` : `<div class="pc-ph">${icon('wrench')}</div>`}
        ${b.tier ? `<span class="badge badge-${esc(b.tier)}">${esc(b.tier)}</span>` : ''}
      </div>
      <div class="pc-body">
        <h3 class="pc-title">${esc(b.title)}</h3>
        ${b.description ? `<p class="pc-desc">${esc(b.description)}</p>` : ''}
        <div class="pc-foot">
          <div class="pc-by">
            <span class="avatar">${esc(b.authorInitials || '?')}</span>
            <div>${esc(b.authorName || 'MechHub student')}${where ? `<small>${esc(where)}</small>` : ''}</div>
          </div>
        </div>
      </div>
    </a>`
}

async function loadCommunityPage() {
  const grid = document.getElementById('builds-grid')
  const empty = document.getElementById('empty-builds')
  const builds = await getAllBuilds()
  const list = (builds || []).filter(b => b && b.slug && b.slug.current)

  if (!list.length) {
    grid.hidden = true
    empty.hidden = false
    return
  }
  grid.innerHTML = list.map(buildCard).join('')
}

loadCommunityPage()
