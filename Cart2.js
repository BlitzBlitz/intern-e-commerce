//Read cart data from local storage

let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [];
}

function displayCartItem(cart) {
  let cartItemsContainerElement = document.querySelector(".cart-products");
  cartItemsContainerElement.innerHTML = "";
  if (cart.length == 0) {
    cartItemsContainerElement.innerHTML = `
      <h1>You don't have any item in the Cart.</h1>
    `;
  }

  for (let index = 0; index < cart.length; index++) {
    const cartItem = cart[index];
    let cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");
    cartItemElement.innerHTML = `
        <div class="left-side">
          <img src="${cartItem.img[0]}" width="150px" height="150px" />
        </div>
        <div class="right-side">
          <button id="delete-item-${cartItem.id}" onclick="deleteItem(event)" class="delete-item">X</button>
          
          <h1 class="h-name">${cartItem.name}</h1>
          <p class="one-p">color</p>
          <p class="only-p">Personalize it</p>
          <div id="counter-button" onclick=changeAmount(event)>
            <button id="minus-button-${cartItem.id}">-</button>
            <span id="counter">${cartItem.amount}</span>
            <button id="plus-button-${cartItem.id}">+</button>
          </div>
          <h2 class="price">$${cartItem.price}</h2>
        </div>
    `;
    cartItemsContainerElement.append(cartItemElement);
  }
}
displayCartItem(cart);

function changeAmount(event) {
  let clickedElement = event.target;
  if (
    clickedElement.id.startsWith("plus-button") ||
    clickedElement.id.startsWith("minus-button")
  ) {
    let clickedElementId = event.target.id.split("-")[2]; //"plus-button-P2".split('-') => ['plus', 'button', 'P2'] =>
    let newAmount;
    //gjej dhe shto/pakeso amount tek state
    for (let index = 0; index < cart.length; index++) {
      const cartItem = cart[index];
      if (cartItem.id == clickedElementId) {
        if (
          clickedElement.id.startsWith("plus-button") &&
          cartItem.amount < cartItem.stockAmount
        ) {
          cartItem.amount++;
        }
        if (
          clickedElement.id.startsWith("minus-button") &&
          cartItem.amount > 1
        ) {
          cartItem.amount--;
        }
        newAmount = cartItem.amount;
      }
    }
    //bejm update te dhenat e cart ne localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    //select amount element
    let amountElement = clickedElement.parentElement.children[1];
    //change amount value in UI
    amountElement.innerText = newAmount;
  }
}
// let minusButton = document.getElementById("minus-button");
// let plusButton = document.getElementById("plus-button");
// let counter = document.getElementById("counter");
// let count = 0;

// minusButton.addEventListener("click", () => {
//   count--;
//   counter.textContent = count;
// });

// plusButton.addEventListener("click", () => {
//   count++;
//   counter.textContent = count;
// });

//Delete Cart item

function deleteItem(event) {
  let itemId = event.target.id.split("-")[2]; //delete-item-${cartItem.id}
  for (let index = 0; index < cart.length; index++) {
    const cartItem = cart[index];
    if (cartItem.id == itemId) {
      cart.splice(index, 1);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItem(cart);
}

//Total
//in  cart
//cal   deklaro cartTotal = 0;
//      lexo cdo cartItem
//
//      per cdo cartItem llogarit cmimin total per item   cartItem.amount * cartItem.price
//      shto cmimin total per item tek cartTotal
//out   selekto total element -> display total
//      slect shipping message -> display message based on cartTotal
