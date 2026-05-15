window.addEventListener('DOMContentLoaded', () => {
  const navbar = document.body.querySelector('#mainNav');

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
  document.addEventListener('scroll', navbarShrink);

  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = document.body.querySelectorAll('#navbarResponsive .nav-link');

  responsiveNavItems.forEach((responsiveNavItem) => {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
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
