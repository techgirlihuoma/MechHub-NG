// resources.js — resources page, tabs by type (books / software / websites / videos)
// Uses: sanity.js (getAllResources), common.js helpers

const RES_TYPES = ['books', 'software', 'websites', 'videos']

function switchResourceTab(type, focus) {
  if (!RES_TYPES.includes(type)) type = 'books'
  RES_TYPES.forEach(id => {
    const tab = document.getElementById('tab-' + id)
    tab.setAttribute('aria-selected', String(id === type))
    tab.tabIndex = id === type ? 0 : -1
    document.getElementById('panel-' + id).hidden = id !== type
  })
  try { history.replaceState(null, '', '#' + type) } catch (e) {}
  if (focus) document.getElementById('tab-' + type).focus()
}

// Your Sanity `type` values may be singular/plural or worded differently
// (book, Books, video, youtube, website, tool...). Normalise them to our 4 tabs.
function resourceKind(r) {
  const t = String(r.type || '').toLowerCase().trim()
  if (/book|ebook|pdf|read/.test(t)) return 'books'
  if (/video|youtube|channel|watch/.test(t)) return 'videos'
  if (/soft|tool|app|program/.test(t)) return 'software'
  return 'websites'   // website, web, site, link, anything else
}

function resourceCard(r) {
  const href = /^https?:\/\//i.test(r.link || '') ? r.link : ''
  const tag = href ? 'a' : 'div'
  return `
    <${tag} class="res-card"${href ? ` href="${esc(href)}" target="_blank" rel="noopener"` : ''}>
      <div class="res-top"><h3 class="res-title">${esc(r.title)}</h3>${href ? `<span class="res-ext">${icon('external')}</span>` : ''}</div>
      <div class="badge-row">
        ${r.recommended ? '<span class="badge badge-pick">Recommended</span>' : ''}
        ${r.free ? '<span class="badge badge-free">Free</span>' : ''}
        ${r.pillar && PILLARS[r.pillar] ? `<span class="badge badge-${esc(r.pillar)}">${esc(r.pillar)}</span>` : ''}
        ${r.badge ? `<span class="badge badge-plain">${esc(r.badge)}</span>` : ''}
      </div>
      ${r.description ? `<p class="res-desc">${esc(r.description)}</p>` : ''}
    </${tag}>`
}

async function loadResourcesPage() {
  RES_TYPES.forEach((id, i) => {
    const tab = document.getElementById('tab-' + id)
    tab.addEventListener('click', () => switchResourceTab(id))
    tab.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      switchResourceTab(RES_TYPES[(i + (e.key === 'ArrowRight' ? 1 : RES_TYPES.length - 1)) % RES_TYPES.length], true)
    })
  })
  switchResourceTab(location.hash.replace('#', ''))

  const all = await getAllResources()
  if (!all) {
    document.getElementById('grid-books').innerHTML = `<div class="state" style="grid-column:1/-1">Couldn't load resources. Check your connection and refresh.</div>`
    return
  }
  RES_TYPES.forEach(type => {
    const list = all.filter(r => r && resourceKind(r) === type)
      .sort((a, b) => Number(!!b.recommended) - Number(!!a.recommended) || String(a.title).localeCompare(String(b.title)))
    document.getElementById('grid-' + type).innerHTML = list.length
      ? list.map(resourceCard).join('')
      : `<div class="state" style="grid-column:1/-1">Nothing here yet. Check back soon.</div>`
  })
}

loadResourcesPage()
