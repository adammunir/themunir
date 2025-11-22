// Footer component loader
(function() {
  'use strict';
  
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
        fetch('footer.html')
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
      fetch('footer.html')
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
  } else {
    loadFooter();
  }
})();

