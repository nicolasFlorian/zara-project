import { showDescription } from "./containerCard.js";
import { discountElement } from "./discountPrice.js";
import { changeTheme } from "./themeChange.js";
import { Scroller } from "./scroller.js";
import {} from "./menu.js";
import {} from "./generateProducts.js";
import { openModal } from "./openModal.js";
import { showSizes, hideSizes, updateCartCount, updateCartModal } from "./handleCar.js";
import {} from "./handleSearchInput.js";


// SCROLLER

const productsSliderScroller = new Scroller();
const productsSlider = document.querySelector('.products__container');
productsSliderScroller.init(productsSlider, {
    axis: 'x',
    grab: true,
    wheel: true,
    touch: true,
    scrollBar:{
        enabled: true,
        type: 'progress',
        height: '0.5px',
        gap: '20px',
        initialSize: 1,
    }
});

// THEME CHANGE

const modeBtn = document.querySelector('.mode__btn');
modeBtn.addEventListener('click', () => {
    changeTheme();
})

//DESCRIPTION SHOW OR HIDE

const descriptionArea = document.querySelectorAll('.product__card__description');
descriptionArea.forEach(element => {
    element.addEventListener('click', () => {
        showDescription(element);
    })
})

// DISCOUNT PRICE

const priceArea = document.querySelectorAll('.product__card__price__container');
priceArea.forEach(element => {
    discountElement(element);
})


// SHOW MODAL LOGIN

const loginBtn = document.querySelector('.profile__btn');
const loginModal = document.querySelector('.modal__container.login');
openModal(loginBtn, loginModal);


// SHOW MODAL CART

const cartBtn = document.querySelector('.bag__btn');
const cartModal = document.querySelector('.modal__container.cart');
openModal(cartBtn, cartModal);


// SHOW SIZES

let isClicked = false;

const addBtns = document.querySelectorAll('.add-cart__btn');
addBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    showSizes(e);
    isClicked = true;
  });
});

window.addEventListener('click', (e) => {
    if(e.target.closest('.buttons__container')) return isClicked;
    if(isClicked) {
        hideSizes(e, isClicked);
    }
    isClicked = hideSizes(e, isClicked);
});

// UPDATE CART

document.addEventListener('DOMContentLoaded', updateCartCount());
document.addEventListener('DOMContentLoaded', updateCartModal());