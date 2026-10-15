window.addEventListener('DOMContentLoaded', () => {
  const navbar = document.body.querySelector('#mainNav');

  // Desktop Navbar Shrink
  const navbarShrink = () => {
    if (!navbar) {
      return;
    }

    if (window.scrollY === 0) {
      navbar.classList.remove('navbar-shrink');
    } else {
      navbar.classList.add('navbar-shrink');
    }
  };

  navbarShrink();
  document.addEventListener('scroll', navbarShrink, { passive: true });

  // ==========================================================================
  // Revolut-Style Mobile Bottom Dock Animation (Shrink on Scroll Down, Expand on Scroll Up)
  // ==========================================================================
  let lastScrollY = Math.max(0, window.scrollY || window.pageYOffset || 0);
  let ticking = false;

  const handleMobileNavScroll = () => {
    if (!navbar) {
      ticking = false;
      return;
    }

    const currentScrollY = Math.max(0, window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0);

    // Only apply on smartphone / tablet bottom dock screens (< 992px)
    if (window.innerWidth < 992) {
      // Always show expanded dock with labels when at or near the top
      if (currentScrollY <= 30) {
        navbar.classList.remove('nav-compact');
      } else {
        const delta = currentScrollY - lastScrollY;

        // Scrolling DOWN -> shrink into compact pill (smaller icons, labels hidden)
        if (delta > 6 && currentScrollY > 50) {
          navbar.classList.add('nav-compact');
        }
        // Scrolling UP -> smoothly restore normal dock with full labels
        else if (delta < -6) {
          navbar.classList.remove('nav-compact');
        }
      }
    } else {
      navbar.classList.remove('nav-compact');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleMobileNavScroll);
      ticking = true;
    }
  }, { passive: true });

  // Handle orientation change and resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && navbar) {
      navbar.classList.remove('nav-compact');
    }
  }, { passive: true });

  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const navbarCollapse = document.body.querySelector('#navbarResponsive');
  const responsiveNavItems = document.body.querySelectorAll('#navbarResponsive .nav-link');
  const toggleIcon = document.body.querySelector('.nav-toggle-icon');

  if (navbarCollapse && toggleIcon) {
    navbarCollapse.addEventListener('show.bs.collapse', () => {
      toggleIcon.classList.remove('bi-grid-fill');
      toggleIcon.classList.add('bi-x-lg');
    });
    navbarCollapse.addEventListener('hide.bs.collapse', () => {
      toggleIcon.classList.remove('bi-x-lg');
      toggleIcon.classList.add('bi-grid-fill');
    });
  }

  const revolutTabs = document.querySelectorAll('.revolut-tab');
  revolutTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      revolutTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  document.querySelectorAll('[role="button"][data-bs-toggle="modal"]').forEach((trigger) => {
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        trigger.click();
      }
    });
  });
});
