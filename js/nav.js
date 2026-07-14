 // ─── NAV ACTIVE STATE ─────────────────────────────────────
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html'
  const navLinks = document.querySelectorAll('.nav-link')

  navLinks.forEach(link => {
    link.classList.remove('active')
    const href = link.getAttribute('href')
    if (href === currentPage) {
      link.classList.add('active')
    }
  })
}

// ─── MOBILE MENU TOGGLE ───────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle')
  const menu = document.getElementById('mobile-menu')

  if (!toggle || !menu) return

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open')
    toggle.textContent = menu.classList.contains('open') ? '✕' : '☰'
  })

  // close menu when a link is clicked
  const mobileLinks = document.querySelectorAll('.mobile-link')
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open')
      toggle.textContent = '☰'
    })
  })
}

// ─── RENDER FOOTER ────────────────────────────────────────
function renderFooter() {
  const footer = document.getElementById('main-footer')
  if (!footer) return

  footer.innerHTML = `
    <div class="footer-brand">
      MECHHUB<span class="footer-brand-accent">.NG</span>
    </div>
    <nav class="footer-nav">
      <a href="index.html">Home</a>
      <a href="courses.html">Courses</a>
      <a href="projects.html">Projects</a>
      <a href="community.html">Community</a>
      <a href="resources.html">Resources</a>
      <a href="faq.html">FAQ</a>
      <a href="why.html">Why This?</a>
      <a href="privacy.html">Privacy</a>
    </nav>
    <div class="footer-copy">// Build something real...</div>
    <div style="
      width:100%;
      border-top:1px solid var(--border);
      margin-top:20px;
      padding-top:16px;
      font-family:var(--mono);
      font-size:10px;
      color:var(--text3);
      letter-spacing:0.06em;
      text-align:center;
    ">
      © ${new Date().getFullYear()} MechHub NG · Built for Nigerian engineering students · All rights reserved
    </div>
  `
}

// ─── INIT ─────────────────────────────────────────────────
// ── THEME ─────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('mechhub-theme') || 'dark'
  document.documentElement.setAttribute('data-theme', saved)
  updateThemeBtn(saved)
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark'
  const next = current === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  localStorage.setItem('mechhub-theme', next)
  updateThemeBtn(next)
}

function updateThemeBtn(theme) {
  const btn = document.getElementById('theme-toggle')
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙'

  // inject a style tag that forces heading colors in light mode
  let styleTag = document.getElementById('theme-heading-fix')
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = 'theme-heading-fix'
    document.head.appendChild(styleTag)
  }

  if (theme === 'light') {
    styleTag.textContent = `
      * { color-scheme: light; }
      h1, h2, h3, h4, h5,
      [style*="color:#fff"],
      [style*="color: #fff"],
      [style*="color:white"],
      [style*="color: white"] {
        color: #1c1712 !important;
      }
    `
  } else {
    styleTag.textContent = ''
  }
}

// ── DISCLAIMER BANNER ─────────────────────────────────────
function initDisclaimer() {
  const dismissed = localStorage.getItem('mechhub-disclaimer')
  if (dismissed) return

  const bar = document.createElement('div')
  bar.className = 'disclaimer-bar'
  bar.id = 'disclaimer-bar'
  bar.innerHTML = `
    <span>
      DISCLAIMER❗❗Videos on this site are sourced from independent YouTube creators and are not produced by MechHub NG.
      All content is freely available and no copyright is infringed.
      See our <a href="privacy.html">Privacy Policy</a> for details.
    </span>
    <button class="disclaimer-close" onclick="dismissDisclaimer()">✕</button>
  `

  const nav = document.getElementById('main-nav')
  if (nav) nav.insertAdjacentElement('afterend', bar)
}

function dismissDisclaimer() {
  const bar = document.getElementById('disclaimer-bar')
  if (bar) bar.remove()
  localStorage.setItem('mechhub-disclaimer', 'true')
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme()
  setActiveNav()
  initMobileMenu()
  renderFooter()
  initDisclaimer()
})
