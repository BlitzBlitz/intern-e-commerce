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
      colors: ["red", "olive", "black", "gold", "pink"],
      stockAmount: 5,
      category: "carry-on",
      material: "plastic",
    },
    {
      id: "P2",
      img: [
        "img/p1/1.webp",
        "img/p1/b1.jpg",
        "img/p1/b2.jpg",
        "img/p1/h1.png",
        "img/p1/h2.png",
        "img/p1/h3.png",
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
        "img/p1/1.webp",
        "img/p1/b1.jpg",
        "img/p1/b2.jpg",
        "img/p1/h1.png",
        "img/p1/h2.png",
        "img/p1/h3.png",
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
        "img/p1/1.webp",
        "img/p1/b1.jpg",
        "img/p1/b2.jpg",
        "img/p1/h1.png",
        "img/p1/h2.png",
        "img/p1/h3.png",
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
        "img/p1/1.webp",
        "img/p1/b1.jpg",
        "img/p1/b2.jpg",
        "img/p1/h1.png",
        "img/p1/h2.png",
        "img/p1/h3.png",
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
        "img/p1/1.webp",
        "img/p1/b1.jpg",
        "img/p1/b2.jpg",
        "img/p1/h1.png",
        "img/p1/h2.png",
        "img/p1/h3.png",
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
//Set users
let userList = localStorage.getItem("users");
if (!userList) {
  localStorage.setItem("users", "[]");
}
//Cart
let cart = JSON.parse(localStorage.getItem("cart"));
if (cart == undefined) {
  localStorage.setItem("cart", JSON.stringify([]));
}
//show search names
//in    Event target:   input Element
//      Event Type:     keyup
//      Handler:        showSearchResult
//
//cal   krijojme nje vektor te ri
//      lexojm vektorin e state
//      if product.name,includes(keyword)
//          add the "product.name" to search result
//out   showSearchNames

//search  user shtyp 1 shkronje -> shfaqen productet me kte keyword
//
//in    Event target:   input Element
//      Event Type:     keyup
//      Handler:        showSearchResult
//
//        keyword
//cal   krijojme nje vektor te ri
//      lexojm vektorin e state
//      if product.name == keyword
//          add to search result
//out   showProducts(searchResultArray)

// let searchBtnElement = document.querySelector(".search-btn");
// searchBtnElement.addEventListener("click", showSearchResult);

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
  for (let index = 0; index < productsStateArray.length; index++) {
    let product = productsStateArray[index];
    let tempName = product.name.toLowerCase();
    let tempKeyword = keyword.toLowerCase();
    if (tempName.includes(tempKeyword)) {
      resultArray.push(product);
    }
  }
  return resultArray;
}

//Bonus
//    shto 1 element input dhe 1 element buton
//    kur user vendos 1 fjale dhe shtyp butonin
//    shfaqen produktet me kete emer
let shopArea = document.querySelector(".shop-area");

showProducts(productStateArray);

//Filter By

let filterDivElement = document.querySelector(".filters");
filterDivElement.addEventListener("click", filterProducts);

let filters = {
  category: [],
  color: [],
};
function filterProducts(event) {
  let filter = event.target;
  // console.log(filter.value.split("_"));
  let filterBy = filter.value.split("_")[0];
  let filterValue = filter.value.split("_")[1];
  filters[filterBy].push(filterValue); //student.name -> student[name]
  console.log(filters);
  let filteredProd = getFilterProducts(filters);
  console.log(filteredProd);
  showProducts(filteredProd);
}

function getFilterProducts(filters) {
  let filteredProducts = [];

  for (let index = 0; index < productsStateArray.length; index++) {
    const product = productsStateArray[index];
    if (filters.category.includes(product.category)) {
      //product[material] product[category]
      //check if present
      let present = false;
      for (let index = 0; index < filteredProducts.length; index++) {
        let filteredProduct = filteredProducts[index];
        if (filteredProduct.id == product.id) {
          present = true;
        }
      }
      if (present == false) {
        filteredProducts.push(product);
      }
    }
    // if(product.price > filters.price.min && product.price < filters.price.max){
    //   filteredProducts.push(product);
    // }
    for (let index1 = 0; index1 < product.colors.length; index1++) {
      const color = product.colors[index1];
      if (filters.color.includes(color)) {
        //check if present
        let present = false;
        for (let index = 0; index < filteredProducts.length; index++) {
          let filteredProduct = filteredProducts[index];
          if (filteredProduct.id == product.id) {
            present = true;
          }
        }
        if (present == false) {
          filteredProducts.push(product);
        }
      }
    }
  }
  return filteredProducts;
}

function filter(by, value) {
  let filteredProducts = [];

  if (by == "material" || by == "category") {
    for (let index = 0; index < productsStateArray.length; index++) {
      const product = productsStateArray[index];
      if (product[by] == value) {
        //product[material] product[category]
        filteredProducts.push(product);
      }
    }
  } else if (by == "color") {
    for (let index = 0; index < productsStateArray.length; index++) {
      const product = productsStateArray[index];
      if (product.colors.includes(value)) {
        filteredProducts.push(product);
      }
    }
  }
  return filteredProducts;
}
//Display Products-List
//in      produtcList
//cal
//        lexojme cdo element te vektorit
//
//out     per cdo element -> displayProduct(product)

function showProducts(productsList) {
  shopArea.innerHTML = ""; //fshine produketet qe jane shfaqur ne ekran
  for (let index = 0; index < productsList.length; index++) {
    const product = productsList[index];
    displayProduct(product);
  }
}

// showProducts(productsStateArray);

//Display Product
//in    product
//cal   selktojme elementet HTML ku do te shfaqim fushat e objektit
//
//out   ndryshojme .innerText ose src

function displayProduct(product) {
  let productLink = document.createElement("a");
  productLink.href = ` product.html?productId=${product.id} `; //query param
  productLink.classList.add("product");
  productLink.innerHTML = `
          <img class="profile" src=${product.img[0]} alt="" />
          <h1 class="name">${product.name}</h1>
          <h2 class="price">FROM ${product.price}$</h2>
          <p class="color">in ${product.colors.length} colors</p>
    `;
  shopArea.append(productLink);
}
