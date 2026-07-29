document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const menuItems = document.querySelectorAll('.sidebar .menu-item');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; 
  }

  // Toggle on hamburger click
  if(menuToggle) {
    menuToggle.addEventListener('click', function() {
      if(sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  // Close on overlay click
  if(overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Auto-close when a menu item is clicked (for navigating SPAs on mobile)
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      // Only auto-close if on mobile view
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    });
  });
});
