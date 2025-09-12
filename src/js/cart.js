import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">Qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();


// --- Remove from Cart Feature ---

// Re-render cart with remove buttons
function renderCartWithRemove() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item, idx) => {
    // Notice the smaller width, font-size, and image size!
    return `<li class="cart-card divider" style="display:block;width:100%;margin-bottom:0.5em;font-size:0.85em;padding:0.5em;">
      <span class="remove-item" data-index="${idx}" style="cursor:pointer; color:red; float:right; font-weight:bold;">X</span>
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" style="width:300px;height:auto;" />
      </a>
      <a href="#">
        <h2 class="card__name" style="font-size:1em;margin:0;">${item.Name}</h2>
      </a>
      <p class="cart-card__color" style="margin:0.25em 0;">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity" style="margin:0.25em 0;">qty: 1</p>
      <p class="cart-card__price" style="margin:0.25em 0;">$${item.FinalPrice}</p>
    </li>`;
  });
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", function () {
      const idx = parseInt(this.getAttribute("data-index"));
      removeCartItemAtIndex(idx);
    });
  });
}

// Remove only the specific item clicked
function removeCartItemAtIndex(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1); // Remove the item at this index
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartWithRemove();
}
renderCartWithRemove();

