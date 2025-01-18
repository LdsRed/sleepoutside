import { getLocalStorage, setLocalStorage } from './utils.mjs';

window.onload = () => {
  // console.log(document.querySelector('.product-list').innerHTML);
  const xButtons = document.querySelectorAll('.x-remove-from-cart');
  xButtons.forEach((button) => {
    console.log('button')
button.addEventListener('click', (event) => {
  const itemId = event.target.dataset.id;
  removeFromCart(itemId);
})    
  })
}

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <div class="x-remove-from-cart" data-id="${item.Id}">x</div>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
<p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}



function removeFromCart(itemId) {
  console.log(itemId);
  console.log(getLocalStorage('so-cart'));
  const newCartItems = getLocalStorage('so-cart').filter(item=> item.Id !== itemId);
  console.log('new Cart',newCartItems);
// try {
  setLocalStorage('so-cart',newCartItems);
  renderCartContents();


// } catch {
//   throw error ("There was a problem removing the item from cart");
// }
  

console.log('remove from cart');
}

renderCartContents();
