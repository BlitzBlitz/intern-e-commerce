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

function deleteProduct(event) {
  let id = event.target.id;
  fetch(productsURL + "/" + id, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status == 200) {
        showMessage(message);
      }
    })
    .catch((error) => showError(error));
}

function showError(error) {
  console.log(error);
}
function showMessage(message) {
  console.log(message);
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
// fetch("http://localhost:3000/products/P6")
//   .then((res) => {
//     console.log(res);
//     return res.json();
//   })
//   .then((data) => printData(data))
//   .catch((err) => console.log(err));

// let newProduct = {
//   img: "img/2.webp",
//   name: "Test2",
//   price: "1000",
//   colors: ["black", "gold", "pink"],
//   stockAmount: 120,
//   category: "test",
//   material: "plastic",
// };

//Process form edit product
let formElement = document.querySelector(".edit-form");
formElement.addEventListener("submit", processForm);

function processForm(event) {
  event.preventDefault();
  let productTitleElement = document.querySelector(".product-name");
  let title = productTitleElement.value;
  let productPriceElement = document.querySelector(".product-price");
  let price = productPriceElement.value;
  let productImgUrlElement = document.querySelector(".product-images");
  let files = productImgUrlElement.files;
  let fileNames = [];
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    fileNames.push(file.name);
  }
  let updatedFields = {
    name: title,
    price: price,
  };
  console.log(editingId);
  fetch(productsURL + "/" + editingId, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}
