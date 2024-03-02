let shopArea = document.querySelector(".products-area");
function showProducts(productsList) {
  shopArea.innerHTML = ""; //fshine produketet qe jane shfaqur ne ekran
  for (let index = 0; index < productsList.length; index++) {
    const product = productsList[index];
    displayProduct(product);
  }
}

let productStateArray = JSON.parse(localStorage.getItem("productsList")); //string -> Array
if (productStateArray == undefined) {
  productStateArray = [
    {
      id: "P1",
      img: [
        "img/p1/1.webp",
        "img/p1/b1.jpg",
        "img/p1/b2.jpg",
        "img/p1/h1.png",
        "img/p1/h2.png",
        "img/p1/h3.png",
      ],
      name: "Carry-On",
      price: "275",
      colors: ["green", "gray", "blue", "black"],
      stockAmount: 5,
      category: "carry-on",
      material: "plastic",
    },
    {
      id: "P2",
      img: [
        "img/p2/1.webp",
        "img/p2/2.webp",
        "img/p2/3.webp",
        "img/p2/h1.png",
        "img/p2/h2.png",
        "img/p2/h3.png",
      ],
      name: "Carry-On Flex",
      price: "325",
      colors: ["black", "gold", "pink"],
      stockAmount: 20,
      category: "carry-on",
      material: "plastic",
    },
    {
      id: "P3",
      img: [
        "img/p3/1.webp",
        "img/p2/2.webp",
        "img/p2/7.webp",
        "img/p2/8.webp",
        "img/p2/9.webp",
        "img/p2/h3.png",
      ],
      name: "Carry-On: Aluminum Edition",
      price: "625",
      colors: ["red", "gold", "pink"],
      stockAmount: 25,
      category: "carry-on",
      material: "aluminum",
    },
    {
      id: "P4",
      img: [
        "img/p3/1.webp",
        "img/p2/1.webp",
        "img/p2/22.webp",
        "img/p2/23.webp",
        "img/p2/24.wbp",
        "img/p2/h3.png",
      ],
      name: "Bigger Carry-On Flex",
      price: "345",
      colors: ["olive", "black", "gold", "pink"],
      stockAmount: 1,
      category: "big-carry-on",
      material: "plastic",
    },
    {
      id: "P5",
      img: [
        "img/p3/1.webp",
        "img/p2/b1.jpg",
        "img/p2/b2.jpg",
        "img/p2/h1.png",
        "img/p2/h2.png",
        "img/p2/h3.png",
      ],
      name: "Bigger Carry-On: Aluminum Edition",
      price: "645",
      colors: ["red", "olive", "gold", "pink"],
      stockAmount: 20,
      category: "big-carry-on",
      material: "aluminum",
    },
    {
      id: "P6",
      img: [
        "img/p3/1.webp",
        "img/p2/b1.jpg",
        "img/p2/b2.jpg",
        "img/p2/h1.png",
        "img/p2/h2.png",
        "img/p2/h3.png",
      ],
      name: "Medium",
      price: "345",
      colors: ["red", "black", "gold", "pink"],
      stockAmount: 5,
      category: "medium",
      material: "plastic",
    },
  ];
  localStorage.setItem("productsList", JSON.stringify(productStateArray)); //convert Array to string
}
showProducts(productStateArray);
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
