//Read Products
const productsURL = "http://localhost:3000/products";
const productAreaElement = document.querySelector(".middle-part");
function showProdcuts(products) {
  for (let index = 0; index < products.length; index++) {
    const product = products[index];
    displayProduct(product);
  }
}
function displayProduct(product) {
  let productDiv = document.createElement("div");

  productDiv.classList.add("last-product");
  productDiv.innerHTML = `
        <div class="left-side">
            <img src=${product.img[0]} width="150px" height="150px" />
        </div>
        <div class="right-side">
            <div>
                <h1 class="h-name">${product.name}</h1>
                <btn id=${product.id} onClick=deleteProduct(event)>Delete</btn>
            </div>

            <p class="one-p">color</p>
            <p class="only-p">Personalize it</p>
            <h2 class="price">${product.price}</h2>
            
        </div>
      `;
  productDiv.addEventListener("click", (product) =>
    showProductDetails(product)
  );

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
function showProductDetails(product) {
  console.log(product);
}
function readProductsFromDB() {
  fetch(productsURL)
    .then((res) => res.json())
    .then((products) => {
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
