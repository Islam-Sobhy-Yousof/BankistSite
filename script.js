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
const allTabs = [...tabsContainer.children];
const allContent = [...document.querySelectorAll('.operations__content')];
tabsContainer.addEventListener('click', event => {
  //Check if the click element is tab
  const clickedTab = event.target.closest('.operations__tab');
  if (clickedTab && clickedTab.classList.contains('operations__tab')) {
    allTabs.forEach(ele => {
      ele.classList.remove('operations__tab--active');
    });
    allContent.forEach(ele => {
      ele.classList.remove('operations__content--active');
    });
    const tabNumber = clickedTab.dataset.tab;

    const matchedContent = document.querySelector(
      `.operations__content--${tabNumber}`
    );
    matchedContent.classList.add('operations__content--active');
    clickedTab.classList.add('operations__tab--active');
  }
});

/*
- Implementing Nav Hover Effect
*/
//the parent for all nav components has the class => nav

//each nav link has the class => nav__link

//the nav image has the class =>nav__logo

const handelHover = function (event) {
  const hoverdElement = event.target;
  if (hoverdElement.classList.contains('nav__link')) {
    const allLinks = [
      ...hoverdElement.closest('.nav').querySelectorAll('.nav__link'),
    ];
    const navLogo = hoverdElement.closest('.nav').querySelector('.nav__logo');
    allLinks.forEach(ele => {
      if (ele !== hoverdElement) {
        ele.style.opacity = this;
      }
    });
    navLogo.style.opacity = this;
  }
};
const navElement = document.querySelector('.nav');
navElement.addEventListener('mouseover', handelHover.bind(0.5));

navElement.addEventListener('mouseout', handelHover.bind(1));

/*
- Implementing Sticky Nav 🎯 🐑
*/

//the nav has the class => nav
//to make the nav sticky you have to add the class sticky to it
//before the first section if the remaining height = the nav height make it sticky
//if the nave is at less height remove the sticky class

const headerElement = document.querySelector('.header');
const navHeight = navElement.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting === true) {
    navElement.classList.remove('sticky');
  } else {
    navElement.classList.add('sticky');
  }
};
const stickyObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
stickyObserver.observe(headerElement);

/*
- Implementing Revealing elements on scrolling
*/

//each section has the class => section--hidden
//when the target section intersect with the viewPort with 20% ration  then remove this calss
const allSections = [...document.querySelectorAll('.section')];

const revealingSections = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting === true) {
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    }
  });
};
const revealingObserver = new IntersectionObserver(revealingSections, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(sec => {
  sec.classList.add('section--hidden');
  revealingObserver.observe(sec);
});

/*
- Implementing the lazy image effect
*/
//include the lazy loading property
//each lazy imag has a src for a small weight img
//and has the data-src attribute for the other image that is too big
//each lazy image has the class => lazy-img

const allLazyImages = [...document.querySelectorAll('.lazy-img')];

const lazyImgLoader = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting === true) {
      const lazyImg = entry.target.dataset.src;
      entry.target.setAttribute('src', lazyImg);
      entry.target.addEventListener('load', () => {
        entry.target.classList.remove('lazy-img');
      });
      observer.unobserve(entry.target);
    }
  });
};
const lazyImgObserver = new IntersectionObserver(lazyImgLoader, {
  root: null,
  threshold: 0,
});
allLazyImages.forEach(img => {
  lazyImgObserver.observe(img);
});

/*
- Implementing Slider component
*/
//the parent of these slides has the class => slider
//each slide has main class which is => slide
//each slide has a special class which is slide--[slid number]
//you have to move the slide either 900 px to the right or to the left to make it move
//there are two arrows one is right and the other is at left
//the arrows classes are like this =>slider__btn--[arrow-direction]
//the general class for the arrows is => slider__btn
const allSlides = [...document.querySelectorAll('.slide')];
const btnSliderLeft = document.querySelector('.slider__btn--left');
const btnSliderRight = document.querySelector('.slider__btn--right');
const slidesCnt = allSlides.length;
let currSlideNum = 0;
const dotsContainer = document.querySelector('.dots');
const createDot = function () {
  allSlides.forEach((_, idx) => {
    const dot = `<button class="dots__dot" data-slide="${idx}"></button>`;
    dotsContainer.insertAdjacentHTML('beforeend', dot.trim());
  });
};
createDot();
const activateDot = function (slide) {
  const allDots = [...dotsContainer.querySelectorAll('.dots__dot')];
  allDots.forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  const activeDot = document.querySelector(`.dots__dot[data-slide="${slide}"]`);
  activeDot.classList.add('dots__dot--active');
};
activateDot(0);
const placeSlides = function (currentSlide) {
  allSlides.forEach((slide, idx) => {
    slide.style.transform = `translateX(${(idx - currentSlide) * 100}%)`;
  });
};
placeSlides(0);
const nextSlide = function () {
  currSlideNum = (currSlideNum + 1) % slidesCnt;
  activateDot(currSlideNum);
  placeSlides(currSlideNum);
};
const previousSlide = function () {
  currSlideNum = (currSlideNum - 1 + slidesCnt) % slidesCnt;
  activateDot(currSlideNum);
  placeSlides(currSlideNum);
};
btnSliderLeft.addEventListener('click', previousSlide);

btnSliderRight.addEventListener('click', nextSlide);

document.addEventListener('keydown', event => {
  const pressedKey = event.key;
  if (pressedKey === 'ArrowRight') {
    nextSlide();
  } else if (pressedKey === 'ArrowLeft') {
    previousSlide();
  }
});
dotsContainer.addEventListener('click', event => {
  const clickedDot = event.target;
  if (clickedDot.classList.contains('dots__dot')) {
    const slide = clickedDot.dataset.slide;
    placeSlides(slide);
    activateDot(slide);
  }
});
