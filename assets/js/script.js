document.addEventListener('DOMContentLoaded', () => {
  
  // Loader
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  }

  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Back to Top Button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Active Navigation Highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('href') === currentPage) {
      item.classList.add('active');
    }
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Open current if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Animated Counters
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const duration = 2000;
          const step = target / (duration / 16); // 60fps
          
          let current = 0;
          const updateCounter = () => {
            current += step;
            if (current < target) {
              // Format with K, M, etc if needed, or just locale string
              if (target >= 1000000) {
                counter.innerText = (current / 1000000).toFixed(1) + 'M+';
              } else if (target >= 1000) {
                counter.innerText = Math.floor(current).toLocaleString() + '+';
              } else {
                counter.innerText = Math.floor(current) + '+';
              }
              requestAnimationFrame(updateCounter);
            } else {
              if (target >= 1000000) {
                counter.innerText = (target / 1000000).toFixed(0) + 'M+';
              } else {
                counter.innerText = target.toLocaleString() + '+';
              }
            }
          };
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
  }

});
