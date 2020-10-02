'use strict';
const navSlide = () => {
  const burger = document.querySelector('.hamburger');
  const nav = document.querySelector('.buttons');
  const buttons = document.querySelectorAll('.buttons li');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    buttons.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `buttonsFade 0.5s ease forwards ${index / 5 +
        0.3}s`;
      }
    });
  });
};

navSlide();
