// ═══════════════════════════════════════════════════════════
// shell.js — shared nav, footer, theme toggle and icons
// for redesigned pages. Replaces nav.js on those pages.
//
// Usage: <body data-page="home"> with
//   <div id="site-nav"></div> ... <div id="site-footer"></div>
// then <script src="js/shell.js"></script>
// ═══════════════════════════════════════════════════════════

// ─── ICONS (24px grid, stroke-based) ─────────────────────────
const ICON_PATHS = {
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'arrow-left': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  'moon': '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
  'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  'menu': '<path d="M4 7h16M4 12h16M4 17h16"/>',
  'close': '<path d="M6 6l12 12M18 6L6 18"/>',
  'gear': '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  'chip': '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  'code': '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  'book': '<path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14"/>',
  'users': '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.4c2 .8 3.5 2.6 3.5 5.6"/>',
  'cap': '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6"/>',
  'robot': '<circle cx="6" cy="19" r="2"/><path d="M6 17v-6l6-6 5 3"/><circle cx="12" cy="5" r="1.5"/><path d="M17 8l3 4-3 1"/>',
  'layers': '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  'rocket': '<path d="M5 15c-1.5 1.5-2 4-2 6 2 0 4.5-.5 6-2M14 4c3-1.5 6-1.5 6-1.5s0 3-1.5 6l-7 7-4.5-4.5z"/><circle cx="15" cy="9" r="1.5"/>',
  'wrench': '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  'bolt': '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  'search': '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  'alert': '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
  'chart': '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
  'box': '<path d="M12 3l9 4.5v9L12 21l-9-4.5v-9z"/><path d="M3 7.5l9 4.5 9-4.5M12 12v9"/>',
  'clipboard': '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',
  'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  'gift': '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1-3-5-4-5-1.5S11 8 12 8zM12 8c1-3 5-4 5-1.5S13 8 12 8z"/>',
  'check': '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  'chevron-down': '<path d="M6 9l6 6 6-6"/>',
  'chevron-right': '<path d="M9 6l6 6-6 6"/>',
  'play': '<path d="M7 4.5v15l12-7.5z"/>',
  'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  'link': '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
  'external': '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/>',
  'calendar': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  'tag': '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.2"/>',
  'help': '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 1 1 3.6 2.4c-.8.4-1.1 1-1.1 1.8M12 17h.01"/>',
  'shield': '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  'copy': '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  'camera': '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  'target': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  'list': '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  'lock': '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  'refresh': '<path d="M20 11a8 8 0 0 0-14-4M4 4v4h4M4 13a8 8 0 0 0 14 4M20 20v-4h-4"/>',
  'trophy': '<path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v1a3 3 0 0 0 4 3M16 6h4v1a3 3 0 0 1-4 3M12 14v4M8 20h8"/>',
  'x-circle': '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>'
}

function icon(name, cls) {
  return `<svg class="ico${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name] || ICON_PATHS.gear}</svg>`
}

function brandMark() {
  // gear-shaped logo mark: 8 teeth around a ring with a check-style centre
  let teeth = ''
  for (let i = 0; i < 8; i++) {
    teeth += `<rect x="15.2" y="1" width="3.6" height="6" rx="1" transform="rotate(${i * 45} 17 17)"/>`
  }
  return `<svg class="brand-mark" viewBox="0 0 34 34" aria-hidden="true">
    <g fill="#f5b52e">${teeth}<circle cx="17" cy="17" r="11"/></g>
    <circle cx="17" cy="17" r="7.5" fill="#0a1a3a"/>
    <path d="M13 17.5l3 3 5.5-6.5" fill="none" stroke="#f5b52e" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
}

// ─── THEME ───────────────────────────────────────────────────
// Same storage key as the old site so a saved choice carries over.
function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  try { localStorage.setItem('mechhub-theme', next) } catch (e) {}
  const btn = document.getElementById('theme-toggle')
  if (btn) btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')
}

// ─── NAV ─────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: 'home', href: 'index.html', label: 'Home' },
  { id: 'courses', href: 'courses.html', label: 'Courses' },
  { id: 'projects', href: 'projects.html', label: 'Projects' },
  { id: 'community', href: 'community.html', label: 'Community' },
  { id: 'resources', href: 'resources.html', label: 'Resources' },
  { id: 'faq', href: 'faq.html', label: 'FAQ' },
  { id: 'why', href: 'why.html', label: 'Why This?' }
]

function renderNav(active) {
  const links = NAV_LINKS.map(l =>
    `<a href="${l.href}"${l.id === active ? ' aria-current="page"' : ''}>${l.label}</a>`
  ).join('')
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'

  return `
    <header class="nav">
      <div class="wrap nav-inner">
        <a class="brand" href="index.html" aria-label="MechHub NG home">${brandMark()}<span>MechHub <b>NG</b></span></a>
        <nav class="nav-links" aria-label="Main">${links}</nav>
        <div class="nav-actions">
          <button class="icon-btn theme-toggle" id="theme-toggle" onclick="toggleTheme()"
            aria-label="${isDark ? 'Switch to light mode' : 'Switch to dark mode'}">
            <span class="i-moon">${icon('moon')}</span><span class="i-sun">${icon('sun')}</span>
          </button>
          <a class="btn btn-accent btn-sm" href="courses.html">Start</a>
          <button class="icon-btn nav-menu-btn" id="nav-menu-btn" aria-label="Open menu" aria-expanded="false">${icon('menu')}</button>
        </div>
      </div>
      <div class="mobile-menu" id="mobile-menu">
        ${links}
        <a class="btn btn-accent" href="quiz.html">Take the career quiz</a>
      </div>
    </header>`
}

// ─── FOOTER ──────────────────────────────────────────────────
function renderFooter() {
  return `
    <footer class="footer">
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <a class="brand" href="index.html">${brandMark()}<span>MechHub <b>NG</b></span></a>
            <p class="footer-tag">Free mechatronics learning for Nigerian engineering students.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="courses.html">Courses</a></li>
              <li><a href="projects.html">Projects</a></li>
              <li><a href="index.html#careers">Careers</a></li>
              <li><a href="community.html">Community</a></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><a href="resources.html">Books</a></li>
              <li><a href="resources.html">Software</a></li>
              <li><a href="resources.html">Websites</a></li>
              <li><a href="resources.html">Videos</a></li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li><a href="why.html">Why this site</a></li>
              <li><a href="quiz.html">Career quiz</a></li>
              <li><a href="privacy.html">Privacy policy</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="mailto:hello@mechhub.ng?subject=My Build Submission">Submit a build</a></li>
              <li><a href="mailto:hello@mechhub.ng">hello@mechhub.ng</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-base">© ${new Date().getFullYear()} MechHub NG. All rights reserved.</div>
      </div>
    </footer>`
}

// ─── MOUNT ───────────────────────────────────────────────────
function mountShell() {
  const active = document.body.dataset.page
  const navSlot = document.getElementById('site-nav')
  const footSlot = document.getElementById('site-footer')
  if (navSlot) navSlot.outerHTML = renderNav(active)
  if (footSlot) footSlot.outerHTML = renderFooter()

  const btn = document.getElementById('nav-menu-btn')
  const menu = document.getElementById('mobile-menu')
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open')
      btn.setAttribute('aria-expanded', String(open))
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
      btn.innerHTML = icon(open ? 'close' : 'menu')
    })
  }
}

mountShell()
