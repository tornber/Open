if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',ready)
} else {
    ready();
}

function ready() {

    //removeCartItem
    //updateTotal
    //quantityChanged
    //addtocart
    //purchase


    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for(var i = 0;i < removeCartItemButtons.length;i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click',removeCartItemClicked)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0;i < quantityInputs.length;i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityInputChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(var i = 0;i < addToCartButtons.length;i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click',addToCartClicked);
    }
    
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchase);
}

function removeCartItemClicked(event) {
    var button = event.target;
    button.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal() {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItems.getElementsByClassName('cart-row')
    var total = 0;
    for(var i = 0;i < cartRows.length;i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantity =  cartRow.getElementsByClassName('cart-quantity-input')[0].value;
        var price = parseFloat(priceElement.innerText.replace('$',''));
        var total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText =  '$' + total;
}

function quantityInputChanged(event) {
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addToRow(price,title,imageSrc)
    updateCartTotal();
    
}

function addToRow(price,title,imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRowContent = `
            <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
             <span class="cart-item-title">${title}</span>
    </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContent;
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartRowNames = document.getElementsByClassName('cart-item-title');
    for(var i = 0;i < cartRowNames.length;i++) {
        if(cartRowNames[i].innerText == title) {
            alert('this cart has already added');
            return 
        }
    }
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',
    removeCartItemClicked)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',
    quantityInputChanged);
}


function purchase() {
    alert('thank you for purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}
