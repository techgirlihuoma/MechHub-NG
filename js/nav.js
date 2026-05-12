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
    <div class="footer-copy">// Built for Nigerian engineers. Build something real.</div>
  `
}

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav()
  initMobileMenu()
  renderFooter()
})
