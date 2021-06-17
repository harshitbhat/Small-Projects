'use strict';

const menuBars = document.querySelector('#menu-bars');
const overlay = document.querySelector('#overlay');

const nav1 = document.querySelector('#nav-1');
const nav2 = document.querySelector('#nav-2');
const nav3 = document.querySelector('#nav-3');
const nav4 = document.querySelector('#nav-4');
const nav5 = document.querySelector('#nav-5');

const navItems = [nav1, nav2, nav3, nav4, nav5];

function navAnimation(toRemove, toAdd) {
  navItems.forEach((nav, idx) => {
    nav.classList.replace(
      `slide-${toRemove}-${idx + 1}`,
      `slide-${toAdd}-${idx + 1}`
    );
  });
}

function toggleNav() {
  // Toggle Menu bars - open / close
  menuBars.classList.toggle('change');
  // toggle menu active
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    // Animate in - overlay
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    // Animate IN - navbars
    navAnimation('out', 'in');
  } else {
    // Animation - overlay
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
    // Animation out navbars
    navAnimation('in', 'out');
  }
}

// Event Listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => nav.addEventListener('click', toggleNav));
