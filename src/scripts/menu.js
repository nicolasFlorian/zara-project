import { Scroller } from './scroller.js';
import { Utilities } from './utilities.js';
import scrollIntoView from 'scroll-into-view-if-needed';

// UTILITIES
const utilities = new Utilities();

// HEADER
const header = document.querySelector('.header');
const menuBtn = header.querySelector('.menu__btn');
const menuBtnIcon = menuBtn.querySelector('svg');

// SCROLLER
const headerCategoriesScroller = new Scroller();
const headerCategories = document.querySelector('.header__nav__options');
headerCategoriesScroller.init(headerCategories, {
    axis: 'x',
    grab: true,
    wheel: true,
})
const categories = document.querySelectorAll('.categories');
categories.forEach(category => {
    const categoriesScroller = new Scroller();
    categoriesScroller.init(category, {
        axis: 'y',
        grab: true,
        wheel: true,
    })
})

// MENU
const menu = document.querySelector('.menu__lists__container');
const headerNav = document.querySelector('.header__nav__options');
const bodyNav = menu.querySelector('.body__nav__options');
const bodyOptions = bodyNav.querySelectorAll('li.item');
const menuOptions = headerNav.querySelectorAll('.item');

// Add event listener to each menu option to change the menu mode and the active state of the option
menuOptions.forEach(option => {
    option.addEventListener('click', () => {
        menuOptions.forEach(opt => opt.getAttribute('data-active') === 'true' ? opt.setAttribute('data-active', 'false') : null);
        option.setAttribute('data-active', 'true');
        menu.getAttribute('data-mode') === 'normal' ? menu.setAttribute('data-mode', 'frame') : null;
        scrollIntoView(option, {scrollMode: 'always', behavior:'smooth', block: 'nearest', inline: 'center'});
        menuBtn.getAttribute('aria-label') === 'menu' ? utilities.changeIcon(menuBtnIcon, 'close') : null;
        moveSlides(option)
    })
})

// Add event listener to the menu button to change the menu mode and the active state of the option
menuBtn.addEventListener('click', () => {
    menu.getAttribute('data-mode') === 'normal' ? menu.setAttribute('data-mode', 'frame') : menu.setAttribute('data-mode', 'normal');
    menuOptions.forEach(opt => opt.getAttribute('data-active') === 'true' ? opt.setAttribute('data-active', 'false') : null);
    utilities.changeIcon(menuBtnIcon, menu.getAttribute('data-mode') === 'normal' ? 'menu' : 'close');
    if(menuBtn.getAttribute('aria-label', 'menu')) {
        bodyNav.scrollLeft = 0;
        headerNav.scrollLeft = 0;
    }
})

// Move the slides to the selected option
function moveSlides(option) {
    const id = option.getAttribute('data-category');
    const slides = categories
    slides.forEach(slide => {
        if(slide.getAttribute('data-id') === id) {
            slide.scrollTop = 0;
            scrollIntoView(slide, {scrollMode: 'always', behavior:'smooth', block: 'nearest', inline:'center'});
        }
    })
}

// Show the arrow icon on hover
bodyOptions.forEach(option => {
    let intervalId = null;
    const arrowIcon = option.querySelector('.arrow__icon');
    option.addEventListener('mouseenter', () => {
        arrowIcon.classList.add('arrowAnimationIn');
        intervalId = setInterval(() => {
        arrowIcon.classList.add('arrowAnimationOut');
        arrowIcon.classList.remove('arrowAnimationIn');
        arrowIcon.addEventListener('animationend', () => {
            arrowIcon.classList.remove('arrowAnimationOut');
            arrowIcon.classList.add('arrowAnimationIn');
        })
        }, 4000)
    })
    option.addEventListener('mouseleave', () => {
        arrowIcon.classList.remove('arrowAnimationIn');
        clearInterval(intervalId);
    })
})