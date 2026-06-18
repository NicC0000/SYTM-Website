/* Standard Yoke — shared header, footer, tweaks
   ------------------------------------------------------------------- */

(function () {
  // ============== SHARED MARKUP ====================
  function topbarHTML() {
    return `
      <div class="topbar">
        <div class="container">
          <div><span class="dot"></span>&nbsp;&nbsp;SY · EST. 1968 · MITEK APPROVED · KZN DELIVERY</div>
          <div class="links">
            <a href="https://wa.me/27743849722"><span class="dot"></span> ROOFING WHATSAPP</a>
            <a href="https://wa.me/27646114837"><span class="dot"></span> MATERIALS WHATSAPP</a>
            <a href="tel:+27338461300">033 846 1300</a>
          </div>
        </div>
      </div>
    `;
  }

  function brandMarkSVG() {
    return `
      <svg class="brand-mark" viewBox="0 0 120 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="miter" stroke-linecap="square" aria-hidden="true">
        <path d="M4 56 L60 8 L116 56 Z"/>
        <path d="M4 56 L116 56"/>
        <path d="M60 8 L60 56"/>
        <path d="M4 56 L32 30"/>
        <path d="M116 56 L88 30"/>
        <path d="M32 30 L60 56"/>
        <path d="M88 30 L60 56"/>
      </svg>
    `;
  }

  function headerHTML(active) {
    const pages = [
      { id: 'trusses',  label: 'Trusses',           href: 'trusses.html' },
      { id: 'roofing',  label: 'Roofing',           href: 'roofing.html' },
      { id: 'materials',label: 'Building Materials',href: 'building-materials.html' },
      { id: 'projects', label: 'Projects',          href: 'projects.html' },
      { id: 'about',    label: 'About',             href: 'about.html' },
      { id: 'contact',  label: 'Contact',           href: 'contact.html' },
    ];
    const menu = pages.map(p => `<a href="${p.href}" class="${p.id === active ? 'is-active' : ''}">${p.label}</a>`).join('');
    return `
      <header class="header">
        <div class="container nav">
          <a class="brand" href="index.html" aria-label="Standard Yoke — home">
            ${brandMarkSVG()}
            <div class="brand-text">STANDARD YOKE<small>TRUSSES · ROOFING · MATERIALS · EST. 1968</small></div>
          </a>
          <nav class="menu" id="sy-menu">${menu}</nav>
          <div class="nav-cta">
            <span class="nav-phone">033 846 1300</span>
            <a class="btn" href="contact.html">Request Quote <span class="arrow">→</span></a>
            <button class="nav-toggle" id="sy-nav-toggle" aria-label="Menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  function footerHTML() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="grid">
            <div class="col">
              <div class="lockup">STANDARD<br>YOKE</div>
              <p style="margin-top:18px;max-width:32ch">One supplier. One invoice. One truck.<br>MiTek-approved roof trusses, roofing, and building materials — delivered across KwaZulu-Natal since 1968.</p>
            </div>
            <div class="col">
              <h4>PRODUCT</h4>
              <a href="trusses.html">Trusses</a>
              <a href="roofing.html">Roofing</a>
              <a href="building-materials.html">Building Materials</a>
              <a href="projects.html">Projects</a>
            </div>
            <div class="col">
              <h4>CONTACT</h4>
              <a href="tel:+27338461300">033 846 1300</a>
              <a href="mailto:sales@stdyoke.co.za">sales@stdyoke.co.za</a>
              <a href="mailto:roofestimates@stdyoke.co.za">roofestimates@stdyoke.co.za</a>
              <a href="contact.html">Request a quote →</a>
            </div>
            <div class="col">
              <h4>BRANCH</h4>
              <p>74–80 Pentrich Road<br>Pietermaritzburg, 3201<br>KwaZulu-Natal</p>
              <h4 style="margin-top:20px">HOURS</h4>
              <p>Mon–Thu &nbsp; 07:30 – 16:30<br>Fri &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 07:30 – 15:30</p>
            </div>
          </div>
          <div class="footer-base">
            <div>© 2026 The Standard Yoke &amp; Timber Mills (Pty) Ltd</div>
            <div>BUILDERS · CONTRACTORS · TRADE</div>
          </div>
        </div>
      </footer>
    `;
  }

  function tweaksPanelHTML() {
    return `
      <div class="tw-panel" id="tw-panel" role="dialog" aria-label="Tweaks">
        <div class="tw-head">
          <div class="title">TWEAKS</div>
          <button class="close" id="tw-close" aria-label="Close tweaks">×</button>
        </div>
        <div class="tw-body">
          <div class="tw-section">
            <h5>Section density</h5>
            <div class="tw-seg" data-key="density">
              <button data-val="tight">Tight</button>
              <button data-val="normal">Default</button>
              <button data-val="loose">Loose</button>
            </div>
          </div>
          <div class="tw-section">
            <h5>Header style</h5>
            <div class="tw-seg" data-key="header">
              <button data-val="compact">Compact</button>
              <button data-val="normal">Default</button>
              <button data-val="spacious">Spacious</button>
            </div>
          </div>
          <div class="tw-section">
            <h5>Sticky header</h5>
            <div class="tw-seg" data-key="sticky">
              <button data-val="on">On</button>
              <button data-val="off">Off</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ============== TWEAK STATE ====================
  const STORAGE_KEY = 'sy-tweaks-v1';
  const DEFAULTS = {
    hero: 'split',
    density: 'normal',
    header: 'normal',
    sticky: 'on',
  };
  function loadTweaks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return Object.assign({}, DEFAULTS, raw ? JSON.parse(raw) : {});
    } catch (e) {
      return Object.assign({}, DEFAULTS);
    }
  }
  function saveTweaks(t) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(t)); } catch (e) {}
  }
  function applyTweaks(t) {
    const body = document.body;
    // density
    if (t.density === 'normal') body.removeAttribute('data-density');
    else body.setAttribute('data-density', t.density);
    // header
    if (t.header === 'normal') body.removeAttribute('data-header');
    else body.setAttribute('data-header', t.header);
    // sticky -- merge into data-header
    if (t.sticky === 'on') {
      const existing = body.getAttribute('data-header');
      if (existing && existing !== 'sticky') {
        body.setAttribute('data-header', existing);
      } else if (!existing) {
        body.setAttribute('data-header', 'sticky');
      }
      // simpler: always toggle sticky via class
      body.classList.add('sy-sticky');
    } else {
      body.classList.remove('sy-sticky');
    }
    // hero (set data-attr on body so any page can react)
    body.setAttribute('data-hero', t.hero);

    // sync segmented controls
    document.querySelectorAll('.tw-seg').forEach(seg => {
      const key = seg.getAttribute('data-key');
      seg.querySelectorAll('button').forEach(btn => {
        btn.classList.toggle('is-on', btn.getAttribute('data-val') === t[key]);
      });
    });
  }

  // ============== EDIT MODE PROTOCOL ====================
  let panelOpen = false;
  function openPanel() {
    const panel = document.getElementById('tw-panel');
    if (panel) { panel.classList.add('is-open'); panelOpen = true; }
  }
  function closePanel() {
    const panel = document.getElementById('tw-panel');
    if (panel) { panel.classList.remove('is-open'); panelOpen = false; }
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {}
  }

  // ============== INIT ====================
  window.SY = {
    init(opts) {
      opts = opts || {};
      const active = opts.active || '';

      // inject markup if container present
      const headEl = document.getElementById('sy-header');
      if (headEl) headEl.outerHTML = topbarHTML() + headerHTML(active);
      const footEl = document.getElementById('sy-footer');
      if (footEl) footEl.outerHTML = footerHTML();

      // tweaks panel
      const panelMount = document.createElement('div');
      panelMount.innerHTML = tweaksPanelHTML();
      document.body.appendChild(panelMount.firstElementChild);

      // hide hero section on non-home pages
      const isHome = active === 'home' || active === '';
      const heroSec = document.querySelector('[data-page="index"]');
      if (heroSec && !isHome) heroSec.style.display = 'none';

      // wire mobile nav
      const tog = document.getElementById('sy-nav-toggle');
      const menu = document.getElementById('sy-menu');
      if (tog && menu) tog.addEventListener('click', () => menu.classList.toggle('is-open'));

      // wire tweaks
      const t = loadTweaks();
      applyTweaks(t);

      document.querySelectorAll('.tw-seg').forEach(seg => {
        const key = seg.getAttribute('data-key');
        seg.querySelectorAll('button').forEach(btn => {
          btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-val');
            const next = loadTweaks();
            next[key] = val;
            saveTweaks(next);
            applyTweaks(next);
            // notify host of edits
            try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*'); } catch (e) {}
            // notify page (for hero swap)
            window.dispatchEvent(new CustomEvent('sy-tweaks', { detail: next }));
          });
        });
      });

      const closeBtn = document.getElementById('tw-close');
      if (closeBtn) closeBtn.addEventListener('click', closePanel);

      // edit-mode protocol
      window.addEventListener('message', (e) => {
        if (!e.data || typeof e.data !== 'object') return;
        if (e.data.type === '__activate_edit_mode') openPanel();
        else if (e.data.type === '__deactivate_edit_mode') closePanel();
      });
      try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
    },
    getTweaks: loadTweaks,
  };

  // sticky header via class fallback
  const style = document.createElement('style');
  style.textContent = `body.sy-sticky .header { position: sticky; top: 0; }`;
  document.head.appendChild(style);
})();
