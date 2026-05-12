 // ─── RENDER CAREER CARDS ──────────────────────────────────
function renderCareers(careers) {
  const grid = document.getElementById('career-grid')
  if (!grid) return

  if (!careers || careers.length === 0) {
    grid.innerHTML = '<div class="error-state">No careers found.</div>'
    return
  }

  grid.innerHTML = careers.map(career => `
    <div class="career-card" onclick="openCareerModal('${career.slug.current}')">
      <span class="cc-icon">${career.emoji || '⚙️'}</span>
      <div class="cc-title">${career.title}</div>
      <div class="cc-sub">${career.shortDescription}</div>
      <span class="cc-tag">${career.tag || ''}</span>
      <div class="cc-arrow">↗</div>
    </div>
  `).join('')
}

// ─── OPEN CAREER MODAL ────────────────────────────────────
async function openCareerModal(slug) {
  const modal = document.getElementById('career-modal')
  if (!modal) return

  // show modal with loading state
  modal.classList.add('open')
  document.getElementById('modal-title').textContent = 'Loading...'
  document.getElementById('modal-eye').textContent = ''
  document.getElementById('modal-sector').textContent = ''
  document.getElementById('m-what').innerHTML = ''
  document.getElementById('m-day').innerHTML = ''
  document.getElementById('m-where').innerHTML = ''
  document.getElementById('m-path').innerHTML = ''

  // fetch full career data
  const career = await getCareer(slug)

  if (!career) {
    document.getElementById('modal-title').textContent = 'Error loading career'
    return
  }

  // populate modal
  document.getElementById('modal-eye').textContent = career.eye || career.sector
  document.getElementById('modal-title').textContent = career.title
  document.getElementById('modal-sector').textContent = career.sector

  // what you do
  const whatList = document.getElementById('m-what')
  if (career.whatYouDo && career.whatYouDo.length > 0) {
    whatList.innerHTML = career.whatYouDo
      .map(item => `<li>${item}</li>`)
      .join('')
  }

  // day to day
  const dayList = document.getElementById('m-day')
  if (career.dayToDay && career.dayToDay.length > 0) {
    dayList.innerHTML = career.dayToDay
      .map(entry => `<li><strong>${entry.time}:</strong> ${entry.task}</li>`)
      .join('')
  }

  // where you work
  const whereList = document.getElementById('m-where')
  if (career.whereYouWork && career.whereYouWork.length > 0) {
    whereList.innerHTML = career.whereYouWork
      .map(w => `<li><strong>${w.company}</strong> — ${w.context}</li>`)
      .join('')
  }

  // learning path
  const pathList = document.getElementById('m-path')
  if (career.learningPath && career.learningPath.length > 0) {
    pathList.innerHTML = career.learningPath
      .map(step => `<li><strong>${step.stage}:</strong> ${step.description}</li>`)
      .join('')
  }

  // salary range
  const salarySection = document.getElementById('m-salary')
  if (salarySection && career.salaryRange) {
    salarySection.innerHTML = `
      <div class="salary-grid">
        <div class="salary-item">
          <div class="salary-label">Entry</div>
          <div class="salary-value">${career.salaryRange.entry || 'N/A'}</div>
        </div>
        <div class="salary-item">
          <div class="salary-label">Mid</div>
          <div class="salary-value">${career.salaryRange.mid || 'N/A'}</div>
        </div>
        <div class="salary-item">
          <div class="salary-label">Senior</div>
          <div class="salary-value">${career.salaryRange.senior || 'N/A'}</div>
        </div>
      </div>
    `
  }

  // youtube link
  const ytBtn = document.getElementById('m-yt')
  if (ytBtn && career.videoUrl) {
    ytBtn.href = career.videoUrl
    ytBtn.style.display = 'inline-flex'
  } else if (ytBtn) {
    ytBtn.style.display = 'none'
  }

  // full career page link
  const fullLink = document.getElementById('m-full-link')
  if (fullLink) {
    fullLink.href = `career.html?slug=${slug}`
  }
}

// ─── CLOSE MODAL ──────────────────────────────────────────
function closeCareerModal(e) {
  if (e.target.id === 'career-modal') {
    document.getElementById('career-modal').classList.remove('open')
  }
}

function closeModal() {
  const modal = document.getElementById('career-modal')
  if (modal) modal.classList.remove('open')
}

// close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal()
})

