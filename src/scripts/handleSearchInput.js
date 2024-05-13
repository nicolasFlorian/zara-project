import { catalog } from "./catalog";
import { Utilities } from "./utilities";
import { Scroller } from "./scroller";
import { discountElement } from "./discountPrice";
const utilities = new Utilities();

const searchInput = document.querySelector('.search__input');
const searchResults = document.querySelector('.search__area');

const searchScroller = new Scroller();
searchScroller.init(searchResults, {
    axis: 'y',
    grab: true,
    wheel: true,
    touch: true,
});


searchInput.addEventListener('input', () => {
  if(searchInput.value.length === 0){
    searchResults.setAttribute('aria-hidden', 'true');
  }else{
    handleSearchInput();
  }
});

function handleSearchInput() {
  searchResults.innerHTML = '';
  const searchInputValue = searchInput.value;
  const searchResultsArray = catalog.filter(item => 
    item.name.toLowerCase().includes(searchInputValue.toLowerCase()) ||
    item.gender.toLowerCase().includes(searchInputValue.toLowerCase()) ||
    item.category.toLowerCase().includes(searchInputValue.toLowerCase())
  );
  displaySearchResults(searchResultsArray);
}

function displaySearchResults(results) {
  searchResults.innerHTML = '';
  searchResults.setAttribute('aria-hidden', 'false')
  results.forEach(result => {
    console.log(result);
    const searchResult = utilities.createElements(`
    <div class="search__result">
      <div class="image__container">
        <picture>
          <source srcset="./assets/images/webp/${result.imgs.main.srcWebp}" type="image/webp">
          <img src="./assets/images/${result.imgs.main.srcJpeg}" alt="${result.imgs.main.alt}">
        </picture>
      </div>
      <div class="search__content">
        <span class="product__title">${result.name}</span>
        <div class="product__card__price__container" data-discount="${result.discount === null ? 'false' : 'true'}" data-price="${result.price}" data-discount-amount="${result.discount === null ? '' : result.discount*100}"></div>
        <span class="product__ref">REF: <span class="value">${result.id}</span></span>
        <button class="btn link__product__btn">VER PRODUTO</button>
      </div>
    </div> 
    `);
    searchResults.appendChild(searchResult[0]);
  });
  const pricesElements = searchResults.querySelectorAll('.product__card__price__container');
  pricesElements.forEach(priceElement => discountElement(priceElement));
}