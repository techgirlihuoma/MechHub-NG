// courses.js — courses listing page, pillar tabs
// Uses: sanity.js (getAllCourses), common.js (courseCard, sortCourses, esc)

const PILLAR_IDS = ['mechanical', 'electronics', 'programming']

function switchPillar(pillar, focus) {
  if (!PILLAR_IDS.includes(pillar)) pillar = 'mechanical'
  PILLAR_IDS.forEach(id => {
    const tab = document.getElementById('tab-' + id)
    const panel = document.getElementById('panel-' + id)
    const on = id === pillar
    tab.setAttribute('aria-selected', String(on))
    tab.tabIndex = on ? 0 : -1
    panel.hidden = !on
  })
  try { history.replaceState(null, '', '#' + pillar) } catch (e) {}
  if (focus) document.getElementById('tab-' + pillar).focus()
}

function renderPillarGrid(pillar, courses) {
  const grid = document.getElementById('grid-' + pillar)
  const list = sortCourses(courses.filter(c => c.pillar === pillar))
  grid.innerHTML = list.length
    ? list.map(courseCard).join('')
    : `<div class="state" style="grid-column:1/-1">Courses for this pillar are on the way.</div>`
}

async function loadCoursesPage() {
  // tabs
  PILLAR_IDS.forEach((id, i) => {
    const tab = document.getElementById('tab-' + id)
    tab.addEventListener('click', () => switchPillar(id))
    tab.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      const next = PILLAR_IDS[(i + (e.key === 'ArrowRight' ? 1 : PILLAR_IDS.length - 1)) % PILLAR_IDS.length]
      switchPillar(next, true)
    })
  })
  switchPillar(location.hash.replace('#', ''))

  const courses = await getAllCourses()
  if (!courses) {
    PILLAR_IDS.forEach(id => {
      document.getElementById('grid-' + id).innerHTML =
        `<div class="state" style="grid-column:1/-1">Couldn't load courses. Check your connection and refresh.</div>`
    })
    return
  }
  const valid = courses.filter(c => c && c.slug && c.slug.current)
  PILLAR_IDS.forEach(id => renderPillarGrid(id, valid))
}

loadCoursesPage()
