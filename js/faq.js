// faq.js — FAQ accordion with optional category filter
// Uses: sanity.js (getAllFaqs), common.js (esc, renderBlocks)

let faqData = []

function faqAnswer(a) {
  if (Array.isArray(a)) return renderBlocks(a)            // rich text
  return String(a || '').split(/\n{2,}/).map(p => `<p>${esc(p.trim())}</p>`).join('')   // plain text
}

function faqItem(f) {
  return `
    <details class="acc-item">
      <summary><span>${esc(f.question)}</span>${icon('chevron-down')}</summary>
      <div class="acc-body">${faqAnswer(f.answer)}</div>
    </details>`
}

function renderFaqs(category) {
  const root = document.getElementById('faq-list')
  const list = category ? faqData.filter(f => (f.category || 'General') === category) : faqData
  if (!list.length) { root.innerHTML = '<div class="state">No questions here yet.</div>'; return }

  // group by category, keeping the order from Sanity
  const groups = []
  list.forEach(f => {
    const name = f.category || 'General'
    let g = groups.find(x => x.name === name)
    if (!g) groups.push(g = { name, items: [] })
    g.items.push(f)
  })
  const showHeads = groups.length > 1
  root.innerHTML = groups.map(g => `
    <section class="faq-cat">
      ${showHeads ? `<h2>${esc(g.name)}</h2>` : ''}
      <div class="acc">${g.items.map(faqItem).join('')}</div>
    </section>`).join('')
}

function renderFaqCats() {
  const bar = document.getElementById('faq-cats')
  const cats = [...new Set(faqData.map(f => f.category || 'General'))]
  if (cats.length < 2) return
  bar.hidden = false
  bar.innerHTML = ['All', ...cats].map((c, i) =>
    `<button class="seg-btn" type="button" aria-selected="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')
  bar.addEventListener('click', e => {
    const btn = e.target.closest('.seg-btn')
    if (!btn) return
    bar.querySelectorAll('.seg-btn').forEach(b => b.setAttribute('aria-selected', String(b === btn)))
    renderFaqs(btn.dataset.cat === 'All' ? '' : btn.dataset.cat)
  })
}

async function loadFaqPage() {
  const root = document.getElementById('faq-list')
  const faqs = await getAllFaqs()
  if (!faqs) { root.innerHTML = `<div class="state">Couldn't load the FAQ. Check your connection and refresh.</div>`; return }
  faqData = faqs.filter(f => f && f.question)
  if (!faqData.length) { root.innerHTML = `<div class="state">No questions yet. Email <a href="mailto:hello@mechhub.ng">hello@mechhub.ng</a>.</div>`; return }
  renderFaqCats()
  renderFaqs('')
  // open the first answer so the page doesn't look empty
  const first = root.querySelector('.acc-item')
  if (first) first.open = true
}

loadFaqPage()
