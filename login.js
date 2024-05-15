//Set users
let userList = localStorage.getItem("users");
if (!userList) {
  localStorage.setItem("users", "[]");
}

let loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", handleLogin);
function handleLogin(event) {
  event.preventDefault();
  let emailElement = document.querySelector("#email");
  let passwordElement = document.querySelector("#password");
  let email = emailElement.value;
  let password = passwordElement.value;

  //fetch data to BackEnd and get a jwt
  //save jwt to localStorage
  let userList = JSON.parse(localStorage.getItem("users"));
  let authUser;
  for (let index = 0; index < userList.length; index++) {
    const user = userList[index];
    if (user.email == email && user.password == password) {
      authUser = user;
    }
  }
  if (!authUser) {
    console.log("Wrong credentials");
  } else {
    console.log("You are logged in");
    //ridirect to shop
    window.location = "shop.html";
  }
  localStorage.setItem("authUser", JSON.stringify(authUser));
}

let signForm = document.querySelector("#sign-form");
signForm.addEventListener("submit", handleSignUp);
function handleSignUp(event) {
  event.preventDefault();
  let emailElement = document.querySelector("#sign-email");
  let passwordElement = document.querySelector("#sign-password");
  let email = emailElement.value;
  let password = passwordElement.value;
  //Check if user exists
  let userList = JSON.parse(localStorage.getItem("users"));
  for (let index = 0; index < userList.length; index++) {
    const user = userList[index];
    if (user.email == email) {
      console.log("Email already in use");
      return;
    }
  }
  //Create user
  let newUser = {
    email: email,
    password: password,
  };
  //Save user data
  userList.push(newUser);
  localStorage.setItem("users", JSON.stringify(userList));
  emailElement.value = "";
  passwordElement.value = "";
}
