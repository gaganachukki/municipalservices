document.addEventListener('DOMContentLoaded', () => {
  // Dynamic User Profile Population based on Login Email
  const savedEmail = localStorage.getItem('userEmail');
  if (savedEmail) {
    // Extract name from email (e.g. john.doe@example.com -> John Doe)
    const emailPrefix = savedEmail.split('@')[0];
    const nameParts = emailPrefix.split(/[._-]/);
    const formattedName = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    
    // Extract initials (e.g. John Doe -> JD, Rajesh -> R)
    let initials = '';
    if (nameParts.length >= 2) {
      initials = nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    } else {
      initials = nameParts[0].substring(0, 2).toUpperCase();
    }

    // Update Left Side - Display Name
    const headerNameElem = document.querySelector('.header-left .header-name');
    if (headerNameElem) {
      // Keep the verified icon if it exists
      const iconHTML = headerNameElem.innerHTML.includes('<i') ? headerNameElem.innerHTML.substring(headerNameElem.innerHTML.indexOf('<i')) : '';
      headerNameElem.innerHTML = formattedName + ' ' + iconHTML;
    }

    // Update Right Side - Display Full Email
    const userNameElem = document.querySelector('.header-right .user-name');
    if (userNameElem) {
      userNameElem.textContent = savedEmail;
      // Optionally adjust styling so long emails don't break layout
      userNameElem.style.wordBreak = 'break-all';
      userNameElem.style.maxWidth = '200px';
    }

    // Populate Profile Form Inputs if they exist
    const profileFirstName = document.getElementById('profileFirstName');
    const profileLastName = document.getElementById('profileLastName');
    const profileEmail = document.getElementById('profileEmail');

    if (profileFirstName) {
      profileFirstName.value = nameParts.length >= 1 ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : '';
    }
    if (profileLastName) {
      // If there are multiple parts (like a dot or underscore), use the last part as Last Name. Otherwise, just use 'User' or leave blank.
      profileLastName.value = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].slice(1) : 'User';
    }
    if (profileEmail) {
      profileEmail.value = savedEmail;
    }

    // Update Profile Logo (Initials)
    const avatarElems = document.querySelectorAll('.initials-avatar');
    avatarElems.forEach(el => {
      el.textContent = initials;
    });
  }

  const menuItems = document.querySelectorAll('.menu-item');
  const views = document.querySelectorAll('.dashboard-view');

  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Find closest menu-item just in case an inner element is clicked
      const targetItem = e.target.closest('.menu-item');
      if (!targetItem) return;

      const targetViewId = targetItem.getAttribute('data-target');
      if (!targetViewId) return; // If it's a link like logout that doesn't have a data-target

      e.preventDefault();

      // Remove active class from all menu items
      menuItems.forEach(mi => mi.classList.remove('active'));
      // Add active class to clicked item
      targetItem.classList.add('active');

      // Hide all views and remove active animation class
      views.forEach(view => {
        view.classList.remove('active');
      });

      // Show the target view
      const targetView = document.getElementById(targetViewId);
      if (targetView) {
        targetView.classList.add('active');
        // Scroll to top of main content smoothly
        document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
});
