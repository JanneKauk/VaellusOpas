'use strict';
const navOpen = () => {
  const burger = document.querySelector('.hamburger');
  const nav = document.querySelector('.buttons');
  const navLinks = document.querySelectorAll('.buttons li');

  burger.addEventListener('click', () => {
    //Toggle Nav
    nav.classList.toggle('nav-active');

    //Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `buttonsFade 0.5s ease forwards ${index / 5 +
        0.3}s`;
      }
    });
    //Burger animation
    burger.classList.toggle('toggle');
  });
};

navOpen();
