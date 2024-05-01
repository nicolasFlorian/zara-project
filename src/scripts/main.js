import { showDescription } from "./containerCard.js";

const descriptionArea = document.querySelectorAll('.product__card__description');

descriptionArea.forEach(element => {
    element.addEventListener('click', () => {
        showDescription(element);
    })
})

