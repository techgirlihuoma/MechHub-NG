// ═══════════════════════════════════════════════════════════
// home.js — homepage data + rendering (uses sanity.js helpers:
//   sanityFetch, imageUrl, getSiteSettings, getAllCourses,
//   getAllCareers, getFeaturedProject, getFeaturedBuild)
// ═══════════════════════════════════════════════════════════

// ─── HELPERS ─────────────────────────────────────────────────
function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

// Sanity CDN resizes on the fly: ?w=… keeps cards light on slow connections
function img(source, width) {
  const url = imageUrl(source)
  return url ? `${url}?w=${width}&auto=format` : null
}

const TAG_LABELS = {
  mechanical: 'Mechanical Design', electronics: 'Electronics', programming: 'Programming',
  cad: 'CAD', pcb: 'PCB Design', arduino: 'Arduino', ros: 'ROS'
}
const tagLabel = t => TAG_LABELS[t] || t

const PILLAR_ICON = { mechanical: 'gear', electronics: 'chip', programming: 'code' }

// Career cards use line icons; pick one from the title/sector,
// fall back to a gear. (The old emoji field is not used here.)
function careerIcon(career) {
  const text = `${career.title || ''} ${career.sector || ''}`.toLowerCase()
  if (/robot/.test(text)) return 'robot'
  if (/embedded|firmware|software/.test(text)) return 'code'
  if (/control|plc|instrument/.test(text)) return 'chip'
  if (/automation|process|industrial/.test(text)) return 'chart'
  if (/design|product|cad/.test(text)) return 'box'
  return 'gear'
}

// ─── SETTINGS (hero, mission, quiz CTA, announcement) ────────
function applySettings(settings) {
  if (!settings) return

  if (settings.heroHeadline) {
    const lines = settings.heroHeadline.split('\n').map(s => s.trim()).filter(Boolean)
    document.getElementById('hero-headline').innerHTML = lines
      .map((line, i) => i === lines.length - 1 && lines.length > 1
        ? `<span class="hl">${esc(line)}</span>` : esc(line))
      .join('<br>')
  }
  if (settings.heroSubtext) document.getElementById('hero-subtext').textContent = settings.heroSubtext
  if (settings.goalStatement) document.getElementById('goal-statement').textContent = settings.goalStatement
  if (settings.quizCtaTitle) document.getElementById('quiz-cta-title').textContent = settings.quizCtaTitle
  if (settings.quizCtaSubtext) document.getElementById('quiz-cta-sub').textContent = settings.quizCtaSubtext
  if (settings.announcementBar) {
    const bar = document.getElementById('announce')
    bar.textContent = settings.announcementBar
    bar.hidden = false
  }
}

// ─── COURSES CAROUSEL ────────────────────────────────────────
function courseCard(c) {
  const thumb = img(c.thumbnail, 520)
  const media = thumb
    ? `<img src="${thumb}" alt="" loading="lazy">`
    : `<div class="cc-ph ${esc(c.pillar)}">${icon(PILLAR_ICON[c.pillar] || 'gear')}</div>`

  return `
    <a class="course-card" href="course.html?slug=${encodeURIComponent(c.slug.current)}">
      <div class="cc-media">
        ${media}
        <span class="badge badge-${esc(c.level)} cc-level">${esc(c.level)}</span>
      </div>
      <div class="cc-body">
        <div class="cc-title">${esc(c.title)}</div>
        <div class="cc-desc">${esc(c.description)}</div>
        <div class="cc-foot">
          <span class="badge badge-${esc(c.pillar)}">${esc(c.pillar)}</span>
          ${c.comingSoon
            ? '<span class="badge badge-soon">Coming soon</span>'
            : (c.duration ? `<span class="cc-dur">${icon('clock')} ${esc(c.duration)}</span>` : '')}
        </div>
      </div>
    </a>`
}

function renderCourses(courses) {
  const track = document.getElementById('course-track')
  if (!courses || courses.length === 0) {
    track.innerHTML = '<div class="state">No courses yet. <a href="courses.html">Browse the course page</a> to check again later.</div>'
    document.querySelectorAll('.car-btn').forEach(b => b.style.display = 'none')
    return
  }
  // live courses first, "coming soon" last
  const sorted = [...courses].sort((a, b) => Number(!!a.comingSoon) - Number(!!b.comingSoon))
  track.innerHTML = sorted.map(courseCard).join('')
  track.addEventListener('scroll', syncCarouselArrows, { passive: true })
  window.addEventListener('resize', syncCarouselArrows)
  syncCarouselArrows()
}

function scrollCourses(dir) {
  const track = document.getElementById('course-track')
  track.scrollBy({ left: dir * Math.max(track.clientWidth * 0.8, 260), behavior: 'smooth' })
}

// hide an arrow when there is nothing further to scroll to
function syncCarouselArrows() {
  const track = document.getElementById('course-track')
  const prev = document.querySelector('.car-btn.prev')
  const next = document.querySelector('.car-btn.next')
  const max = track.scrollWidth - track.clientWidth
  prev.hidden = track.scrollLeft < 8
  next.hidden = track.scrollLeft > max - 8
}

// ─── CAREERS ─────────────────────────────────────────────────
function renderCareers(careers) {
  const grid = document.getElementById('career-grid')
  if (!careers || careers.length === 0) {
    grid.innerHTML = '<div class="state">Career guides are on the way.</div>'
    return
  }
  grid.innerHTML = careers.slice(0, 6).map(c => `
    <a class="career-card" href="career.html?slug=${encodeURIComponent(c.slug.current)}">
      ${icon(careerIcon(c), 'cr-ico')}
      <div class="cr-body">
        <div class="cr-title">${esc(c.title)}</div>
        <div class="cr-desc">${esc(c.shortDescription || c.sector || '')}</div>
        <div class="cr-foot">
          ${c.tag ? `<span class="badge badge-advanced">${esc(c.tag)}</span>` : '<span></span>'}
          ${icon('arrow-right', 'cr-go')}
        </div>
      </div>
    </a>`).join('')
}

// ─── FEATURED PROJECT + BUILD OF THE WEEK ────────────────────
function featuredProjectCard(p) {
  const thumb = img(p.thumbnail, 480)
  const media = thumb
    ? `<img src="${thumb}" alt="${esc(p.title)}" loading="lazy">`
    : `<div class="feature-ph">${icon('layers')}</div>`
  const tags = (p.skills || []).map(t => `<span class="badge badge-plain">${esc(tagLabel(t))}</span>`).join('')

  return `
    <article class="feature">
      <div class="feature-label">Featured Project</div>
      <div class="feature-body">
        <div class="feature-media">${media}</div>
        <div>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.description)}</p>
          <div class="badge-row">
            <span class="badge badge-${esc(p.tier)}">${esc(p.tier)}</span>${tags}
          </div>
          ${p.estimatedCost ? `<div class="feature-cost">Est. cost ${esc(p.estimatedCost)}</div>` : ''}
          <a class="link-more" href="project.html?slug=${encodeURIComponent(p.slug.current)}">View project ${icon('arrow-right')}</a>
        </div>
      </div>
    </article>`
}

function featuredBuildCard(b) {
  const thumb = img(b.photos && b.photos[0], 480)
  const media = thumb
    ? `<img src="${thumb}" alt="${esc(b.title)}" loading="lazy">`
    : `<div class="feature-ph initials">${esc(b.authorInitials || '')}</div>`
  const byline = [b.authorSchool, b.authorLevel].filter(Boolean).map(esc).join(' · ')
  const tags = (b.skills || []).map(t => `<span class="badge badge-plain">${esc(tagLabel(t))}</span>`).join('')

  return `
    <article class="feature">
      <div class="feature-label">Build of the Week</div>
      <div class="feature-body">
        <div class="feature-media">${media}</div>
        <div>
          <h3>${esc(b.title)}</h3>
          <p>${esc(b.description)}</p>
          <div class="feature-by">
            <span class="avatar">${esc(b.authorInitials || '')}</span>
            <span>By ${esc(b.authorName)}${byline ? ' · ' + byline : ''}</span>
          </div>
          <div class="badge-row">
            ${b.tier ? `<span class="badge badge-${esc(b.tier)}">${esc(b.tier)}</span>` : ''}${tags}
          </div>
          <a class="link-more" href="build.html?slug=${encodeURIComponent(b.slug.current)}">See build ${icon('arrow-right')}</a>
        </div>
      </div>
    </article>`
}

function renderFeatured(project, build) {
  const parts = []
  if (project) parts.push(featuredProjectCard(project))
  if (build) parts.push(featuredBuildCard(build))
  const section = document.getElementById('featured-section')
  if (parts.length === 0) { section.remove(); return }
  document.getElementById('featured-grid').innerHTML = parts.join('')
}

// ─── GROWTH LOOP (static content from the original site) ─────
const LOOP_STEPS = [
  { icon: 'book', title: 'Learn theory', desc: 'Understand the why: the physics, maths and concepts behind it.' },
  { icon: 'wrench', title: 'Try hands-on', desc: 'Wire it, print it, flash the firmware. Run the code.' },
  { icon: 'bolt', title: 'Get excited', desc: 'The motor spins. The sensor reads. Use that as fuel.' },
  { icon: 'search', title: 'Discover why', desc: 'Now the textbook makes sense. Go back and see why it worked.' },
  { icon: 'layers', title: 'Build it big', desc: 'Take on a real project you would want to show or use.' },
  { icon: 'alert', title: 'Hit problems', desc: 'It breaks. You debug and ask. This is where engineers are made.' },
  { icon: 'rocket', title: 'Repeat', desc: 'Same loop, harder problems, sharper instincts. You are one level up.' }
]

function renderLoop() {
  document.getElementById('loop').innerHTML = LOOP_STEPS.map((s, i) => `
    <div class="loop-step">
      <span class="loop-n">${i + 1}</span>
      ${icon(s.icon)}
      <div class="loop-t">${s.title}</div>
      <div class="loop-d">${s.desc}</div>
      ${icon('arrow-right', 'loop-next')}
    </div>`).join('')
}

// ─── HERO ORBIT ──────────────────────────────────────────────
function renderOrbit() {
  const nodes = ['chip', 'code', 'gear', 'users', 'book', 'robot']
  document.getElementById('orbit-nodes').innerHTML = nodes
    .map((n, i) => `<span class="orbit-node" style="--a:${i * 60}deg">${icon(n)}</span>`)
    .join('')
}

// ─── LOAD ────────────────────────────────────────────────────
async function loadHomePage() {
  renderLoop()
  renderOrbit()

  const [settings, courses, careers, project, build] = await Promise.all([
    getSiteSettings(), getAllCourses(), getAllCareers(), getFeaturedProject(), getFeaturedBuild()
  ])

  applySettings(settings)
  renderCourses(courses)
  renderCareers(careers)
  renderFeatured(project, build)
}

loadHomePage()
