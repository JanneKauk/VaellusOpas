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
        setTimeout(function(){document.querySelector('.header').style = 'clip-path: polygon(0 0, 100% 0, 100% 100%, 0 86%);';}, 450);
      } else {
        link.style.animation = `buttonsFade 0.5s ease forwards ${index / 5 +
        0.3}s`;
        document.querySelector('.header').style = 'clip-path: unset;';
      }
    });
    //Burger animation
    burger.classList.toggle('toggle');
  });
};

navOpen();
