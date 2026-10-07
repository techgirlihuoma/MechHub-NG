// lesson.js — lesson page: outline | notes | info + prev/next
// Uses: sanity.js (getLesson, getCourse, getSiteSettings, getParam), common.js helpers

function sidebarBlock(b) {
  if (b.type === 'ad') {
    const src = b.adImageUpload || b.adImageUrl
    if (!src) return ''
    const href = /^https?:/i.test(b.adLinkUrl || '') ? b.adLinkUrl : '#'
    return `<a class="side-ad" href="${esc(href)}" target="_blank" rel="noopener"><img src="${esc(src)}" alt="${esc(b.title || 'Advertisement')}"></a>`
  }
  const href = /^(https?:|mailto:)/i.test(b.buttonUrl || '') ? b.buttonUrl : ''
  return `<div class="panel">
    ${b.title ? `<h3>${esc(b.title)}</h3>` : ''}
    ${b.content ? `<p style="margin-bottom:12px">${esc(b.content)}</p>` : ''}
    ${b.buttonLabel && href ? `<a class="btn ${b.buttonStyle === 'ghost' ? 'btn-outline' : 'btn-primary'} btn-sm" href="${esc(href)}" target="_blank" rel="noopener">${esc(b.buttonLabel)}</a>` : ''}
  </div>`
}

function outlineHtml(course, courseSlug, currentSlug) {
  if (!course || !course.modules || !course.modules.length) return ''
  return `
    <details class="outline" id="outline" open>
      <summary>${icon('list')} Course outline</summary>
      <a class="outline-course" href="course.html?slug=${encodeURIComponent(courseSlug)}">${icon('arrow-left')} ${esc(course.title)}</a>
      ${course.modules.map((m, mi) => `
        <div class="outline-mod">${String(mi + 1).padStart(2, '0')} · ${esc(m.title)}</div>
        ${(m.lessons || []).map((l, li) => `
          <a class="outline-item${l.slug.current === currentSlug ? ' current' : ''}" href="lesson.html?slug=${encodeURIComponent(l.slug.current)}&course=${encodeURIComponent(courseSlug)}"${l.slug.current === currentSlug ? ' aria-current="page"' : ''}>
            <span class="n">${String(li + 1).padStart(2, '0')}</span><span>${esc(l.title)}</span>
            ${l.freePreview ? '<span class="free">Free</span>' : ''}
          </a>`).join('')}`).join('')}
    </details>`
}

async function loadLessonPage() {
  const root = document.getElementById('lesson-content')
  const slug = getParam('slug')
  const courseSlug = getParam('course') || ''
  if (!slug) { window.location.replace('courses.html'); return }

  const [lesson, course, settings] = await Promise.all([
    getLesson(slug),
    courseSlug ? getCourse(courseSlug) : Promise.resolve(null),
    getSiteSettings()
  ])
  if (!lesson) { root.innerHTML = stateBox('Lesson not found.', 'courses.html', 'Back to courses'); return }

  document.title = `${lesson.title} — MechHub NG`

  // previous / next
  const all = []
  ;((course && course.modules) || []).forEach(m => (m.lessons || []).forEach(l => all.push(l)))
  const idx = all.findIndex(l => l.slug.current === slug)
  const prev = idx > 0 ? all[idx - 1] : null
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null
  const lessonLink = l => `lesson.html?slug=${encodeURIComponent(l.slug.current)}&course=${encodeURIComponent(courseSlug)}`
  const courseHref = courseSlug ? `course.html?slug=${encodeURIComponent(courseSlug)}` : 'courses.html'

  const hasQuiz = lesson.quiz && lesson.quiz.length > 0
  const quizHref = `lesson-quiz.html?lesson=${encodeURIComponent(slug)}&course=${encodeURIComponent(courseSlug)}`
  const video = videoEmbed(lesson.videoUrl, lesson.title)
  const notes = renderBlocks(lesson.content)
  const blocks = ((settings && settings.lessonSidebar) || []).filter(b => b.isActive)

  const nextBtn = courseSlug
    ? (next ? `<a class="btn btn-primary" href="${lessonLink(next)}">Next lesson ${icon('arrow-right')}</a>`
            : `<a class="btn btn-primary" href="${courseHref}">Complete course ${icon('check')}</a>`)
    : ''

  root.innerHTML = `
    <section class="page-head">
      <div class="wrap">
        ${crumbs([{ label: 'Courses', href: 'courses.html' }, ...(course ? [{ label: course.title, href: courseHref }] : []), { label: lesson.title }])}
        <div class="head-meta" style="margin:0 0 6px">
          ${lesson.duration ? `<span>${icon('clock')} ${esc(lesson.duration)}</span>` : ''}
          ${lesson.freePreview ? `<span class="free-chip">${icon('check')} Free preview</span>` : ''}
        </div>
        <h1>${esc(lesson.title)}</h1>
      </div>
    </section>

    <div class="wrap">
      <div class="lesson-layout">
        <div>${outlineHtml(course, courseSlug, slug)}</div>

        <article class="lesson-main">
          ${video}
          ${notes ? `<section><h2 class="block-h">${icon('book')} Lesson notes</h2><div class="prose">${notes}</div></section>` : ''}
          ${!video && !notes ? '<div class="state">Lesson content is on the way.</div>' : ''}
          ${hasQuiz ? `
            <div class="quiz-banner">
              <div><h3>Test your understanding</h3><p>${lesson.quiz.length} question${lesson.quiz.length !== 1 ? 's' : ''} · about ${Math.ceil(lesson.quiz.length * 1.5)} minutes</p></div>
              <a class="btn btn-accent" href="${quizHref}">Take the quiz ${icon('arrow-right')}</a>
            </div>` : ''}
          <div class="lesson-nav">
            ${prev ? `<a class="btn btn-outline" href="${lessonLink(prev)}">${icon('arrow-left')} Previous</a>` : `<a class="btn btn-outline" href="${courseHref}">${icon('arrow-left')} Back to course</a>`}
            ${nextBtn}
          </div>
        </article>

        <aside class="lesson-right">
          <div class="side">
            <div class="panel">
              <h3>Lesson info</h3>
              <dl class="kv">
                ${lesson.duration ? `<div><dt>Duration</dt><dd>${esc(lesson.duration)}</dd></div>` : ''}
                ${all.length && idx >= 0 ? `<div><dt>Lesson</dt><dd>${idx + 1} of ${all.length}</dd></div>` : ''}
                ${lesson.freePreview ? `<div><dt>Access</dt><dd>Free preview</dd></div>` : ''}
              </dl>
              ${hasQuiz ? `<a class="btn btn-primary btn-sm" style="margin-top:16px" href="${quizHref}">Take quiz</a>` : ''}
            </div>
            ${courseSlug ? `<div class="side-btns">
              ${prev ? `<a class="btn btn-outline btn-sm" href="${lessonLink(prev)}">${icon('arrow-left')} Previous lesson</a>` : ''}
              ${next ? `<a class="btn btn-primary btn-sm" href="${lessonLink(next)}">Next lesson ${icon('arrow-right')}</a>` : `<a class="btn btn-primary btn-sm" href="${courseHref}">Complete ${icon('check')}</a>`}
            </div>` : ''}
            ${blocks.map(sidebarBlock).join('')}
          </div>
        </aside>
      </div>
    </div>`

  // outline starts collapsed on small screens
  if (window.matchMedia('(max-width: 900px)').matches) {
    const o = document.getElementById('outline')
    if (o) o.open = false
  }
}

loadLessonPage()
