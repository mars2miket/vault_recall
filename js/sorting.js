/**
 * --- SPREADSHEET ROW-SYNCHRONIZED SORTING ENGINE ---
 * Sorts the state rows, then asks grid.js to re-render.
 */

function sortSpreadsheetByColumn(letter) {
  var state = window.getState();
  var rows = (state.rows || []).slice();

  // Keep only rows that have content in at least one column
  var filled = rows.filter(function (r) {
    return (r.a && r.a.trim()) || (r.b && r.b.trim());
  });

  if (filled.length === 0) return;

  // Track sort direction per column
  var dirKey = letter === 'A' ? 'sortDirA' : 'sortDirB';
  var currentDir = window.__sortDirs__ && window.__sortDirs__[dirKey];
  var nextDir = currentDir === 'asc' ? 'desc' : 'asc';

  window.__sortDirs__ = window.__sortDirs__ || {};
  window.__sortDirs__[dirKey] = nextDir;

  filled.sort(function (rowX, rowY) {
    var textX = ((letter === 'A' ? rowX.a : rowX.b) || '').toLowerCase();
    var textY = ((letter === 'A' ? rowY.a : rowY.b) || '').toLowerCase();

    if (textX === '' && textY !== '') return 1;
    if (textX !== '' && textY === '') return -1;
    if (textX === '' && textY === '') return 0;

    return textX.localeCompare(textY);
  });

  if (nextDir === 'desc') filled.reverse();

  // Always append one trailing blank row (grid.js also enforces this)
  filled.push({ a: '', b: '' });

  window.setState({ rows: filled });

  // Force the grid to re-render from the new state
  if (typeof window.__gridRerender__ === 'function') {
    window.__gridRerender__();
  }
  if (typeof window.updateCharCount === 'function') {
    window.updateCharCount();
  }
  if (typeof window.syncStartTestButton === 'function') {
    window.syncStartTestButton();
  }
}

function initializeSortingControls() {
  var container = document.getElementById('spreadsheet-container');
  if (!container) return;

  container.querySelectorAll('.header-cell').forEach(function (headerEl) {
    var columnLetter = headerEl.dataset.col;
    var sortBtn = headerEl.querySelector('.header-sort-btn');

    if (sortBtn) {
      sortBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        sortSpreadsheetByColumn(columnLetter);
      });
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSortingControls);
} else {
  initializeSortingControls();
}

/**
 * duplicates.js — classic script.
 * Highlights duplicate cells within a column (warning only, never blocks editing).
 * Works from the DOM, so it needs no changes to grid.js.
 */
(function () {
  'use strict';

  var container = null, timer = null;

  function t(key, fb) {
    var v = (window.__i18n__ && window.__i18n__.t) ? window.__i18n__.t(key) : null;
    return (v && v !== key) ? v : fb;
  }

  function scan() {
    if (!container) return;
    var cells = container.querySelectorAll('.data-cell');
    var seen = { A: {}, B: {} };

    cells.forEach(function (c) {
      c.classList.remove('dup-cell');
      if (c.dataset.dup) { c.removeAttribute('title'); delete c.dataset.dup; }
      var col = c.dataset.col;
      if (!seen[col]) return;
      if (c.querySelector('.col-hidden')) return;          // masked: don't leak hints
      var key = (c.textContent || '').trim().toLowerCase();
      if (!key) return;
      (seen[col][key] = seen[col][key] || []).push(c);
    });

    ['A', 'B'].forEach(function (col) {
      Object.keys(seen[col]).forEach(function (key) {
        var group = seen[col][key];
        if (group.length < 2) return;
        group.forEach(function (c) {
          c.classList.add('dup-cell');
          c.dataset.dup = '1';
          c.title = t('dupWarning', 'Duplicate in this column');
        });
      });
    });
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(scan, 200);
  }

  function init() {
    container = document.getElementById('spreadsheet-container');
    if (!container) return;
    new MutationObserver(schedule).observe(container, {
      childList: true, subtree: true, characterData: true
    });
    container.addEventListener('input', schedule);
    if (typeof window.subscribe === 'function') {
      window.subscribe(function (state, prev) {
        if (state.lang !== prev.lang || state.colHidden !== prev.colHidden) schedule();
      });
    }
    schedule();
  }

  window.initDuplicates = init;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
