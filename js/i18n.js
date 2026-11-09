/**
 * i18n.js — classic script.
 * Applies translations to DOM elements with data-i18n attributes.
 * Exposes window.__i18n__ with apply() and t() methods.
 */
(function () {
  'use strict';

  var locales = window.__LOCALES__ || {};
  var codes = Object.keys(locales);

  if (codes.length === 0) {
    console.warn('[i18n] no locales loaded');
    window.__i18n__ = {
      apply: function () {},
      get: function () { return 'en'; },
      codes: [],
      t: function (key) { return key; }
    };
    return;
  }

  var SHORT = { en: 'EN', vi: 'VI' };

  function apply(lang) {
    if (codes.indexOf(lang) === -1) lang = codes[0];

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);

    var dict = locales[lang] || {};

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      if (dict[key] != null) el.setAttribute('title', dict[key]);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (dict[key] != null) el.setAttribute('aria-label', dict[key]);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] != null) el.setAttribute('placeholder', dict[key]);
    });

    // Update language toggle label
    var label = document.getElementById('lang-toggle-label');
    if (label) label.textContent = SHORT[lang] || lang.toUpperCase();

    // Notify state (main.js will persist it)
    if (typeof window.setState === 'function') {
      window.setState({ lang: lang });
    }

    // Notify dependent modules
    if (typeof window.refreshExamLanguage === 'function') {
      try { window.refreshExamLanguage(); } catch (e) {}
    }
  }

  function t(key) {
    var current = (window.getState && window.getState().lang) || codes[0];
    var dict = locales[current] || {};
    if (dict[key] != null) return dict[key];
    var fallback = locales[codes[0]] || {};
    if (fallback[key] != null) return fallback[key];
    return key;
  }

  // Expose globally
  window.__i18n__ = {
    apply: apply,
    get: function () {
      return (window.getState && window.getState().lang) || codes[0];
    },
    codes: codes,
    t: t
  };
})();