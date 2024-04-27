let minusButton = document.getElementById("minus-button");
let plusButton = document.getElementById("plus-button");
let counter = document.getElementById("counter");
let count = 0;

minusButton.addEventListener("click", () => {
  count--;
  counter.textContent = count;
});

plusButton.addEventListener("click", () => {
  count++;
  counter.textContent = count;
});
