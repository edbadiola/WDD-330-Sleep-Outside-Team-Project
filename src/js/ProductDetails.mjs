import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
    // Price elements
  const productPrice = document.getElementById("productPrice");
  const originalPrice = document.getElementById("originalPrice");
  const discountedPrice = document.getElementById("discountedPrice");
  const discountBadge = document.getElementById("discountBadge");

  if (product.SuggestedRetailPrice && product.SuggestedRetailPrice > product.FinalPrice) {
    // Calculate discount %
    const discountPercent = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) * 100
    );

    // Fill in values
    originalPrice.textContent = `Original Price: $${product.SuggestedRetailPrice.toFixed(2)}`;
    discountedPrice.textContent = `Discount: $${product.FinalPrice.toFixed(2)}`;
    discountBadge.textContent = `-${discountPercent}% OFF`;

  
    originalPrice.style.textDecoration = "line-through";
    originalPrice.style.marginRight = "0.5rem";
    discountedPrice.style.color = "red";
  } 
  else {
    // No discount case
    productPrice.textContent = `$${product.FinalPrice.toFixed(2)}`;
    originalPrice.textContent = "";
    discountedPrice.textContent = "";
    discountBadge.textContent = "";
  }

    document.getElementById("productColour").textContent = `Colour: ${product.Colors[0].ColorName}`;
    document.getElementById("productDesc").innerHTML = `Description: ${product.DescriptionHtmlSimple}`;
    document.getElementById("addToCart").dataset.id = product.Id;
}

// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }