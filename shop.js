let shopArea = document.querySelector(".products-area");
const productsURL = "http://localhost:3000/products";

function showProducts(productsList) {
  shopArea.innerHTML = ""; //fshine produketet qe jane shfaqur ne ekran
  for (let index = 0; index < productsList.length; index++) {
    const product = productsList[index];
    displayProduct(product);
  }
}

let productStateArray = [];
function readProductsFromDB() {
  fetch(productsURL)
    .then((res) => res.json())
    .then((products) => {
      productStateArray = products;
      showProducts(productStateArray);
    })
    .catch((error) => showError(error));
}
readProductsFromDB();
function showError(error) {
  console.log(error);
}
function showMessage(message) {
  console.log(message);
}
function displayProduct(product) {
  let productLink = document.createElement("a");
  productLink.href = ` product.html?productId=${product.id} `; //query param
  productLink.classList.add("product");
  productLink.innerHTML = `
          <img class="product-img" src=${product.img[0]} alt="" />
          <h1 class="name">${product.name}</h1>
          <h2 class="price">FROM ${product.price}$</h2>
          <p class="color">in ${product.colors.length} colors</p>
    `;
  shopArea.append(productLink);
}
// let firstDivElement = document.querySelector(".first-product")
// let anotherElement = []
// for (let index = 0; index < 3; index++) {
//   const element = productStateArray[index];

//     anotherElement.push(element)
//     console.log(anotherElement);

// }

let dropdownButtonsList = document.querySelectorAll(".dropdown");
let dropdownsContainerList = document.querySelectorAll(".options");

for (let index = 0; index < dropdownButtonsList.length; index++) {
  const dropdownElement = dropdownButtonsList[index];
  dropdownElement.addEventListener("click", toggleDropdown);
}
for (let index = 0; index < dropdownsContainerList.length; index++) {
  const dropdownContainer = dropdownsContainerList[index];
  dropdownContainer.addEventListener("click", showFilteredResult);
}
if (dropdownButtonsList) {
}

function showFilteredResult(event) {
  let optionElement = event.target;
  let id = optionElement.id;
  let categoryClicked = id.includes("category");
  if (categoryClicked) {
    //filter by category
    //filter("category", id);
  }
  let materialClicked = id.includes("material");
  if (materialClicked) {
    //filter by material
    //filter("material", id);
  }
}

function toggleDropdown(event) {
  let targetElement = event.target;
  for (let index = 0; index < dropdownsContainerList.length; index++) {
    const dropdownContainer = dropdownsContainerList[index];
    dropdownContainer.classList.add("hidden");
  }
  let dropdownDivElement =
    targetElement.parentElement.parentElement.children[1];
  dropdownDivElement.classList.toggle("hidden");
}
/*event.target.parent.children[1].classlist.toggle('hidden') */
let inputElement = document.querySelector("#search");
inputElement.addEventListener("keyup", showSearchResult);

function showSearchResult() {
  let keyword = inputElement.value;
  let resultArrayProducts = search(keyword);
  showProducts(resultArrayProducts);

  // let resultArrayNames = searchWords(keyword);
  // showNames(resultArrayNames)
}

function search(keyword) {
  let resultArray = [];
  for (let index = 0; index < productStateArray.length; index++) {
    let product = productStateArray[index];
    let tempName = product.name.toLowerCase();
    let tempKeyword = keyword.toLowerCase();
    if (tempName.includes(tempKeyword)) {
      resultArray.push(product);
    }
  }
  return resultArray;
}
