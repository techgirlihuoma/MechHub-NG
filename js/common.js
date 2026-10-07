// ═══════════════════════════════════════════════════════════
// common.js — helpers shared by the redesigned inner pages.
// Load AFTER sanity.js and shell.js, BEFORE the page's own JS.
// (index.html does not load this; home.js has its own copies.)
// ═══════════════════════════════════════════════════════════

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

// Safe image URL builder. Handles ids that contain hyphens and
// never throws on a missing image. Sanity resizes on the fly (?w=).
function img(source, width) {
  if (!source || !source.asset || !source.asset._ref) return null
  const parts = source.asset._ref.split('-')
  if (parts.length < 4) return null
  const format = parts[parts.length - 1]
  const dimensions = parts[parts.length - 2]
  const id = parts.slice(1, parts.length - 2).join('-')
  const base = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`
  return width ? `${base}?w=${width}&auto=format` : base
}

const TAG_LABELS = {
  mechanical: 'Mechanical Design', electronics: 'Electronics', programming: 'Programming',
  cad: 'CAD', pcb: 'PCB Design', arduino: 'Arduino', ros: 'ROS'
}
const tagLabel = t => TAG_LABELS[t] || t

const PILLARS = {
  mechanical: { label: 'Mechanical Design', icon: 'gear' },
  electronics: { label: 'Electronics', icon: 'chip' },
  programming: { label: 'Programming', icon: 'code' }
}

function getYouTubeId(url) {
  if (!url) return null
  const m = String(url).match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
  return m ? m[1] : null
}

function videoEmbed(url, title) {
  const id = getYouTubeId(url)
  if (!id) return ''
  return `<div class="video-wrap"><iframe src="https://www.youtube.com/embed/${esc(id)}" allowfullscreen loading="lazy" title="${esc(title || 'Video')}"></iframe></div>`
}

function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  if (isNaN(d)) return ''
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Page-level states
function stateBox(message, linkHref, linkLabel) {
  return `<div class="wrap"><div class="state" style="margin:56px 0">${esc(message)}${
    linkHref ? ` <a href="${esc(linkHref)}">${esc(linkLabel || 'Go back')}</a>` : ''}</div></div>`
}

// Breadcrumb / back link
function crumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb">${items.map((it, i) =>
    it.href ? `<a href="${esc(it.href)}">${esc(it.label)}</a>` : `<span aria-current="page">${esc(it.label)}</span>`
  ).join(`<span class="sep">/</span>`)}</nav>`
}

function fillBadge(kind, value) {
  if (!value) return ''
  return `<span class="badge badge-${esc(value)}">${esc(value)}</span>`
}

// ─── PORTABLE TEXT (lesson notes, overview, build posts) ─────
const TS_SIZES = { small: '.8em', normal: '1em', medium: '1.2em', large: '1.45em', xl: '1.85em' }
const TS_FONTS = { sans: 'var(--font)', mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', cond: 'var(--font)' }
const TS_COLORS = {
  default: 'inherit', green: 'var(--electronics-fg)', muted: 'var(--ink-3)', white: 'var(--ink)',
  orange: 'var(--intermediate-fg)', blue: 'var(--brand-text)', yellow: 'var(--intermediate-fg)', red: '#d6342c'
}

function renderSpans(block) {
  if (!block.children) return ''
  return block.children.map(child => {
    let t = esc(child.text || '')
    if (!t) return ''
    const marks = child.marks || []
    marks.forEach(mark => {
      if (mark === 'strong') t = `<strong>${t}</strong>`
      else if (mark === 'em') t = `<em>${t}</em>`
      else if (mark === 'underline') t = `<u>${t}</u>`
      else if (mark === 'code') t = `<code class="inline-code">${t}</code>`
      else if (mark === 'highlight') t = `<mark>${t}</mark>`
    })
    ;(block.markDefs || []).forEach(def => {
      if (!marks.includes(def._key)) return
      if (def._type === 'link') {
        const href = /^(https?:|mailto:|\/|#)/i.test(def.href || '') ? def.href : '#'
        t = `<a href="${esc(href)}"${def.blank ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`
      } else if (def._type === 'textStyle') {
        const css = [
          def.fontSize && TS_SIZES[def.fontSize] ? `font-size:${TS_SIZES[def.fontSize]}` : '',
          def.fontFamily && TS_FONTS[def.fontFamily] ? `font-family:${TS_FONTS[def.fontFamily]}` : '',
          def.color && TS_COLORS[def.color] ? `color:${TS_COLORS[def.color]}` : ''
        ].filter(Boolean).join(';')
        if (css) t = `<span style="${css}">${t}</span>`
      }
    })
    return t
  }).join('')
}

const CALLOUT_ICON = { info: 'alert', tip: 'bolt', warning: 'alert', important: 'bolt', success: 'check' }

function renderSpecial(block) {
  // HTML embed (sandboxed iframe)
  if (block._type === 'htmlEmbed') {
    const html = block.html ? esc(block.html) : ''
    return `<figure class="embed">
      ${block.label ? `<div class="embed-label">${esc(block.label)}</div>` : ''}
      <div class="embed-frame" style="height:${Number(block.height) || 400}px">
        <iframe srcdoc="${html}" sandbox="allow-scripts allow-same-origin allow-forms" loading="lazy" title="${esc(block.label || 'Interactive element')}"></iframe>
      </div>
      ${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ''}
    </figure>`
  }

  // Code block with copy button
  if (block._type === 'codeBlock') {
    const labels = { cpp: 'Arduino / C++', c: 'C', python: 'Python', javascript: 'JavaScript', html: 'HTML', css: 'CSS', bash: 'Bash', text: 'Text' }
    const lang = block.language || 'text'
    return `<figure class="code">
      <div class="code-bar">
        <span class="code-lang">${esc(labels[lang] || lang)}${block.filename ? ` <i>· ${esc(block.filename)}</i>` : ''}</span>
        <button type="button" class="code-copy" onclick="copyCode(this)">Copy</button>
      </div>
      <pre><code>${esc(block.code || '')}</code></pre>
      ${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ''}
    </figure>`
  }

  // Callout
  if (block._type === 'callout') {
    const type = CALLOUT_ICON[block.type] ? block.type : 'info'
    return `<aside class="callout callout-${type}">
      <span class="callout-ico">${icon(CALLOUT_ICON[type])}</span>
      <div>${block.title ? `<strong>${esc(block.title)}</strong>` : ''}<p>${esc(block.content || '')}</p></div>
    </aside>`
  }

  // Image
  if (block._type === 'image') {
    const url = img(block, 1100)
    if (!url) return ''
    return `<figure class="pt-img"><img src="${esc(url)}" alt="${esc(block.alt || '')}" loading="lazy">${
      block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ''}</figure>`
  }

  // Table (simple: rows[].cells[] — matches the basic `table` object schema)
  if (block._type === 'table') {
    const rows = block.rows || []
    if (!rows.length) return ''
    const cellsOf = r => (r.cells || r.columns || [])
    const head = cellsOf(rows[0])
    const useHead = block.hasHeader !== false
    return `<div class="table-wrap"><table class="tbl">
      ${useHead ? `<thead><tr>${head.map(c => `<th>${esc(typeof c === 'string' ? c : c.text)}</th>`).join('')}</tr></thead>` : ''}
      <tbody>${rows.slice(useHead ? 1 : 0).map(r =>
        `<tr>${cellsOf(r).map(c => `<td>${esc(typeof c === 'string' ? c : c.text)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`
  }
  return null
}

function copyCode(btn) {
  const code = btn.closest('.code').querySelector('code').innerText
  const done = () => { btn.textContent = 'Copied'; setTimeout(() => (btn.textContent = 'Copy'), 1800) }
  if (navigator.clipboard) navigator.clipboard.writeText(code).then(done, done)
  else done()
}

function renderBlocks(blocks) {
  if (!blocks || !blocks.length) return ''
  let out = ''
  let list = null // { tag, items: [] }
  const flush = () => { if (list) { out += `<${list.tag}>${list.items.join('')}</${list.tag}>`; list = null } }

  blocks.forEach(block => {
    if (block._type !== 'block') {
      flush()
      const special = renderSpecial(block)
      if (special) out += special
      return
    }
    const html = renderSpans(block)
    if (!html.trim()) return

    if (block.listItem) {
      const tag = block.listItem === 'number' ? 'ol' : 'ul'
      if (!list || list.tag !== tag) { flush(); list = { tag, items: [] } }
      list.items.push(`<li>${html}</li>`)
      return
    }
    flush()
    switch (block.style) {
      case 'h1': out += `<h2>${html}</h2>`; break           // page already has an h1
      case 'h2': out += `<h2>${html}</h2>`; break
      case 'h3': out += `<h3>${html}</h3>`; break
      case 'h4': out += `<h4>${html}</h4>`; break
      case 'blockquote': out += `<blockquote>${html}</blockquote>`; break
      default: out += `<p>${html}</p>`
    }
  })
  flush()
  return out
}

// ─── COURSE CARD (courses page, career page, etc.) ───────────
const LEVEL_RANK = { beginner: 0, intermediate: 1, advanced: 2, pro: 3 }

function courseCard(c) {
  const thumb = img(c.thumbnail, 520)
  const pillar = c.pillar && PILLARS[c.pillar] ? c.pillar : 'mechanical'
  const media = thumb
    ? `<img src="${esc(thumb)}" alt="" loading="lazy">`
    : `<div class="cc-ph ${esc(pillar)}">${icon(PILLARS[pillar].icon)}</div>`
  return `
    <a class="course-card" href="course.html?slug=${encodeURIComponent(c.slug.current)}">
      <div class="cc-media">
        ${media}
        ${c.level ? `<span class="badge badge-${esc(c.level)} cc-level">${esc(c.level)}</span>` : ''}
      </div>
      <div class="cc-body">
        <div class="cc-title">${esc(c.title)}</div>
        <div class="cc-desc">${esc(c.description || '')}</div>
        <div class="cc-foot">
          <span class="badge badge-${esc(pillar)}">${esc(pillar)}</span>
          ${c.comingSoon
            ? '<span class="badge badge-soon">Coming soon</span>'
            : (c.duration ? `<span class="cc-dur">${icon('clock')} ${esc(c.duration)}</span>` : '')}
        </div>
      </div>
    </a>`
}

function sortCourses(list) {
  return [...list].sort((a, b) =>
    (Number(!!a.comingSoon) - Number(!!b.comingSoon)) ||
    ((LEVEL_RANK[a.level] ?? 9) - (LEVEL_RANK[b.level] ?? 9)) ||
    String(a.title).localeCompare(String(b.title)))
}
