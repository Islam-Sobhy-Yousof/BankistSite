'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////App Logic///////////////////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');

/*
-Implementing section scrolling onclicking on the button 
*/
btnScrollTo.addEventListener('click', function () {
  const sectionOneCords = sectionOne.getBoundingClientRect();
  window.scrollTo({
    left: sectionOneCords.left + window.scrollX,
    top: sectionOneCords.top + window.scrollY,
    behavior: 'smooth',
  });
});

/*
-Implementing PageNavigatino scrolling 
*/
const navLinksContainer = document.querySelector('.nav__links');
navLinksContainer.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.classList.contains('nav__link')) {
    const sectionId = event.target.getAttribute('href');
    const targetSection = document.querySelector(sectionId);
    const targetSectionCords = targetSection.getBoundingClientRect();
    window.scrollTo({
      left: targetSectionCords.left,
      top: targetSectionCords.top,
      behavior: 'smooth',
    });
  }
});
