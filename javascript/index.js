'use strict'
/*const navSlide = () => {
  const burger = document.querySelector(".hamburger");
  const nav = document.querySelector(".buttons");

  burger.addEventListener('click', () => {
    nav.classList.toggle("nav-active");
  });
}*/

//navSlide();
/*function testi () {
  alert("testi");
}*/

const burger2 = document.querySelector(".hamburger");

burger2.addEventListener('click', () => {
  alert("testi");
  document.querySelector('.hamburger').style = "transform: scale(2);"

});
