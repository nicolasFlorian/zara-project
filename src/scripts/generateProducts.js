import { catalog } from './catalog.js';
import { Utilities } from './utilities.js';
const utilities = new Utilities();

export function generateProducts(howMany = catalog.length, where) {
  if (howMany > catalog.length) {
    throw new Error(`You are trying to generate more products than the catalog has, the limit is ${catalog.length}`);
  }
  for(let i = 0; i < howMany; i++) {
    const product = catalog[i];
    const images = product.imgs;
    const newProduct = utilities.createElements(`
    <div class="product__card">

    <div class="product__card__image__container">

      <div class="product__card__image__element__container">

        <picture class="product__card__image">
          <source srcset="./assets/images/webp/${images.main.srcWebp}" type="image/webp">
          <img src="./assets/images/${images.main.srcJpeg}" alt="${images.main.alt}" draggable="false">
        </picture>

        <picture class="product__card__image backphoto">
          <source srcset="./assets/images/webp/${images.secondary.srcWebp}" type="image/webp">
          <img src="./assets/images/${images.secondary.srcJpeg}" alt="${images.secondary.alt}" draggable="false">
        </picture>

      </div>

      <div class="buttons__container" data-mode="add">
        <button class="add-cart__btn btn">
          <svg>
            <use xlink:href="./__spritemap#sprite-plus"></use>
          </svg>
        </button>
      </div>

    </div>

    <div class="product__card__title__info">
      <span class="product__card__title">${product.name}</span>
      <span class="product__card__ref">${product.id}</span>
    </div>
    <div class="product__card__price__container" data-discount="${(product.discount === null ? 'false' : 'true')}" data-price="${product.price}" data-discount-amount="${(product.discount === null ? null : product.discount*100)}">
    </div>
    
    <div class="product__card__description" aria-hidden="true">
      <p class="product__card__discription__text">
        ${product.description}
      </p>
    </div>

  </div>
    `)
    const whereToAppend = typeof where === 'string' ? document.querySelector(where) : where;
    whereToAppend.appendChild(newProduct[0]);
  }
}
const productsContainer = document.querySelector('.products__container');
generateProducts(catalog.length, productsContainer);