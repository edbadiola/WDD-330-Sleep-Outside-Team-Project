import { loadHeaderFooter } from "./utils.mjs";
<<<<<<< HEAD

loadHeaderFooter();
=======
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

productList.init();
>>>>>>> cec7531f194748424437bea3c0e5b8dec881a703
