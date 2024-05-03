import { showDescription } from "./containerCard.js";
import { discountElement } from "./discountPrice.js";
import { Slider } from "./progressBar.js";

const descriptionArea = document.querySelectorAll('.product__card__description');

descriptionArea.forEach(element => {
    element.addEventListener('click', () => {
        showDescription(element);
    })
})

const priceArea = document.querySelectorAll('.product__card__price__container');

priceArea.forEach(element => {
    discountElement(element);
})

new Slider('.products__container', '.progress');

