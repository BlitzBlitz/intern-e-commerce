//Cart
let cart = JSON.parse(localStorage.getItem("cart"));
if (cart == undefined) {
  localStorage.setItem("cart", JSON.stringify([]));
}

let shopArea = document.querySelector(".products-area");
const productsURL = "http://localhost:3000/products";
const categoryURL = "http://localhost:3000/category";
const materialURL = "http://localhost:3000/material";
const colorURL = "http://localhost:3000/color";

function makeUpperCase(string) {
  let lettersArray = string.split("");
  lettersArray[0] = lettersArray[0].toUpperCase();
  string = lettersArray.join("");
  return string;
}

function showProducts(productsList) {
  console.log(productsList);
  shopArea.innerHTML = ""; //fshine produketet qe jane shfaqur ne ekran
  for (let index = 0; index < productsList.length; index++) {
    const product = productsList[index];
    displayProduct(product);
  }
}

let productStateArray = [];
function readProductsFromDB(filters) {
  fetch(productsURL + filters)
    .then((res) => res.json())
    .then((products) => {
      productStateArray = products;
      showProducts(productStateArray);
    })
    .catch((error) => showError(error));
}
readProductsFromDB("");
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
          <p class="color">in ${product.color.length} colors</p>
    `;
  shopArea.append(productLink);
}

function showFilteredResultForCategory(event) {
  let selectInput = event.target;
  let categoryId = +selectInput.value;
  if (categoryId == -1) {
    readProductsFromDB("");
  } else {
    readProductsFromDB(`?category=${categoryId}`);
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

//Add category options
function addCategoriesOptions(categories) {
  let categorySelectInput = document.querySelector("#category-filter");
  categorySelectInput.addEventListener("change", showFilteredResultForCategory);
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    let optionElement = document.createElement("option");
    optionElement.innerText = makeUpperCase(category.name);
    optionElement.value = category.id;
    categorySelectInput.appendChild(optionElement);
  }
}

fetch(categoryURL)
  .then((res) => res.json())
  .then((categories) => addCategoriesOptions(categories))
  .catch((error) => console.log(error));

function showFilteredResultForMaterial(event) {
  let selectInput = event.target;
  let materialId = +selectInput.value;
  console.log(materialId);
  if (materialId == -1) {
    readProductsFromDB("");
  } else {
    readProductsFromDB(`?material=${materialId}`);
  }
}

function addMaterialsOptions(materialsList) {
  let materialSelectInput = document.querySelector("#material-filter");
  materialSelectInput.addEventListener("change", showFilteredResultForMaterial);
  for (let index = 0; index < materialsList.length; index++) {
    const material = materialsList[index];
    let optionElement = document.createElement("option");
    optionElement.innerText = makeUpperCase(material.name);
    optionElement.value = material.id;
    materialSelectInput.appendChild(optionElement);
  }
}

fetch(materialURL)
  .then((res) => res.json())
  .then((material) => addMaterialsOptions(material))
  .catch((error) => console.log(error));

function showFilteredResultForColor(event) {
  let selectInput = event.target;
  let colorId = +selectInput.value;
  if (colorId == -1) {
    readProductsFromDB("");
  } else {
    fetch(productsURL)
      .then((res) => res.json())
      .then((products) => {
        const filteredProductsByColor = [];
        for (let index = 0; index < products.length; index++) {
          const product = products[index];
          for (let j = 0; j < product.color.length; j++) {
            const color = product.color[j];
            if (color == colorId) {
              filteredProductsByColor.push(product);
              break;
            }
          }
        }
        console.log(filteredProductsByColor);
        showProducts(filteredProductsByColor);
      })
      .catch((error) => console.log(error));
  }
}

function addColorsOptions(colorList) {
  let colorSelectInput = document.querySelector("#color-filter");
  colorSelectInput.addEventListener("change", showFilteredResultForColor);
  for (let index = 0; index < colorList.length; index++) {
    const color = colorList[index];
    let optionElement = document.createElement("option");
    optionElement.innerText = makeUpperCase(color.name);
    optionElement.value = color.id;
    colorSelectInput.appendChild(optionElement);
  }
}

fetch(colorURL)
  .then((res) => res.json())
  .then((colors) => addColorsOptions(colors))
  .catch((error) => console.log(error));
