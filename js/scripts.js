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
