document.addEventListener("DOMContentLoaded", function() {
  const nav = document.querySelector('#nb-nav');
  const navLinks = document.querySelectorAll('#nb-nav a');
  const navbarToggleButton = document.querySelector('#nb-nav button[data-bs-toggle="collapse"]');
  const focusableElements = document.querySelectorAll('.navbar-nav a');
  const stickyClass = 'sticky';
  const sections = document.querySelectorAll('.slide-transition');
  let firstFocusableElement, lastFocusableElement;
  let isMobile = false;
  let isExpanded = false;


//Click on links - nav

if(window.innerWidth < 992){
  isMobile = true;
}
else{
  isMobile = false;
}

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      let targetId = event.target.getAttribute('href'); 
      let targetElement = '';
      let targetPosition = 0;
      let offset = 200; 

      if(targetId == '#'){
        targetId = event.target.getAttribute('href');
        targetPosition = 0;
      }
      else{
        targetId = targetId.substring(1);
        targetElement = document.getElementById(targetId);
        targetPosition = targetElement.offsetTop - offset; 
      }


      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth' 
      });
    });
  });

// add sticky
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      nav.classList.add(stickyClass);
    } else {
      nav.classList.remove(stickyClass);
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
    }
  });


  // const navLinks = document.querySelectorAll('#nb-nav .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Ta bort "active" från alla länkar
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Lägg till "active" på den klickade länken
      link.classList.add('active');
      if(isMobile){
        navbarToggleButton.click(); 
      }
    });
  });


  //mobilmeny 

  if(isMobile){

    function setFocusableElements() {
      firstFocusableElement = focusableElements[0];
      lastFocusableElement = focusableElements[focusableElements.length - 1];
    }
    function trapFocus(e) {
      if (e.key === 'Tab') {
          if (e.shiftKey) { // Skift + Tab
              if (document.activeElement === firstFocusableElement) {
                  e.preventDefault();
                  lastFocusableElement.focus();
              }
          } else { // Endast Tab
              if (document.activeElement === lastFocusableElement) {
                  e.preventDefault();
                  firstFocusableElement.focus();
              }
          }
      }
    }

    function handleEscapeKey(e) {
      if (e.key === 'Escape') {
        console.log('är i handleEscapeKey');
        if (isExpanded) {
          navbarToggleButton.click(); 
        }
      }
  }
  
  function handleClickOutside(e) {
      if (!nav.contains(e.target)) {
        console.log('är i handleClickOutside');
        if (isExpanded) {
          navbarToggleButton.click(); 
        }
      }
  }


    navbarToggleButton.addEventListener('click', function () {
      isExpanded = this.getAttribute('aria-expanded') === 'true';

      if(isExpanded && isMobile){
        nav.classList.add('nb-background');
        setFocusableElements();
        document.addEventListener('keydown', trapFocus);
        navbarToggleButton.classList.add('open');
      }
      else{
        nav.classList.remove('nb-background');
        document.removeEventListener('keydown', trapFocus);
        navbarToggleButton.focus();
        navbarToggleButton.classList.remove('open');
      }
    });



    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
  }




//animation slide up
  function checkVisibility() {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 1) { // Adjust 0.75 to control when the animation should trigger
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


