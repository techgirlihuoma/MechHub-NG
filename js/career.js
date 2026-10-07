// career.js — single career page (career.html?slug=…)
// Uses: sanity.js (getCareer, getParam), common.js helpers

function careerIcon(c) {
  const text = `${c.title || ''} ${c.sector || ''}`.toLowerCase()
  if (/robot/.test(text)) return 'robot'
  if (/embedded|firmware|software/.test(text)) return 'code'
  if (/control|plc|instrument/.test(text)) return 'chip'
  if (/automation|process|industrial/.test(text)) return 'chart'
  if (/design|product|cad/.test(text)) return 'box'
  return 'gear'
}

const checkList = items => items && items.length
  ? `<ul class="checks">${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : ''

function section(iconName, title, html) {
  return html ? `<section><h2 class="block-h">${icon(iconName)} ${esc(title)}</h2>${html}</section>` : ''
}

async function loadCareerPage() {
  const root = document.getElementById('career-content')
  const slug = getParam('slug')
  if (!slug) { window.location.replace('index.html#careers'); return }

  const c = await getCareer(slug)
  if (!c) { root.innerHTML = stateBox('Career not found.', 'index.html#careers', 'See all careers'); return }

  document.title = `${c.title} — MechHub NG`

  const path = (c.learningPath || []).filter(x => x && x.slug)
  const projects = (c.relatedProjects || []).filter(x => x && x.slug)
  const sal = c.salaryRange || {}
  const video = videoEmbed(c.videoUrl, `Day in the life of a ${c.title}`)

  const pathHtml = path.length ? `<ol class="path">${path.map((co, i) => `
    <li>
      <span class="path-n">${i + 1}</span>
      <a class="row-link${co.comingSoon ? ' soon' : ''}" href="course.html?slug=${encodeURIComponent(co.slug.current)}">
        <div><b>${esc(co.title)}</b><span class="badge-row">
          ${co.level ? `<span class="badge badge-${esc(co.level)}">${esc(co.level)}</span>` : ''}
          ${co.pillar ? `<span class="badge badge-${esc(co.pillar)}">${esc(co.pillar)}</span>` : ''}
          ${co.comingSoon ? '<span class="badge badge-soon">Coming soon</span>' : ''}</span></div>
        <span class="go">${icon('arrow-right')}</span>
      </a>
    </li>`).join('')}</ol>` : ''

  const projHtml = projects.length ? `<div class="row-list">${projects.map(p => {
    const th = img(p.thumbnail, 160)
    return `<a class="row-link" href="project.html?slug=${encodeURIComponent(p.slug.current)}">
      <div class="lead">
        <span class="row-thumb">${th ? `<img src="${esc(th)}" alt="" loading="lazy">` : icon('wrench')}</span>
        <div><b>${esc(p.title)}</b><span class="badge-row">
          ${p.tier ? `<span class="badge badge-${esc(p.tier)}">${esc(p.tier)}</span>` : ''}
          ${p.estimatedCost ? `<span class="cc-dur">${esc(p.estimatedCost)}</span>` : ''}</span></div>
      </div>
      <span class="go">${icon('arrow-right')}</span>
    </a>`}).join('')}</div>` : ''

  const salaryRows = [['Entry level', sal.entry], ['Mid level', sal.mid], ['Senior level', sal.senior]].filter(r => r[1])

  root.innerHTML = `
    <section class="page-head">
      <div class="wrap">
        ${crumbs([{ label: 'Careers', href: 'index.html#careers' }, { label: c.title }])}
        <div style="display:flex;gap:18px;align-items:flex-start">
          ${icon(careerIcon(c), 'cr-ico')}
          <div>
            ${c.tag ? `<div class="badge-row"><span class="badge badge-advanced">${esc(c.tag)}</span></div>` : ''}
            <h1>${esc(c.title)}</h1>
            ${c.sector ? `<p>${esc(c.sector)}</p>` : ''}
          </div>
        </div>
      </div>
    </section>

    <div class="wrap main-pad">
      <div class="detail">
        <div class="stack">
          ${section('wrench', 'What you do', checkList(c.whatYouDo))}
          ${section('clock', 'A typical day', checkList(c.dayToDay))}
          ${section('users', "Where you'd work in Nigeria", checkList(c.whereYouWork))}
          ${section('target', 'Learning path', pathHtml)}
          ${section('layers', 'Projects that build these skills', projHtml)}
          ${section('play', 'Day in the life', video)}
        </div>

        <aside class="side">
          ${salaryRows.length ? `<div class="panel"><h3>Salary range (Nigeria)</h3><dl class="kv">${salaryRows.map(r => `<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join('')}</dl></div>` : ''}
          ${c.shortDescription ? `<div class="panel"><h3>In a nutshell</h3><p>${esc(c.shortDescription)}</p></div>` : ''}
          <a class="btn btn-primary" href="courses.html">Start learning</a>
          <a class="btn btn-outline" href="quiz.html">Retake the quiz</a>
        </aside>
      </div>
    </div>`
}

loadCareerPage()
