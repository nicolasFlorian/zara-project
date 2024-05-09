// import scrollIntoView from 'scroll-into-view-if-needed';
// import { Utilities } from './utilities.js';
// import { Sliders } from './sliders.js';
// import { ProgressBar } from './progressBar.js';
// const utilities = new Utilities();
// const sliderHeaderMenu = new Sliders();
// const sliderCategoriesMenu = new Sliders();

// export class Menu {
//     constructor() {
//         // Header
//         this.menuIcon = document.querySelector('.header__nav .menu__btn');
//         this.menu = document.querySelector('.header__categories__popup');
//         this.categoriesHeaderContainer = document.querySelector('.header__nav .header__nav__options');
//         this.categoriesHeaderList = this.categoriesHeaderContainer.querySelectorAll('li');

//         // Menu
//         sliderHeaderMenu.grab('.header__categories__popup .header__nav__options', 'x');
//         this.menuListHeaderContainer = this.menu.querySelector('.header__nav__options');
//         this.menuCategoriesHeader = this.menu.querySelectorAll('.header__nav__options li');
//         this.menuOptionsCategoryContainer = this.menu.querySelector('.categories__container');
//         this.menuOptionsCategoriesContainer = this.menuOptionsCategoryContainer.querySelectorAll('.categories');
//         this.menuOptionsCategoriesItem = this.menuOptionsCategoryContainer.querySelectorAll('li.item');
//         this.optionNew = this.menuOptionsCategoryContainer.querySelectorAll('[data-new-option="true"]');
//         this.frameProducts = this.menu.querySelector('.new__products__popup')

//         this.menuIcon.addEventListener('click', () => this.toggleMenu());
//         this.categoriesHeaderList.forEach((category) => {
//             category.addEventListener('click', () => {
//                 this.openCategory(category);
//                 this.scrollToCategory(category);
//             });
//         });

//         // Other
//         this.isDragging = false;
//         this.isMouseOverFrame = false
//         this.idOption = null;
//         this.hideTimeout;

//         // Categories
//         this.menuOptionsCategoriesContainer.forEach((category) => {
//             sliderCategoriesMenu.wheel(category, 'y');
//             sliderCategoriesMenu.grab(category, 'y');
//         })

//         this.menuOptionsCategoriesItem.forEach((category) => {
//             let intervalId = null;
//             const arrowIcon = category.querySelector('.arrow__icon');

//             category.addEventListener('mouseenter', () => {
//                 arrowIcon.classList.add('arrowAnimationIn');
//                 intervalId = setInterval(() => {
//                     arrowIcon.classList.add('arrowAnimationOut');
//                     arrowIcon.classList.remove('arrowAnimationIn');
//                     arrowIcon.addEventListener('animationend', () => {
//                         arrowIcon.classList.remove('arrowAnimationOut');
//                         arrowIcon.classList.add('arrowAnimationIn');
//                     })
//                 }, 4000)
//             });
//             category.addEventListener('mouseleave', () => {
//                 arrowIcon.classList.remove('arrowAnimationIn');
//                 clearInterval(intervalId);
//             });
//         })

//         this.optionNew.forEach((option) => {
//             this.openFrame(option, '.new__products__popup', true);
//         })
//     }

//     openMenu() {
//         this.menu.setAttribute('aria-hidden', 'false');
//         this.menu.classList.add('showUp');
//         utilities.changeIcon('.header__nav .menu__icon', 'close');
//         this.categoriesHeaderContainer.classList.add('d-none');
//         this.ableCategories();

//         window.addEventListener('mousedown', () => this.isDragging = false)
//         window.addEventListener('mousemove', () => this.isDragging = true)
//         window.addEventListener('mouseup', (e) => {
//             if (!this.isDragging && !(e.target.closest('.header__categories__popup') || e.target.closest('.header__nav .menu__btn') || e.target.closest('.header__nav__options'))) {
//                 this.closeMenu();
//             }
//         });
//     }

//     closeMenu() {
//         this.menuListHeaderContainer.scrollLeft = 0;
//         this.menuOptionsCategoryContainer.scrollLeft = 0;
//         this.menuOptionsCategoriesContainer.forEach((category) => {
//             category.scrollTop = 0;
//         })
//         const categoryActive = this.menu.querySelector('.header__nav__options li[data-active="true"]');
//         this.menu.setAttribute('aria-hidden', 'true');
//         utilities.changeIcon('.header__nav .menu__icon', 'menu');
//         this.categoriesHeaderContainer.classList.remove('d-none');
//         if (categoryActive) {
//             categoryActive.setAttribute('data-active', 'false');
//         }
//     }

//     toggleMenu() {
//         this.menu.getAttribute('aria-hidden') === 'true' ? this.openMenu() : this.closeMenu();
//     }

//     ableCategories() {
//         this.menuCategoriesHeader.forEach((category) => {
//             category.addEventListener('click', () => {
//                 const categoryActive = this.menu.querySelector('.header__nav__options li[data-active="true"]');
//                 if (!categoryActive) {
//                     category.setAttribute('data-active', 'true');
//                     this.idOption = category.getAttribute('data-category');
//                     scrollIntoView(category, {scrollMode: 'always', behavior:'smooth', block: 'nearest', inline: 'center'});
//                     this.scrollToCategory(category)
//                     return;
//                 } else {
//                     categoryActive.setAttribute('data-active', 'false');
//                     category.setAttribute('data-active', 'true');
//                     this.idOption = category.getAttribute('data-category');
//                     scrollIntoView(category, {scrollMode: 'always', behavior:'smooth', block: 'nearest', inline: 'center'});
//                     this.scrollToCategory(category)
//                 }
//             })
//         })
//     }

//     openCategory(category) {
//         const categoryValue = category.getAttribute('data-category');
//         this.openMenu();
//         this.idOption = category.getAttribute('data-category');
//         this.menuCategoriesHeader.forEach((categoryMenu) => {
//             const categoryMenuValue = categoryMenu.getAttribute('data-category');
//             categoryMenuValue === categoryValue ? categoryMenu.setAttribute('data-active', 'true') : categoryMenu.setAttribute('data-active', 'false');
//             const categoryActive = this.menu.querySelector('.header__nav__options li[data-active="true"]');
//             if (categoryActive) {
//                 this.menuListHeaderContainer.scrollTo({
//                     left: categoryActive.offsetLeft - this.menu.offsetLeft,
//                     behavior: 'smooth'
//                 });
//             }
//         })
//     }

//     scrollToCategory(category) {
//         const categoryId = category.getAttribute('data-category');
//         this.menuOptionsCategoriesContainer.forEach((categoryContainer) => {
//             const categoryContainerId = categoryContainer.getAttribute('data-id');
//             if (categoryId === categoryContainerId) {
//                 scrollIntoView(categoryContainer, { scrollMode:'if-needed', behavior: 'smooth', inline: 'center'});
//             }
//         })
//     }

//     openFrame(element, frame, progressBar = false){
//         const frameElement = document.querySelector(frame)
//         const slideFrameProducts = frameElement.querySelector('.container__slide__products')

//         element.addEventListener('mouseover', () => {
//             clearTimeout(this.hideTimeout);
//             this.isMouseOverFrame = true;
//             frameElement.setAttribute('aria-hidden', 'false')
//             frameElement.classList.add('showUp')
//             if(progressBar){
//                 const progressBar1 = new ProgressBar('[data-carrousel="1"]');
//             }
//         })

//         element.addEventListener('mouseleave', () => {
//             this.isMouseOverFrame = false;
//             this.hideTimeout = setTimeout(() => {
//                 if (!this.isMouseOverFrame) {
//                     slideFrameProducts.scrollLeft = 0;
//                     frameElement.classList.remove('showUp')
//                     frameElement.classList.add('showDown')
//                     setTimeout(() => {
//                         frameElement.classList.remove('showDown')
//                         frameElement.setAttribute('aria-hidden', 'true')
//                     }, 300)
//                 }
//             }, 300)
//         })

//         frameElement.addEventListener('mouseover', () => {
//             clearTimeout(this.hideTimeout);
//             this.isMouseOverFrame = true;
//             frameElement.setAttribute('aria-hidden', 'false')
//         })

//         frameElement.addEventListener('mouseleave', () => {
//             this.isMouseOverFrame = false;
//             this.hideTimeout = setTimeout(() => {
//                 if (!this.isMouseOverFrame) {
//                     slideFrameProducts.scrollLeft = 0;
//                     frameElement.classList.remove('showUp')
//                     frameElement.classList.add('showDown')
//                     setTimeout(() => {
//                         frameElement.classList.remove('showDown')
//                         frameElement.setAttribute('aria-hidden', 'true')
//                     }, 300)
//                 }
//             }, 300)
//         })
//     }
// }
