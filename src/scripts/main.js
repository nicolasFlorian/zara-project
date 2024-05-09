import { showDescription } from "./containerCard.js";
import { discountElement } from "./discountPrice.js";
import { changeTheme } from "./themeChange.js";
import { Scroller } from "./scroller.js";

// SCROLLER

const scroller = new Scroller();
const productsSlider = document.querySelector('.products__container');
scroller.init(productsSlider, {
    axis: 'x',
    grab: true,
    wheel: true,
    touch: true,
    scrollBar:{
        enabled: true,
        type: 'progress',
        height: '1px',
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



