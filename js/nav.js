/**
 * nav.js — classic script.
 * -----------------------------------------------------------------------------
 * Wires up:
 *   • Sidebar toggle (hamburger) and Launcher modal
 *   • Theme toggle (dark/light/cybersecurity)
 *   • Language toggle (EN ↔ VI)
 *   • Contact Us modal
 * -----------------------------------------------------------------------------
 */
(function () {
  'use strict';

  function initNav() {
    initSidebarAndLauncher();
    initTheme();
    initLang();
  }

  // ─── Sidebar & Launcher ──────────────────────────────────────────────────
  function initSidebarAndLauncher() {
    var wrapper = document.getElementById('sidebar-wrapper');
    var tab = document.getElementById('sidebar-toggle');
    var modal = document.getElementById('launcher-modal');
    var closeBtn = document.getElementById('launcher-close');
    var dashBtn = document.getElementById('launcher-dashboard');
    var helpBtn = document.getElementById('launcher-help');
    var notesBtn = document.getElementById('launcher-notes');
    var sidebarBtn = document.getElementById('launcher-sidebar');
    
    if (!wrapper || !tab || !modal) return;

    var mq = window.matchMedia('(max-width: 700px)');

    // Apply the open/closed state to the DOM
    function applyOpen() {
      var open = window.getState().sidebarOpen;

      if (mq.matches) {
        // Mobile: slide the overlay up/down using top (avoids transform trapping fixed children)
        var sidebar = wrapper.querySelector('.controls-sidebar');
        if (sidebar) {
          sidebar.style.transform = '';
          sidebar.style.top = open ? '0' : '-100%';
        }
      } else {
        // Desktop: standard collapse
        var sidebar = wrapper.querySelector('.controls-sidebar');
        if (sidebar) { 
          sidebar.style.transform = ''; 
          sidebar.style.top = ''; 
        }
        wrapper.classList.toggle('open', open);
        wrapper.classList.toggle('collapsed', !open);
      }

      var title = open ? 'Close sidebar' : 'Open sidebar';
      tab.title = title;
      tab.setAttribute('aria-label', title);
    }

    // Default state setup based on screen size
    function setDefault() {
      if (mq.matches) {
        window.setState({ sidebarOpen: false });
      } else {
        var saved = window.storage.get('sidebarOpen');
        window.setState({ sidebarOpen: saved !== false }); // default to open if null
      }
    }

    setDefault();

    // Handle screen resize
    var lastMatch = mq.matches;
    mq.addEventListener('change', function (e) {
      if (e.matches === lastMatch) return;
      lastMatch = e.matches;
      
      if (e.matches) {
        // Desktop to mobile: force closed
        window.setState({ sidebarOpen: false });
      }
      applyOpen();
    });

    // Sidebar open/close reactive to state
    window.subscribe(function (state, prev) {
      if (state.sidebarOpen !== prev.sidebarOpen) {
        applyOpen();
        // Persist the new state
        if (!mq.matches) {
          window.storage.set('sidebarOpen', state.sidebarOpen);
        }
      }
    });

    applyOpen();

    // ─── Launcher Modal Logic ───
    function openLauncher() {
      if (sidebarBtn) {
        var isOpen = window.getState().sidebarOpen;
        sidebarBtn.textContent = isOpen ? window.__i18n__.t('closeSidebar') : window.__i18n__.t('openSidebar');
      }
      modal.classList.add('visible');
      modal.setAttribute('aria-hidden', 'false');
    }

    function closeLauncher() {
      modal.classList.remove('visible');
      modal.setAttribute('aria-hidden', 'true');
    }

    // Toggle modal when hamburger is clicked
    tab.addEventListener('click', function () {
      if (modal.classList.contains('visible')) {
        closeLauncher();
      } else {
        openLauncher();
      }
    });

    // Modal close bindings
    if (closeBtn) closeBtn.addEventListener('click', closeLauncher);
    
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeLauncher();
    });
    
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('visible')) closeLauncher();
    });

    // Modal action bindings
    if (dashBtn) {
      dashBtn.addEventListener('click', function () {
        if (typeof window.setViewMode === 'function') window.setViewMode('analytics');
        closeLauncher();
      });
    }

    if (helpBtn) {
      helpBtn.addEventListener('click', function () {
        window.storage.set('hintDismissed', false);
        if (typeof window.__onboardingShow__ === 'function') window.__onboardingShow__();
        closeLauncher();
      });
    }

    if (notesBtn) {
      notesBtn.addEventListener('click', function () {
        if (typeof window.setViewMode === 'function') window.setViewMode('notes');
        closeLauncher();
      });
    }

    if (sidebarBtn) {
      sidebarBtn.addEventListener('click', function () {
        window.setState({ sidebarOpen: !window.getState().sidebarOpen });
        closeLauncher();
      });
    }

    // ─── Contact Us Modal Logic ───
    var regBtn = document.getElementById('launcher-register');
    var regModal = document.getElementById('register-modal');
    var regCancel = document.getElementById('register-cancel');

    if (regBtn && regModal) {
      regBtn.addEventListener('click', function(e) {
        e.preventDefault();
        regModal.classList.add('visible');
        regModal.setAttribute('aria-hidden', 'false');
      });
    }
    if (regCancel && regModal) {
      regCancel.addEventListener('click', function() {
        regModal.classList.remove('visible');
        regModal.setAttribute('aria-hidden', 'true');
      });
    }
    if (regModal) {
      regModal.addEventListener('click', function(e) { 
        if (e.target === regModal) {
          regModal.classList.remove('visible');
          regModal.setAttribute('aria-hidden', 'true');
        }
      });
    }
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

      var next = themes[(currentIndex + 1) % themes.length];
      window.setState({ theme: next });
    });

    window.subscribe(function (state, prev) {
      if (state.theme !== prev.theme) {
        document.documentElement.setAttribute('data-theme', state.theme);
        window.storage.set('theme', state.theme);
      }
    });
  }

  // ─── Language ────────────────────────────────────────────────────────────
  function initLang() {
    var btn = document.getElementById('lang-toggle');
    if (!btn || !window.__i18n__) return;

    var codes = window.__i18n__.codes;
    var current = window.getState().lang || codes[0];
    window.__i18n__.apply(current);

    btn.addEventListener('click', function () {
      var idx = codes.indexOf(window.__i18n__.get());
      var next = codes[(idx + 1) % codes.length];
      
      window.setState({ lang: next });
      window.__i18n__.apply(next);
    });
  }

  window.initNav = initNav;
})();