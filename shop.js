let shopArea = document.querySelector(".products-area");
const productsURL = "http://localhost:3000/products";
const categoryURL = "http://localhost:3000/category";

function showProducts(productsList) {
  shopArea.innerHTML = ""; //fshine produketet qe jane shfaqur ne ekran
  for (let index = 0; index < productsList.length; index++) {
    const product = productsList[index];
    displayProduct(product);
  }
}

let productStateArray = [];
function readProductsFromDB(filters) {
  fetch(productsURL+filters)
    .then((res) => res.json())
    .then((products) => {
      productStateArray = products;
      showProducts(productStateArray);
    })
    .catch((error) => showError(error));
}
readProductsFromDB('');
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
  console.log(categoryId);
  if(categoryId == -1){
    readProductsFromDB('');
  }else{
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
  let categorySelectInput = document.querySelector('#category-filter');
  categorySelectInput.addEventListener('click', showFilteredResultForCategory);
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    let optionElement = document.createElement('option');
    optionElement.innerText = makeUpperCase(category.name);
    optionElement.value = category.id;
    categorySelectInput.appendChild(optionElement);
  }
}

fetch(categoryURL)
.then(res => res.json())
.then(categories => addCategoriesOptions(categories))
.catch(error => console.log(error))




function makeUpperCase(string) {
  let lettersArray = string.split('');
  lettersArray[0] = lettersArray[0].toUpperCase();
  string = lettersArray.join('');
  return string;
}
