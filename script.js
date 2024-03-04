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

/*
- Implementing Tabs Component
*/
//the content which is active having the class => operations__content--active
//the tap which is moving up when clicking on it have the class => operations__tab--active
//the tabs have the class with the prefix => operations__tab--
//the content of the tabs have the prefix => operations__content--

//the parent of the tabs is => operations__tab-container

const tabsContainer = document.querySelector('.operations__tab-container');
tabsContainer.addEventListener('click', event => {
  //Check if the click element is tab
  if (event.target.classList.contains('operations__tab')) {
    const allTabs = [...tabsContainer.children];
    allTabs.forEach(ele => {
      ele.classList.remove('operations__tab--active');
    });
    const allContent = [...document.querySelectorAll('.operations__content')];
    allContent.forEach(ele => {
      ele.classList.remove('operations__content--active');
    });
    const tabNumber = event.target.dataset.tab;
    const matchedContent = document.querySelector(
      `.operations__content--${tabNumber}`
    );
    matchedContent.classList.add('operations__content--active');
    event.target.classList.add('operations__tab--active');
  }
});
