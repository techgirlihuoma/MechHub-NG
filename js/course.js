// course.js — single course page (course.html?slug=…)
// Uses: sanity.js (getCourse, getParam), common.js helpers

function countLessons(modules) {
  return (modules || []).reduce((n, m) => n + (m.lessons ? m.lessons.length : 0), 0)
}
function firstLessonOf(modules) {
  for (const m of modules || []) if (m.lessons && m.lessons.length) return m.lessons[0]
  return null
}

function copyLink(btn) {
  const done = () => { btn.innerHTML = `${icon('check')} Copied`; setTimeout(() => (btn.innerHTML = `${icon('link')} Copy link`), 2000) }
  if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, done)
  else done()
}

function showCourseTab(which) {
  ;['overview', 'curriculum'].forEach(id => {
    const on = id === which
    const tab = document.getElementById('ctab-' + id)
    const panel = document.getElementById('cpanel-' + id)
    if (tab) tab.setAttribute('aria-selected', String(on))
    if (panel) panel.hidden = !on
  })
}

async function loadCoursePage() {
  const root = document.getElementById('course-content')
  const slug = getParam('slug')
  if (!slug) { window.location.replace('courses.html'); return }

  const c = await getCourse(slug)
  if (!c) { root.innerHTML = stateBox('Course not found.', 'courses.html', 'Back to courses'); return }

  document.title = `${c.title} — MechHub NG`

  const modules = c.modules || []
  const total = countLessons(modules)
  const first = firstLessonOf(modules)
  const overview = renderBlocks(c.overview)
  const prereqs = c.prerequisites || []
  const thumb = img(c.thumbnail, 800)
  const pillar = c.pillar && PILLARS[c.pillar] ? c.pillar : null
  const hasOverview = !!(overview || prereqs.length)

  const startBtn = !c.comingSoon && first
    ? `<a class="btn btn-accent" href="lesson.html?slug=${encodeURIComponent(first.slug.current)}&course=${encodeURIComponent(slug)}">Start course ${icon('arrow-right')}</a>` : ''

  const curriculum = modules.length ? `
    <div class="acc">${modules.map((m, mi) => `
      <details class="acc-item" ${mi === 0 ? 'open' : ''}>
        <summary>
          <span><span class="eyebrow" style="margin-right:10px">${String(mi + 1).padStart(2, '0')}</span>${esc(m.title)}
            <small style="display:block;font-weight:500;color:var(--ink-3);font-size:13px;margin-top:2px">${m.description ? esc(m.description) + ' · ' : ''}${(m.lessons || []).length} lesson${(m.lessons || []).length !== 1 ? 's' : ''}</small></span>
          ${icon('chevron-down')}
        </summary>
        <div class="acc-body" style="padding:0">
          ${(m.lessons || []).length ? (m.lessons || []).map((l, li) => `
            <a class="outline-item" href="lesson.html?slug=${encodeURIComponent(l.slug.current)}&course=${encodeURIComponent(slug)}" style="padding-inline:22px">
              <span class="n">${String(li + 1).padStart(2, '0')}</span>
              <span>${esc(l.title)}${l.duration ? ` <small style="color:var(--ink-3)">· ${esc(l.duration)}</small>` : ''}</span>
              ${l.freePreview ? '<span class="free">Free preview</span>' : ''}
            </a>`).join('') : '<div style="padding:16px 22px;color:var(--ink-3);font-size:14px">Lessons coming soon</div>'}
        </div>
      </details>`).join('')}</div>`
    : `<div class="state">No modules added yet. Check back soon.</div>`

  root.innerHTML = `
    <section class="page-head">
      <div class="wrap">
        ${crumbs([{ label: 'Courses', href: 'courses.html' }, { label: c.title }])}
        <div class="${thumb ? 'head-split' : ''}">
          <div>
            <div class="badge-row">
              ${c.level ? `<span class="badge badge-${esc(c.level)}">${esc(c.level)}</span>` : ''}
              ${pillar ? `<span class="badge badge-${pillar}">${esc(PILLARS[pillar].label)}</span>` : ''}
              ${c.comingSoon ? '<span class="badge badge-soon">Coming soon</span>' : ''}
            </div>
            <h1>${esc(c.title)}</h1>
            ${c.description ? `<p>${esc(c.description)}</p>` : ''}
            <div class="head-meta">
              ${c.duration ? `<span>${icon('clock')} ${esc(c.duration)}</span>` : ''}
              ${total ? `<span>${icon('book')} ${total} lesson${total !== 1 ? 's' : ''}</span>` : ''}
              ${modules.length ? `<span>${icon('layers')} ${modules.length} module${modules.length !== 1 ? 's' : ''}</span>` : ''}
            </div>
            <div class="head-cta">${startBtn}</div>
          </div>
          ${thumb ? `<div class="head-thumb"><img src="${esc(thumb)}" alt="${esc(c.title)}"></div>` : ''}
        </div>
      </div>
    </section>

    <div class="wrap main-pad">
      <div class="detail">
        <div class="stack">
          ${hasOverview ? `
            <div class="seg" role="tablist" aria-label="Course sections">
              <button class="seg-btn" role="tab" id="ctab-overview" aria-selected="true" onclick="showCourseTab('overview')">Overview</button>
              <button class="seg-btn" role="tab" id="ctab-curriculum" aria-selected="false" onclick="showCourseTab('curriculum')">Curriculum</button>
            </div>
            <div id="cpanel-overview">
              ${prereqs.length ? `<section style="margin-bottom:32px"><h2 class="block-h">${icon('check')} Prerequisites</h2><ul class="checks">${prereqs.map(p => `<li>${esc(p)}</li>`).join('')}</ul></section>` : ''}
              ${overview ? `<section><h2 class="block-h">${icon('book')} About this course</h2><div class="prose">${overview}</div></section>` : ''}
            </div>
            <div id="cpanel-curriculum" hidden>
              <h2 class="block-h">${icon('list')} Course content</h2>${curriculum}
            </div>`
          : `<section><h2 class="block-h">${icon('list')} Course content</h2>${curriculum}</section>`}
        </div>

        <aside class="side">
          <div class="panel">
            <h3>Course info</h3>
            <dl class="kv">
              ${pillar ? `<div><dt>Pillar</dt><dd>${esc(PILLARS[pillar].label)}</dd></div>` : ''}
              ${c.level ? `<div><dt>Level</dt><dd style="text-transform:capitalize">${esc(c.level)}</dd></div>` : ''}
              ${c.duration ? `<div><dt>Duration</dt><dd>${esc(c.duration)}</dd></div>` : ''}
              ${total ? `<div><dt>Lessons</dt><dd>${total}</dd></div>` : ''}
              ${modules.length ? `<div><dt>Modules</dt><dd>${modules.length}</dd></div>` : ''}
            </dl>
            ${!c.comingSoon && first ? `<a class="btn btn-primary" style="margin-top:18px" href="lesson.html?slug=${encodeURIComponent(first.slug.current)}&course=${encodeURIComponent(slug)}">Start course</a>` : ''}
          </div>
          <div class="panel">
            <h3>Share this course</h3>
            <button class="btn btn-outline btn-sm" type="button" onclick="copyLink(this)">${icon('link')} Copy link</button>
          </div>
        </aside>
      </div>
    </div>`
}

loadCoursePage()
