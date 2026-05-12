 // ─── RENDER FAQ ───────────────────────────────────────────
function renderFaq(faqs) {
  const list = document.getElementById('faq-list')
  if (!list) return

  if (!faqs || faqs.length === 0) {
    list.innerHTML = '<div class="error-state">No FAQs found.</div>'
    return
  }

  list.innerHTML = faqs.map((faq, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-q" onclick="toggleFaq(${i})">
        ${faq.question}
        <span class="faq-chevron">+</span>
      </button>
      <div class="faq-a">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('')
}

// ─── TOGGLE FAQ ITEM ──────────────────────────────────────
function toggleFaq(i) {
  const item = document.getElementById('faq-' + i)
  if (!item) return

  const isOpen = item.classList.contains('open')

  // close all
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('open')
  })

  // open clicked one if it was closed
  if (!isOpen) {
    item.classList.add('open')
  }
}

// ─── LOAD FAQ PAGE ────────────────────────────────────────
async function loadFaqPage() {
  const faqs = await getAllFaqs()
  renderFaq(faqs)
}
