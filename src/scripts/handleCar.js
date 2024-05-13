import { catalog } from "./catalog";
import { Utilities } from "./utilities";
import { Scroller } from "./scroller";
const utilities = new Utilities();
const cartScroll = new Scroller();
const cartElement = document.querySelector('.modal__container.cart .itens__container');
cartScroll.init(cartElement, {
  axis: 'y',
  grab: true,
  wheel: true,
  touch: true,
});

export function showSizes(e){
  e.preventDefault();
  const AllBtnContainers = document.querySelectorAll('.buttons__container');
  AllBtnContainers.forEach(container => {
    if(container.getAttribute('data-mode') === 'size'){
      container.querySelectorAll('.size__btn').forEach(btn => {btn.remove()})
      container.setAttribute('data-mode', 'add');
    }
  })
  const btnTarget = e.currentTarget
  const parent = btnTarget.parentElement.parentElement.parentElement;
  const btnContainer = parent.querySelector('.buttons__container');
  const ref = parent.querySelector('.product__card__ref').textContent;
  const product = catalog.find(item => item.id === ref);
  Object.keys(product.sizes).forEach(size => {
    const sizeBtn = utilities.createElements(`
     <button class="size__btn btn ${product.sizes[size] === 0 ? 'disabled' : 'able'}">${size}</button>
     `)
     btnContainer.setAttribute('data-mode', 'size');
     btnContainer.appendChild(sizeBtn[0]);
  })
  handleClickOnSize(product);
}

export function hideSizes(isClicked){
    isClicked = false;
    const AllBtnContainers = document.querySelectorAll('.buttons__container');
    AllBtnContainers.forEach(container => {
      if(container.getAttribute('data-mode') === 'size'){
        container.querySelectorAll('.size__btn').forEach(btn => {btn.remove()})
        container.setAttribute('data-mode', 'add');
      }
    })
    return isClicked;
}

function handleClickOnSize(product){
  const sizesBtn = document.querySelectorAll('.size__btn.able');
  sizesBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      let price = parseFloat(product.price);
      const name = product.name;
      const size = e.currentTarget.textContent;
      const discount = product.discount;
      const image = product.imgs.main;
      price = discount > 0 ? (Math.floor(price - (price * discount)) + 0.9) : price;
      const id = product.id;
      let sizeAmount = product.sizes[size];
      const item = {
        price,
        name,
        size,
        image,
        id,
        sizeAmount
      }
      addProductToCart(item);
    })
  })
}

function addProductToCart(item) {
  let cart = getCartItems();
  cart = updateCartWithDuplicates(cart, item); 
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  updateCartModal();
}

function getCartItems() {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
}

export function updateCartCount() {
  const cartCount = document.querySelectorAll('.cart__count');
  const cart = getCartItems();
  cartCount.forEach(count => {
    count.textContent = `(${cart.length})`;
  })
}

export function updateCartModal() {
  const cart = getCartItems();
  const cartModal = document.querySelector('.modal__container.cart');
  const cartList = cartModal.querySelector('.itens__container');
  const emptyMessage = utilities.createElements(`<div class="item">Seu carrinho está vazio...</div>`)
  if(cart.length === 0){
    cartList.innerHTML = '';
    cartList.classList.add('empty');
    cartList.appendChild(emptyMessage[0]);
  }else{
    cartList.classList.remove('empty');
    cartList.innerHTML = '';
  }
  cart.forEach(item => {
    const cartItem = utilities.createElements(`
      <div class="item" data-id="${item.id}">
        <div class="item__image">
          <picture>
          <source srcset="./assets/images/webp/${item.image.srcWebp}" type="image/webp">
          <img src="./assets/images/${item.image.srcJpeg}" alt="${item.image.alt}" draggable="false">
          </picture>
        </div>
        <div class="item__info">
          <span class="item__price">R$ ${item.price.toFixed(2)}</span>
          <button class="item__remove btn">
            <svg>
              <use xlink:href="./__spritemap#sprite-trash"></use>
            </svg>
          </button>
          <span class="item__title">${item.name}</span>
          <span class="item__size">${item.size}</span>
          <div class="item__counter">
            <button class="btn icon__btn minus__btn">
              <svg>
                <use xlink:href="./__spritemap#sprite-minus"></use>
              </svg>
            </button>
            <span class="item__amount">${item.amount}</span>
            <button class="btn icon__btn plus__btn">
              <svg>
                <use xlink:href="./__spritemap#sprite-plus"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `)
    cartList.appendChild(cartItem[0]);
  })
  deleteAnItem();
  enabledCountBtn();
  updateTotal();
}

function updateCartWithDuplicates(cart, newItem){
  const index = cart.findIndex(item => item.id === newItem.id && item.size === newItem.size);
  if (index !== -1) {
    cart[index].amount += 1;  // Increase the quantity
    cart[index].price = parseFloat((cart[index].amount * newItem.price).toFixed(2));  // Update the total price for that item
  } else {
    newItem.amount = 1;  // Set initial amount
    newItem.unitPrice = newItem.price; // Set unitPrice as the original price
    cart.push(newItem);  // Add new item to cart if no duplicate found
  }
  return cart;  // Return the updated cart
}

function deleteAnItem(){
  const removeBtn = document.querySelectorAll('.modal__container .item__remove');
  removeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      const cart = getCartItems();
      const item = btn.closest('.item');
      const id = item.getAttribute('data-id');
      const index = cart.findIndex(item => item.id === id);
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      updateCartModal();
    })
  })
  
}

function enabledCountBtn(){
  const minusBtn = document.querySelectorAll('.item__counter .minus__btn');
  const plusBtn = document.querySelectorAll('.item__counter .plus__btn');
  minusBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      const cart = getCartItems();
      const item = btn.closest('.item');
      const id = item.getAttribute('data-id');
      const index = cart.findIndex(item => item.id === id);
      if (cart[index].amount > 1) {
        cart[index].amount -= 1;
        cart[index].price = parseFloat((cart[index].amount * cart[index].unitPrice).toFixed(2));
      }
      if(cart[index].amount === 1) {
        const modal = document.querySelector('.modal__container.cart .modal__header');
        utilities.showNotification('Quantidade mínima atingida', 'error', modal)
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartModal();
    })
  })
  plusBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      const cart = getCartItems();
      const item = btn.closest('.item');
      const id = item.getAttribute('data-id');
      const index = cart.findIndex(item => item.id === id);

      if(cart[index].amount >= cart[index].sizeAmount) {
        const modal = document.querySelector('.modal__container.cart .modal__header');
        utilities.showNotification('Limite de estoque atingido', 'error', modal)
        return;
      };
      cart[index].amount += 1;
      cart[index].price = parseFloat((cart[index].amount * cart[index].unitPrice).toFixed(2));

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartModal();
    })
  })
}

function updateTotal(){
  const cart = getCartItems();
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const totalElement = document.querySelector('.modal__container.cart .total__price');
  totalElement.textContent = `R$ ${total.toFixed(2)}`;
}