 // ─── SWITCH PILLAR TAB ────────────────────────────────────
function switchPillar(pillar, btn) {
  // update tab buttons
  document.querySelectorAll('.pillar-card').forEach(c => c.classList.remove('active'))
  btn.classList.add('active')

  // update panels
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
  document.getElementById('panel-' + pillar).classList.add('active')
}

// ─── RENDER COURSES ───────────────────────────────────────
function renderCourses(courses) {
  // clear all grids
  const grids = {
    mechanical: document.getElementById('grid-mechanical'),
    electronics: document.getElementById('grid-electronics'),
    programming: document.getElementById('grid-programming')
  }

  // empty grids
  Object.values(grids).forEach(grid => {
    if (grid) grid.innerHTML = ''
  })

  if (!courses || courses.length === 0) {
    Object.values(grids).forEach(grid => {
      if (grid) grid.innerHTML = '<div class="error-state">No courses found.</div>'
    })
    return
  }

  // sort courses into pillars
  courses.forEach(course => {
    const grid = grids[course.pillar]
    if (!grid) return

    const card = `
      <a class="course-card" href="course.html?slug=${course.slug.current}">
        <div class="course-card-num">${course.pillar.toUpperCase()} · ${course.level.toUpperCase()}</div>
        <div class="course-card-title">${course.title}</div>
        <div class="course-card-desc">${course.description}</div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge badge-${course.level}">${course.level}</span>
          ${course.duration ? `<span style="font-family:var(--mono);font-size:10px;color:var(--text3);">${course.duration}</span>` : ''}
          ${course.comingSoon ? `<span class="badge" style="background:rgba(255,214,10,0.1);color:var(--yellow);border:1px solid rgba(255,214,10,0.2);">Coming Soon</span>` : ''}
        </div>
      </a>
    `
    grid.innerHTML += card
  })

  // check for empty pillars
  Object.entries(grids).forEach(([pillar, grid]) => {
    if (grid && grid.innerHTML === '') {
      grid.innerHTML = `<div class="error-state">No ${pillar} courses yet — check back soon.</div>`
    }
  })
}

// ─── LOAD COURSES PAGE ────────────────────────────────────
async function loadCoursesPage() {
  const courses = await getAllCourses()
  renderCourses(courses)
}
