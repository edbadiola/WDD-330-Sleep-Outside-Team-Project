import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.originalList = []; // keep the data for re-sorting
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.originalList = list;                // save
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;

    document.querySelector("#sort").addEventListener("change", (e) => {
      this.sortAndRender(e.target.value);
    });
  }

  sortAndRender(option) {
    let sorted = [...this.originalList];

    switch (option) {
      case "name-asc":
        sorted.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
    }

    this.renderList(sorted, true); 
  }

  renderList(list, clear = false) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", clear);
  }
}
