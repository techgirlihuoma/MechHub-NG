// project.js — single project page (project.html?slug=…)
// Uses: sanity.js (getProject, getParam), common.js helpers

async function loadProjectPage() {
  const root = document.getElementById('project-content')
  const slug = getParam('slug')
  if (!slug) { window.location.replace('projects.html'); return }

  const p = await getProject(slug)
  if (!p) { root.innerHTML = stateBox('Project not found.', 'projects.html', 'Back to projects'); return }

  document.title = `${p.title} — MechHub NG`

  const thumb = img(p.thumbnail, 800)
  const tags = p.skills || []
  const comps = p.components || []
  const steps = (p.steps || []).filter(s => typeof s === 'string' ? s.trim() : s)
  const overview = renderBlocks(p.overview)
  const video = videoEmbed(p.videoUrl, p.title)
  const related = (p.relatedCourses || []).filter(c => c && c.slug)

  root.innerHTML = `
    <section class="page-head">
      <div class="wrap">
        ${crumbs([{ label: 'Projects', href: 'projects.html' }, { label: p.title }])}
        <div class="${thumb ? 'head-split' : ''}">
          <div>
            <div class="badge-row">${p.tier ? `<span class="badge badge-${esc(p.tier)}">${esc(p.tier)}</span>` : ''}</div>
            <h1>${esc(p.title)}</h1>
            ${p.description ? `<p>${esc(p.description)}</p>` : ''}
            <div class="head-meta">
              ${p.estimatedCost ? `<span>${icon('gift')} Est. cost: <b>${esc(p.estimatedCost)}</b></span>` : ''}
              ${steps.length ? `<span>${icon('list')} ${steps.length} steps</span>` : ''}
            </div>
            ${tags.length ? `<div class="badge-row" style="margin-top:14px">${tags.map(t => `<span class="badge badge-plain">${esc(tagLabel(t))}</span>`).join('')}</div>` : ''}
          </div>
          ${thumb ? `<div class="head-thumb"><img src="${esc(thumb)}" alt="${esc(p.title)}"></div>` : ''}
        </div>
      </div>
    </section>

    <div class="wrap main-pad">
      <div class="detail">
        <div class="stack">
          ${video ? `<section><h2 class="block-h">${icon('play')} Video</h2>${video}</section>` : ''}
          ${overview ? `<section><h2 class="block-h">${icon('book')} Overview</h2><div class="prose">${overview}</div></section>` : ''}
          ${steps.length ? `<section><h2 class="block-h">${icon('list')} Step by step</h2><ol class="steps">${steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol></section>` : ''}
          ${related.length ? `
            <section>
              <h2 class="block-h">${icon('cap')} Related courses</h2>
              <div class="row-list">${related.map(c => `
                <a class="row-link" href="course.html?slug=${encodeURIComponent(c.slug.current)}">
                  <div><b>${esc(c.title)}</b><span class="badge-row">
                    ${c.pillar ? `<span class="badge badge-${esc(c.pillar)}">${esc(c.pillar)}</span>` : ''}
                    ${c.level ? `<span class="badge badge-${esc(c.level)}">${esc(c.level)}</span>` : ''}</span></div>
                  <span class="go">${icon('arrow-right')}</span>
                </a>`).join('')}</div>
            </section>` : ''}
        </div>

        <aside class="side">
          ${comps.length ? `
            <div class="panel">
              <h3>Components needed</h3>
              <div class="table-wrap flush">
                <table class="tbl" style="min-width:0">
                  <thead><tr><th>Component</th><th class="num">Qty</th><th class="num">Price</th></tr></thead>
                  <tbody>${comps.map(c => `<tr><td>${esc(c.name)}</td><td class="num">${esc(c.quantity || 1)}</td><td class="num">${esc(c.estimatedPrice || '—')}</td></tr>`).join('')}</tbody>
                  ${p.estimatedCost ? `<tfoot><tr><td colspan="2">Total est.</td><td class="num">${esc(p.estimatedCost)}</td></tr></tfoot>` : ''}
                </table>
              </div>
            </div>` : (p.estimatedCost ? `<div class="panel"><h3>Estimated cost</h3><div class="cost-total">${esc(p.estimatedCost)}</div></div>` : '')}
          <div class="panel">
            <h3>Share your build</h3>
            <p style="margin-bottom:14px">Built this project? Submit it to the community and inspire other students.</p>
            <a class="btn btn-accent" href="mailto:hello@mechhub.ng?subject=${encodeURIComponent('My Build: ' + p.title)}">Submit your build</a>
          </div>
        </aside>
      </div>
    </div>`
}

loadProjectPage()
