window.addEventListener('load', () => {
  const navLinks = document.querySelectorAll('#nb-nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href').substring(1); 
      const targetElement = document.getElementById(targetId);
      const offset = 206; 
      const targetPosition = targetElement.offsetTop - offset; 

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth' 
      });
    });

    });
  });

  // Ditt befintliga script för att hålla navbaren fast vid toppen av sidan
  const nav = document.querySelector('#nb-nav');
  const stickyClass = 'sticky';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      nav.classList.add(stickyClass);
    } else {
      nav.classList.remove(stickyClass);
    }
  });


document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll('#nb-nav .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Ta bort "active" från alla länkar
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Lägg till "active" på den klickade länken
      link.classList.add('active');
    });
  });

  const navbarToggleButton = document.querySelector('#nb-nav button[data-bs-toggle="collapse"]');

  navbarToggleButton.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const navbar = document.querySelector('#nb-nav');

      if (isExpanded) {
          navbar.classList.add('nb-background');
      } else {
          navbar.classList.remove('nb-background');
      }
  });

  const sections = document.querySelectorAll('.slide-transition');

  function checkVisibility() {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 0.9) { // Adjust 0.75 to control when the animation should trigger
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
  
  checkVisibility();
});


