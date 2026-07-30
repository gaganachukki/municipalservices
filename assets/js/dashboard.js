// Utility and Dashboard specific functions

document.addEventListener('DOMContentLoaded', () => {

  // Form Validation
  const forms = document.querySelectorAll('.validate-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
          // simple inline error logic
          let err = input.nextElementSibling;
          if (!err || !err.classList.contains('error-msg')) {
            err = document.createElement('span');
            err.classList.add('error-msg');
            err.style.color = 'red';
            err.style.fontSize = '0.8rem';
            err.innerText = 'This field is required';
            input.parentNode.insertBefore(err, input.nextSibling);
          }
        } else {
          input.classList.remove('error');
          let err = input.nextElementSibling;
          if (err && err.classList.contains('error-msg')) {
            err.remove();
          }
        }
      });
      
      if (isValid) {
        // Show success message (simulate)
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
          btn.innerHTML = 'Success!';
          btn.style.backgroundColor = '#4CAF50';
          
          const actionUrl = form.getAttribute('action');
          if (actionUrl && actionUrl !== '#' && actionUrl !== '') {
            window.location.href = actionUrl;
            return;
          }
          
          // Redirect to 404 for all mock forms
          window.location.href = '404.html';
          
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
            btn.disabled = false;
          }, 3000);
        }, 1500);
      }
    });
  });

  // Simple Notification System
  window.showNotification = function(message, type = 'success') {
    const notif = document.createElement('div');
    notif.className = `notification notification-${type} reveal-left`;
    notif.style.position = 'fixed';
    notif.style.bottom = '20px';
    notif.style.left = '20px';
    notif.style.padding = '15px 25px';
    notif.style.background = type === 'success' ? '#4CAF50' : '#F44336';
    notif.style.color = 'white';
    notif.style.borderRadius = '8px';
    notif.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    notif.style.zIndex = '9999';
    notif.innerHTML = message;
    
    document.body.appendChild(notif);
    
    // trigger animation
    setTimeout(() => notif.classList.add('active'), 10);
    
    setTimeout(() => {
      notif.classList.remove('active');
      setTimeout(() => notif.remove(), 800);
    }, 4000);
  };
});


// Catch all unused buttons and links in the dashboard
document.addEventListener('DOMContentLoaded', () => {
    const interactables = document.querySelectorAll('button, a');
    interactables.forEach(el => {
        // Skip specific functional elements
        if (el.hasAttribute('data-target')) return;
        if (el.classList.contains('hamburger')) return;
        if (el.classList.contains('profile-toggle')) return;
        
        // Skip links that already have a valid destination
        if (el.tagName.toLowerCase() === 'a') {
            const href = el.getAttribute('href');
            if (href && href !== '#' && href !== '') return;
        }

        // Skip submit buttons (handled by forms)
        if (el.tagName.toLowerCase() === 'button' && el.type === 'submit') {
            return;
        }
        
        // Skip elements that already have an onclick handler
        if (el.hasAttribute('onclick')) return;

        // Redirect all other unused buttons to 404
        el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '404.html';
        });
    });
});
