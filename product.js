//marrim id nga URL
let urlString = window.location.href;
let paramString = urlString.split("?")[1]; //'localhost://product.html?productId=P1&time=10&lang=EN'.split('?') = ['localhost://product.html', 'productId=P1&time=10&lang=EN' ]
let params_arr = paramString.split("&"); //'productId=P1&time=10&lang=EN'.split('&') = ['productId=P1',  'time=10', 'lang=EN']
let productId;
for (let i = 0; i < params_arr.length; i++) {
  let pair = params_arr[i].split("="); //['productId=P1',  'time=10', 'lang=EN'] => 'productId=P1'.split('=') -> ['productId', 'P1']

  productId = pair[1];
}

// let productStateArray = JSON.parse(localStorage.getItem("productsList"));
// if (productStateArray == undefined) {
//   //shko te faqa 404
//   alert("products not read from the DB");
// }
// for (let index = 0; index < productStateArray.length; index++) {
//   const product = productStateArray[index];
//   if (productId == product.id) {
//     displayProduct(product);
//   }
// }
let product;
fetch(`http://localhost:3000/products/${productId}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    product = data;
    displayProduct(product);
  })
  .catch((err) => {
    console.log(err);
    // setTimeout(goToNotFound, 2000);
  });

function goToNotFound() {
  window.location = "notfound.html";
}

// funksioni disply product merr si rgument nje produkt
//1 selektojme elementet html dhe i ndryshojme the dhent e produktit we mrrim si rgument
// 2 fusht e produktit t cilt jne vektor psh img,colors
//   selektojme conteiner
//  bejme nje loop i cili lexon vektorin product.colors dhe krijon elementet html dhe i shton te conteiner
//        let color div = document.crete element("div")
//       div.clss list.dd ( product.colors[i])
function displayProduct(product) {
  let mainImgElement = document.querySelector(".one-img");
  mainImgElement.src = product.img[0];
  let sideImgContainerElement = document.querySelector(".corner-img");
  for (let index = 0; index < product.img.length; index++) {
    const imgUrl = product.img[index];
    let imgElement = document.createElement("img");
    imgElement.src = imgUrl;
    imgElement.classList.add("side-img");
    sideImgContainerElement.append(imgElement);
  }
  let productTitleElement = document.querySelector(".product-title");
  productTitleElement.innerText = product.name;
  let reviwesDivElement = document.querySelector(".reviwes-div");
  for (let index = 0; index < product.review; index++) {
    let iconElement = document.createElement("i");
    iconElement.classList.add("fa-solid");
    iconElement.classList.add("fa-star");
    reviwesDivElement.append(iconElement);
  }
  let colorsDivElement = document.querySelector(".colors-div");
  // for (let index = 0; index < product.colors.length; index++) {
  //   const color = product.colors[index];
  //   let colorDiv = document.createElement("div");

  //   colorDiv.classList.add("color");

  //   colorDiv.classList.add(`${color}-color`);

  //   colorsDivElement.append(colorDiv);
  // }
}

//display product photo on-click

//in    user clicks one of the side img
//      target:   one of the images(put the listener at the container)
//      type:     click
//      handler:  showImg
//cal   marrin elementin img qe eshte klikuar (event.target)
//      marrim src e img te klikuar
//
//out   selektojme elementin main-img
//      i ndryshojme src me src e img te klikuar

let sideImgContainerElement = document.querySelector(".corner-img");
sideImgContainerElement.addEventListener("click", showImg);
function showImg(event) {
  let clickedImg = event.target;
  let imgUrl = clickedImg.src;
  let mainImgElement = document.querySelector(".one-img");
  mainImgElement.src = imgUrl;
}

//Cart
let cart = JSON.parse(localStorage.getItem("cart"));
if (cart == undefined) {
  localStorage.setItem("cart", JSON.stringify([]));
}

let addToCartBtnElement = document.querySelector("#add-to-cart");
addToCartBtnElement.addEventListener("click", addToCart);
function addToCart() {
  console.log(cart);
  //nese product eshte prezent
  //product.amount +=1  (shtojme nje fushe te re tek objekti)
  //nese nuk eshte prezent
  //product.amount = 1  (shtojme nje fushe te re tek objekti)
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}
