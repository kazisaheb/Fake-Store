const allProducts = document.getElementById("all-products")
const inputField = document.getElementById("input-field")

fetch('../data/data.json')
  .then(res => res.json())
  .then(data => loadProducts(data))

const loadProducts = (data) => {
  for (const product of data) {
    const div = document.createElement("div")
    div.classList.add("product")
    div.innerHTML = `<div class="single-product">
        <div>
        <img class="product-image" src=${product.image}></img>
        </div>
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <h2>Price: $ ${product.price}</h2>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button id="details-btn" class="btn btn-danger">Details</button></div>
        `;
    allProducts.append(div);
  }
}

// ===========category==========
categori = (categori) => {
  fetch('../data/data.json')
    .then(res => res.json())
    .then(data => {
      allProducts.innerHTML = ''
      const filtered = data.filter(item => item.category === categori);
      loadProducts(filtered)
    })
}
// ===========category end==========

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.round(total);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.02);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.03);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.04);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};

// Cart show hide
const myCart = document.getElementById('my-cart')

showCart = () => {
  myCart.style.transform = "rotate(0deg)"
  myCart.style.right = "0px"
}
hideCart = () => {
  myCart.style.transform = "rotate(-90deg)"
  myCart.style.right = "-230px"
}