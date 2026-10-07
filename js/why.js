// why.js — team carousel from siteSettings.teamMembers
// Uses: sanity.js (getSiteSettings), common.js helpers

function scrollTeam(dir) {
  document.getElementById('team-carousel').scrollBy({ left: dir * 296, behavior: 'smooth' })
}

const safeUrl = u => /^https?:\/\//i.test(u || '') ? u : ''

function teamCard(m) {
  const photo = img(m.photo, 200)
  const l = m.links || {}
  const links = [['LinkedIn', l.linkedin], ['X', l.twitter], ['GitHub', l.github]].filter(x => safeUrl(x[1]))
  return `
    <article class="team-card">
      ${photo ? `<img class="team-photo" src="${esc(photo)}" alt="${esc(m.name)}">` : `<div class="team-initials">${esc(m.initials || (m.name || '?').slice(0, 2).toUpperCase())}</div>`}
      <h3>${esc(m.name)}</h3>
      ${m.role ? `<div class="team-role">${esc(m.role)}</div>` : ''}
      ${m.school ? `<div class="team-school">${esc(m.school)}</div>` : ''}
      ${m.bio ? `<p>${esc(m.bio)}</p>` : ''}
      ${links.length ? `<div class="team-links">${links.map(x => `<a href="${esc(safeUrl(x[1]))}" target="_blank" rel="noopener">${x[0]}</a>`).join('')}</div>` : ''}
    </article>`
}

async function loadTeam() {
  const track = document.getElementById('team-carousel')
  const s = await getSiteSettings()
  const members = ((s && s.teamMembers) || []).filter(m => m && m.name)
  if (!members.length) {
    track.innerHTML = '<div class="state" style="width:100%">Team info coming soon.</div>'
    document.querySelector('.team-nav').hidden = true
    return
  }
  track.innerHTML = members.map(teamCard).join('')
}

loadTeam()
