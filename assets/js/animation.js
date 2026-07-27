document.addEventListener('DOMContentLoaded', () => {
  
  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: Stop observing once revealed
          // observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
  }

  // Parallax Effect for Hero Background
  const heroParallax = document.querySelector('.hero-parallax');
  if (heroParallax) {
    window.addEventListener('scroll', () => {
      const scrollValue = window.scrollY;
      heroParallax.style.transform = `translateY(${scrollValue * 0.4}px)`;
    });
  }

  // Floating Elements Mouse Move Effect (Subtle Parallax)
  const floatingCards = document.querySelectorAll('.service-card.float');
  if (floatingCards.length > 0 && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      
      floatingCards.forEach(card => {
        card.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // Ripple Effect for Buttons
  const buttons = document.querySelectorAll('.btn, .ripple-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      let x = e.clientX - e.target.getBoundingClientRect().left;
      let y = e.clientY - e.target.getBoundingClientRect().top;
      
      let ripples = document.createElement('span');
      ripples.classList.add('ripple-element');
      ripples.style.left = x + 'px';
      ripples.style.top = y + 'px';
      
      this.appendChild(ripples);
      
      setTimeout(() => {
        ripples.remove();
      }, 600);
    });
  });

});
