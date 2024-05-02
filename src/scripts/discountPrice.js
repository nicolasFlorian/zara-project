export function discountElement(element){
    if(element.getAttribute('data-discount') === 'false'){
        let price = Number(element.getAttribute('data-price').replace(',', '.'));
        let span = createSpan();
        span.textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;

        element.appendChild(span);
    }else{
        let spanOldPrice = createSpan();
        let spanDiscountPriceContainer = document.createElement('div');
        let spanDiscountPrice = createSpan();
        let spanDiscountAmount = createSpan();

        spanOldPrice.innerHTML = `R$ ${element.getAttribute('data-price').replace(',', '.')}`;

        let price = Number(element.getAttribute('data-price').replace(',', '.'));
        let discount = Number(element.getAttribute('data-discount-amount'));
        let calculatedDiscountPrice = discountPrice(price, discount);
        spanDiscountPrice.textContent = `R$ ${calculatedDiscountPrice.toFixed(1).replace('.', ',')}`;
        spanDiscountAmount.textContent = `-${discount}%`;

        spanDiscountPriceContainer.classList.add('product__card__price__discount__container');
        spanDiscountPriceContainer.appendChild(spanDiscountAmount);
        spanDiscountPriceContainer.appendChild(spanDiscountPrice);

        element.appendChild(spanOldPrice);
        element.appendChild(spanDiscountPriceContainer);
    }

    function discountPrice(price, discount){
        price = Number(price);
        discount = Number(discount);
        let calculatedDiscountPrice = price - (price * discount / 100);
        calculatedDiscountPrice = Math.floor(calculatedDiscountPrice) + 1 - 0.10;

        return calculatedDiscountPrice;
    }

    function createSpan(){
        let span = document.createElement('span');
        span.classList.add('product__card__price');
        return span;
    }
}