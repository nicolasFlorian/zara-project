import { showDescription } from "./containerCard.js";
import { discountElement } from "./discountPrice.js";
import { ProgressBar } from "./progressBar.js";
import { Menu } from "./popupCategories.js";
const menu = new Menu();
import { changeTheme } from "./themeChange.js";
import { Sliders } from "./sliders.js";

const descriptionArea = document.querySelectorAll('.product__card__description');
const modeBtn = document.querySelector('.mode__btn');

descriptionArea.forEach(element => {
    element.addEventListener('click', () => {
        showDescription(element);
    })
})

const priceArea = document.querySelectorAll('.product__card__price__container');

priceArea.forEach(element => {
    discountElement(element);
})

const progressBar2 = new ProgressBar('[data-carrousel="2"]');
const sliderProductsMainSlider = new Sliders();
sliderProductsMainSlider.grab('.carrousel__products__container .products__container', 'x');
sliderProductsMainSlider.wheel('.carrousel__products__container .products__container', 'x');

modeBtn.addEventListener('click', () => {
    changeTheme();
})

const sliderProductsPopup = new Sliders();
sliderProductsPopup.grab('.carrousel__products__container .container__slide__products', 'x');
sliderProductsPopup.wheel('.carrousel__products__container .container__slide__products', 'x');
