// ═══════════════════════════════════════════════════════════
// build.js — single community build page (build.html?slug=…)
// Uses: sanity.js (getBuild, getParam), common.js helpers
// ═══════════════════════════════════════════════════════════

function openLightbox(src) {
  const box = document.createElement('div')
  box.className = 'lightbox'
  box.innerHTML = `<img src="${esc(src)}" alt="">`
  box.addEventListener('click', () => box.remove())
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Escape') { box.remove(); document.removeEventListener('keydown', onKey) }
  })
  document.body.appendChild(box)
}

function renderGallery(photos, title) {
  const items = photos.map(p => {
    const thumb = img(p, 700)
    const full = img(p, 1600)
    if (!thumb) return ''
    return `<figure>
      <div class="g-img"><img src="${esc(thumb)}" alt="${esc(p.caption || title)}" loading="lazy" onclick="openLightbox('${esc(full)}')"></div>
      ${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}
    </figure>`
  }).join('')
  return items ? `<div class="gallery${photos.length === 1 ? ' one' : ''}">${items}</div>` : ''
}

async function loadBuildPage() {
  const root = document.getElementById('build-content')
  const slug = getParam('slug')
  if (!slug) { window.location.replace('community.html'); return }

  const build = await getBuild(slug)
  if (!build) {
    root.innerHTML = stateBox('Build not found.', 'community.html', 'Back to community')
    return
  }

  document.title = `${build.title} — MechHub NG`

  const photos = (build.photos || []).filter(p => img(p))
  const gallery = photos.length ? renderGallery(photos, build.title) : ''
  const video = videoEmbed(build.videoUrl, build.title)
  const post = renderBlocks(build.fullPost)
  const costs = build.costBreakdown || []
  const tags = build.skills || []
  const meta = [build.authorLevel, build.authorSchool].filter(Boolean).join(' · ')
  const when = formatDate(build.publishedAt)

  root.innerHTML = `
    <section class="page-head">
      <div class="wrap">
        ${crumbs([{ label: 'Community', href: 'community.html' }, { label: build.title }])}
        <div class="author">
          <span class="avatar">${esc(build.authorInitials || '?')}</span>
          <div>
            <b>${esc(build.authorName || 'MechHub student')}</b>
            <span>${esc([meta, when].filter(Boolean).join(' · '))}</span>
          </div>
        </div>
        <div class="badge-row">${build.tier ? `<span class="badge badge-${esc(build.tier)}">${esc(build.tier)}</span>` : ''}</div>
        <h1>${esc(build.title)}</h1>
        ${build.description ? `<p>${esc(build.description)}</p>` : ''}
      </div>
    </section>

    <div class="wrap main-pad">
      <div class="detail">
        <div class="stack">
          ${gallery ? `<section><h2 class="block-h">${icon('camera')} Photos</h2>${gallery}</section>` : ''}
          ${video ? `<section><h2 class="block-h">${icon('play')} Build video</h2>${video}</section>` : ''}
          ${post ? `<section><h2 class="block-h">${icon('wrench')} The build</h2><div class="prose">${post}</div></section>` : ''}
          ${build.lessonsLearned ? `<div class="note"><h3>${icon('book')} What they learned</h3><p>${esc(build.lessonsLearned)}</p></div>` : ''}
          ${build.challenges ? `<div class="note warn"><h3>${icon('alert')} Challenges hit</h3><p>${esc(build.challenges)}</p></div>` : ''}
          ${build.relatedProject && build.relatedProject.slug ? `
            <section>
              <h2 class="block-h">${icon('layers')} Based on</h2>
              <a class="row-link" href="project.html?slug=${esc(build.relatedProject.slug.current)}">
                <div><b>${esc(build.relatedProject.title)}</b>${build.relatedProject.tier ? `<span class="badge badge-${esc(build.relatedProject.tier)}">${esc(build.relatedProject.tier)}</span>` : ''}</div>
                <span class="go">${icon('arrow-right')}</span>
              </a>
            </section>` : ''}
        </div>

        <aside class="side">
          ${costs.length ? `
            <div class="panel">
              <h3>Cost breakdown</h3>
              <dl class="kv">${costs.map(c => `<div><dt>${esc(c.item)}</dt><dd>${esc(c.cost)}</dd></div>`).join('')}</dl>
            </div>` : ''}
          ${tags.length ? `
            <div class="panel">
              <h3>Tags</h3>
              <div class="badge-row">${tags.map(t => `<span class="badge badge-plain">${esc(tagLabel(t))}</span>`).join('')}</div>
            </div>` : ''}
          <div class="panel">
            <h3>Inspired?</h3>
            <p style="margin-bottom:14px">Build something similar and submit your own version to the community.</p>
            <a class="btn btn-accent" href="mailto:hello@mechhub.ng?subject=My Build Submission">Submit your build</a>
          </div>
        </aside>
      </div>
    </div>`
}

loadBuildPage()
