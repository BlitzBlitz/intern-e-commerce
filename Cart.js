//Read Products
const productsURL = "http://localhost:3000/products";
const productAreaElement = document.querySelector(".middle-part");
let productsList = [];
let editingId;
function showProdcuts(products) {
  for (let index = 0; index < products.length; index++) {
    const product = products[index];
    displayProduct(product);
  }
}
function displayProduct(product) {
  let productDiv = document.createElement("div");
  productDiv.id = product.id;
  productDiv.classList.add("last-product");
  productDiv.innerHTML = `
        <div class="left-side">
            <img src=${product.img[0]} width="150px" height="150px" />
        </div>
        <div class="right-side">
            <div>
                <h1 class="h-name">${product.name}</h1>
                <btn id=${product.id} onClick=deleteProduct(event)>Delete</btn>
                <btn id=${product.id} onClick=showProductDetails(event)>Edit</btn>
            </div>

            <p class="one-p">color</p>
            <p class="only-p">Personalize it</p>
            <h2 class="price">${product.price}</h2>
            
        </div>
      `;
  productDiv.addEventListener("click", showProductDetails);

  //   productLink.href = `${productsURL}/${product.id}`;
  productAreaElement.append(productDiv);
}
function showProductDetails(event) {
  let id = event.target.id;
  editingId = id;
  for (let index = 0; index < productsList.length; index++) {
    let product = productsList[index];
    if (product.id == id) {
      let productTitleElement = document.querySelector(".product-name");
      productTitleElement.value = product.name;
      let productPriceElement = document.querySelector(".product-price");
      productPriceElement.value = product.price;
    }
  }
}
function readProductsFromDB() {
  fetch(productsURL)
    .then((res) => res.json())
    .then((products) => {
      productsList = products;
      showProdcuts(products);
      if (products.length == 0) {
        showProductDetails(products[0]);
      } else {
        console.log("No Products");
      }
    })
    .catch((error) => showError(error));
}

readProductsFromDB();
