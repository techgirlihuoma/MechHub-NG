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

  modal.classList.add('open')

  // reset modal content
  document.getElementById('modal-eye').textContent = ''
  document.getElementById('modal-title').textContent = 'Loading...'
  document.getElementById('modal-sector').textContent = ''
  document.getElementById('m-what').innerHTML = ''
  document.getElementById('m-day').innerHTML = ''
  document.getElementById('m-where').innerHTML = ''
  document.getElementById('m-path').innerHTML = ''
  document.getElementById('m-salary').innerHTML = ''

  const career = await getCareer(slug)

  if (!career) {
    document.getElementById('modal-title').textContent = 'Error loading career'
    return
  }

  // header
  document.getElementById('modal-eye').textContent = career.sector || ''
  document.getElementById('modal-title').textContent = career.title
  document.getElementById('modal-sector').textContent = career.sector || ''

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
      .map(item => `<li>${item}</li>`)
      .join('')
  }

  // where you work
  const whereList = document.getElementById('m-where')
  if (career.whereYouWork && career.whereYouWork.length > 0) {
    whereList.innerHTML = career.whereYouWork
      .map(item => `<li>${item}</li>`)
      .join('')
  }

  // learning path — linked courses
  const pathList = document.getElementById('m-path')
  if (career.learningPath && career.learningPath.length > 0) {
    pathList.innerHTML = career.learningPath
      .map((course, i) => `
        <li>
          <strong style="color:var(--green);font-family:var(--mono);">${i + 1}.</strong>
          <a href="course.html?slug=${course.slug.current}"
            style="color:var(--text);text-decoration:none;transition:color 0.2s;"
            onmouseover="this.style.color='var(--green)'"
            onmouseout="this.style.color='var(--text)'">
            ${course.title}
          </a>
          <span style="color:var(--text3);font-size:11px;font-family:var(--mono);"> — ${course.level}</span>
        </li>
      `).join('')
  }

  // salary range
  const salaryEl = document.getElementById('m-salary')
  if (career.salaryRange) {
    const { entry, mid, senior } = career.salaryRange
    salaryEl.innerHTML = `
      <div style="
        display:flex;gap:0;
        border:1px solid var(--border);
        border-radius:var(--radius);
        overflow:hidden;
      ">
        ${entry ? `
          <div style="flex:1;padding:12px 14px;border-right:1px solid var(--border);background:var(--bg3);">
            <div style="font-family:var(--mono);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text3);margin-bottom:4px;">Entry</div>
            <div style="font-size:12px;color:var(--text);">${entry}</div>
          </div>
        ` : ''}
        ${mid ? `
          <div style="flex:1;padding:12px 14px;border-right:1px solid var(--border);background:var(--bg3);">
            <div style="font-family:var(--mono);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text3);margin-bottom:4px;">Mid</div>
            <div style="font-size:12px;color:var(--text);">${mid}</div>
          </div>
        ` : ''}
        ${senior ? `
          <div style="flex:1;padding:12px 14px;background:var(--bg3);">
            <div style="font-family:var(--mono);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text3);margin-bottom:4px;">Senior</div>
            <div style="font-size:12px;color:var(--text);">${senior}</div>
          </div>
        ` : ''}
      </div>
    `
  }

  // youtube button
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