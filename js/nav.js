/**
 * nav.js — classic script.
 * -----------------------------------------------------------------------------
 * Wires up:
 *   • Sidebar toggle (hamburger) with desktop + mobile persistence
 *   • Playback bar placement (mobile: docked to app shell; desktop: in sidebar)
 *   • Theme toggle (dark/light/cybersecurity)
 *   • Language toggle (EN ↔ VI)
 *   • Accordion sections in the sidebar
 *   • Launcher modal
 * -----------------------------------------------------------------------------
 */
(function () {
  'use strict';

  function initNav() {
    initSidebar();
    initPlaybackBar();
    initTheme();
    initLang();
    initAccordion();
    initLauncher();
  }

  // ─── Sidebar ─────────────────────────────────────────────────────────────
    function initSidebar() {
    var wrapper = document.getElementById('sidebar-wrapper');
    var tab = document.getElementById('sidebar-toggle');
    if (!wrapper || !tab) return;

    var mq = window.matchMedia('(max-width: 700px)');

    function applyOpen() {
      var open = window.getState().sidebarOpen;

      if (mq.matches) {
        // Mobile: slide the overlay up/down
        var sidebar = wrapper.querySelector('.controls-sidebar');
        if (sidebar) {
          sidebar.style.transform = open ? 'translateY(0)' : 'translateY(-100%)';
        }
      } else {
        // Desktop: standard collapse
        var sidebar = wrapper.querySelector('.controls-sidebar');
        if (sidebar) sidebar.style.transform = 'none';
        wrapper.classList.toggle('open', open);
        wrapper.classList.toggle('collapsed', !open);
      }

      var title = open ? 'Close sidebar' : 'Open sidebar';
      tab.title = title;
      tab.setAttribute('aria-label', title);
    }

    function setDefault() {
      var savedState = localStorage.getItem('sidebarOpen');
      if (mq.matches) {
        // Force closed on mobile load so it doesn't block the screen
        window.setState({ sidebarOpen: false });
      } else if (savedState !== null) {
        window.setState({ sidebarOpen: savedState === 'true' });
      } else {
        window.setState({ sidebarOpen: true });
      }
    }

    setDefault();

    var lastMatch = mq.matches;
    mq.addEventListener('change', function (e) {
      if (e.matches === lastMatch) return;
      lastMatch = e.matches;
      
      // When resizing from desktop to mobile, force it closed
      if (e.matches) {
        window.setState({ sidebarOpen: false });
      }
      applyOpen();
    });

    tab.addEventListener('click', function () {
      openLauncher();
    });

    window.subscribe(function (state, prev) {
      if (state.sidebarOpen !== prev.sidebarOpen) applyOpen();
    });

    applyOpen();
  }

  // ─── Playback bar placement ──────────────────────────────────────────────
  function initPlaybackBar() {
    var bar = document.querySelector('.mobile-playback-bar');
    var sidebar = document.querySelector('.controls-sidebar');
    var shell = document.querySelector('.app-shell');
    var menuPopup = document.getElementById('m-menu-popup');
    var speedPopup = document.getElementById('m-speed-popup');
    
    if (!bar || !sidebar || !shell) return;

    var mq = window.matchMedia('(max-width: 700px)');

    function place() {
      if (mq.matches) {
        if (bar.parentNode !== shell) shell.appendChild(bar);
        // Move popups INSIDE the bar so they anchor to it
        if (menuPopup && menuPopup.parentNode !== bar) bar.appendChild(menuPopup);
        if (speedPopup && speedPopup.parentNode !== bar) bar.appendChild(speedPopup);
      } else {
        if (bar.parentNode !== sidebar) sidebar.appendChild(bar);
        if (menuPopup && menuPopup.parentNode !== bar) bar.appendChild(menuPopup);
        if (speedPopup && speedPopup.parentNode !== bar) bar.appendChild(speedPopup);
      }
    }

    place();
    mq.addEventListener('change', place);
  }

  // ─── Theme ───────────────────────────────────────────────────────────────
  function initTheme() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    var themes = ['dark', 'light', 'cybersecurity'];

    btn.addEventListener('click', function () {
      var current = window.getState().theme || 'dark';
      var currentIndex = themes.indexOf(current);

      if (currentIndex === -1) currentIndex = 0;

      var nextIndex = (currentIndex + 1) % themes.length;
      var next = themes[nextIndex];

      window.setState({ theme: next });
    });

    window.subscribe(function (state, prev) {
      if (state.theme !== prev.theme) {
        document.documentElement.setAttribute('data-theme', state.theme);
      }
    });
  }

  // ─── Language ────────────────────────────────────────────────────────────
  function initLang() {
    var btn = document.getElementById('lang-toggle');
    if (!btn) return;
    if (!window.__i18n__) return;

    var codes = window.__i18n__.codes;

    var current = window.getState().lang || codes[0];
    window.__i18n__.apply(current);

    btn.addEventListener('click', function () {
      var idx = codes.indexOf(window.__i18n__.get());
      var next = codes[(idx + 1) % codes.length];
      window.__i18n__.apply(next);
    });
  }

  // ─── Accordion (single-open) ─────────────────────────────────────────────
  function initAccordion() {
    var sections = document.querySelectorAll('.acc-section');
    if (!sections.length) return;

    var saved = window.storage.get('accOpen', {}) || {};

    sections.forEach(function (section) {
      var header = section.querySelector('.acc-header');
      var key = section.dataset.acc;
      if (!header) return;

      if (key && key in saved) section.classList.toggle('open', !!saved[key]);

      header.addEventListener('click', function () {
        section.classList.toggle('open');
        if (!key) return;
        var cur = window.storage.get('accOpen', {}) || {};
        cur[key] = section.classList.contains('open');
        window.storage.set('accOpen', cur);
      });
    });
  }

  // ─── Launcher modal ──────────────────────────────────────────────────────
  function openLauncher() {
    var modal = document.getElementById('launcher-modal');
    if (modal) {
      // Update the sidebar button text based on current state
      var sidebarBtn = document.getElementById('launcher-sidebar');
      if (sidebarBtn) {
        var isOpen = window.getState().sidebarOpen;
        sidebarBtn.textContent = isOpen ? window.__i18n__.t('closeSidebar') : window.__i18n__.t('openSidebar');
      }
      modal.classList.add('visible');
    }
  }

  function closeLauncher() {
    var modal = document.getElementById('launcher-modal');
    if (modal) modal.classList.remove('visible');
  }

  function initLauncher() {
    var modal       = document.getElementById('launcher-modal');
    var closeBtn    = document.getElementById('launcher-close');
    var dashBtn     = document.getElementById('launcher-dashboard');
    var helpBtn     = document.getElementById('launcher-help');
    var notesBtn    = document.getElementById('launcher-notes');
    var sidebarBtn  = document.getElementById('launcher-sidebar');
    if (!modal) return;

    closeBtn.addEventListener('click', closeLauncher);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeLauncher();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('visible')) closeLauncher();
    });

    dashBtn.addEventListener('click', function () {
      if (typeof window.setViewMode === 'function') window.setViewMode('analytics');
      closeLauncher();
    });

    helpBtn.addEventListener('click', function () {
      window.storage.set('hintDismissed', false);
      if (typeof window.__onboardingShow__ === 'function') window.__onboardingShow__();
      closeLauncher();
    });

    notesBtn.addEventListener('click', function () {
      if (typeof window.setViewMode === 'function') window.setViewMode('notes');
      closeLauncher();
    });

    sidebarBtn.addEventListener('click', function () {
      var nextState = !window.getState().sidebarOpen;
      window.setState({ sidebarOpen: nextState });
      localStorage.setItem('sidebarOpen', String(nextState));
      closeLauncher();
    });
  }

  // Expose
  window.initNav = initNav;
})();