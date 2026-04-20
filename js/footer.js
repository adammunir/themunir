// Footer component loader
(function() {
  'use strict';

  function ensureNavStylesheet() {
    const hasNavStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .some(link => (link.getAttribute('href') || '').includes('styles/nav.css'));

    if (hasNavStyles) {
      return;
    }

    const navStyles = document.createElement('link');
    navStyles.rel = 'stylesheet';
    navStyles.href = '/styles/nav.css';
    document.head.appendChild(navStyles);
  }

  function getCurrentPageKey() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    const page = (parts[parts.length - 1] || '').toLowerCase();
    const params = new URLSearchParams(window.location.search);

    if ((page === '' || page === 'index' || page === 'index.html') && params.get('tab') === 'Play') {
      return 'play';
    }

    if ((page === '' || page === 'index' || page === 'index.html') && window.location.hash === '#work') {
      return 'work';
    }

    if (page === '' || page === 'index' || page === 'index.html') {
      return 'home';
    }

    if (page === 'about' || page === 'about.html') {
      return 'about';
    }

    if (page === 'resume' || page === 'resume.html') {
      return 'resume';
    }

    if (page === 'contact' || page === 'contact.html') {
      return 'contact';
    }

    return '';
  }

  function buildNavItem(href, label, key, currentKey) {
    const isCurrent = key && key === currentKey;
    return [
      `<a href="${href}" class="tm-nav-link${isCurrent ? ' is-current' : ''}"${isCurrent ? ' aria-current="page"' : ''}>`,
      `<span class="tm-nav-label">${label}</span>`,
      '</a>'
    ].join('');
  }

  function normalizeNavigation() {
    ensureNavStylesheet();

    document.querySelectorAll('.menu-holder1').forEach(node => node.remove());
    document.querySelectorAll('.menu-holder:not(.case-study-bottom-nav-elements-wrapper)').forEach(node => node.remove());
    document.querySelectorAll('.tm-site-nav').forEach(node => node.remove());

    const currentKey = getCurrentPageKey();
    const page = (window.location.pathname.split('/').filter(Boolean).pop() || '').toLowerCase();
    const isHome = page === '' || page === 'index' || page === 'index.html';
    const shouldOffsetContent = !isHome;

    document.body.classList.remove('shared-nav-offset');
    if (shouldOffsetContent) {
      document.body.classList.add('shared-nav-offset');
    }

    const navMarkup = [
      '<header class="tm-site-nav" aria-label="Primary navigation">',
      '<a href="/" class="tm-nav-brand" aria-label="Adam Munir home">',
      '<img src="/img/themunirLogo.svg" alt="Adam Munir" class="tm-nav-brand-logo">',
      '</a>',
      '<nav class="tm-nav-links">',
      buildNavItem('/', 'Home', 'home', currentKey),
      buildNavItem('/#work', 'Work', 'work', currentKey),
      buildNavItem('/?tab=Play', 'Play', 'play', currentKey),
      buildNavItem('/about/', 'About', 'about', currentKey),
      buildNavItem('/resume/', 'Resume', 'resume', currentKey),
      buildNavItem('/contact/', 'Contact', 'contact', currentKey),
      '</nav>',
      '</header>'
    ].join('');

    const topAnchor = document.getElementById('top');
    if (topAnchor) {
      topAnchor.insertAdjacentHTML('afterend', navMarkup);
    } else {
      document.body.insertAdjacentHTML('afterbegin', navMarkup);
    }
  }

  function normalizeScrollTopButton() {
    document.querySelectorAll('.menu-holder.case-study-bottom-nav-elements-wrapper').forEach(node => node.remove());
    document.querySelectorAll('.site-scroll-top-anchor').forEach(node => node.remove());

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'site-scroll-top-anchor';
    buttonWrapper.innerHTML = [
      '<button class="site-scroll-top" type="button" aria-label="Scroll back to top">',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
      '<path d="M12 19V5"></path>',
      '<path d="M6 11l6-6 6 6"></path>',
      '</svg>',
      '<span class="sr-only">Back to top</span>',
      '</button>'
    ].join('');

    document.body.appendChild(buttonWrapper);

    const scrollButton = buttonWrapper.querySelector('.site-scroll-top');
    const toggleVisibility = function() {
      scrollButton.classList.toggle('is-visible', window.scrollY > 480);
    };

    scrollButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
  }
  
  // Update current year
  function updateYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // Load footer HTML
  function loadFooter() {
    const footerPlaceholder = document.querySelector('.footer-placeholder');
    if (!footerPlaceholder) {
      // If no placeholder, try to find existing footer and replace it
      const existingFooter = document.querySelector('.footer');
      if (existingFooter) {
        fetch('/footer.html')
          .then(response => response.text())
          .then(html => {
            existingFooter.outerHTML = html;
            updateYear();
          })
          .catch(error => {
            console.warn('Could not load footer component:', error);
          });
      }
    } else {
      fetch('/footer.html')
        .then(response => response.text())
        .then(html => {
          footerPlaceholder.outerHTML = html;
          updateYear();
        })
        .catch(error => {
          console.warn('Could not load footer component:', error);
        });
    }
  }
  
  // Load footer when DOM is ready
  function initSiteChrome() {
    normalizeNavigation();
    normalizeScrollTopButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initSiteChrome();
      loadFooter();
    });
  } else {
    initSiteChrome();
    loadFooter();
  }
})();
