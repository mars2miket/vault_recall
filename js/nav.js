/**
 * nav.js — classic script.
 * -----------------------------------------------------------------------------
 * Wires up:
 *   • Sidebar toggle (hamburger) with desktop + mobile persistence
 *   • Playback bar placement (mobile: docked to app shell; desktop: in sidebar)
 *   • Theme toggle (dark/light/cybersecurity)
 *   • Language toggle (EN ↔ VI)
 *   • Accordion sections in the sidebar
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
        wrapper.classList.toggle('collapsed', !open);
        wrapper.classList.toggle('open', open);
      } else {
        wrapper.classList.toggle('open', open);
        wrapper.classList.toggle('collapsed', !open);
      }

      var title = open ? 'Close sidebar' : 'Open sidebar';
      tab.title = title;
      tab.setAttribute('aria-label', title);
    }

    function setDefault() {
      var savedState = localStorage.getItem('sidebarOpen');
      if (savedState !== null) {
        window.setState({ sidebarOpen: savedState === 'true' });
      } else {
        window.setState({ sidebarOpen: !mq.matches });
      }
    }

    setDefault();

    var lastMatch = mq.matches;
    mq.addEventListener('change', function (e) {
      if (e.matches === lastMatch) return;
      lastMatch = e.matches;
      applyOpen();
    });

    tab.addEventListener('click', function () {
      var nextState = !window.getState().sidebarOpen;
      window.setState({ sidebarOpen: nextState });
      localStorage.setItem('sidebarOpen', String(nextState));
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

  // Expose
  window.initNav = initNav;
})();