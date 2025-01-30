import ProductData from './ProductData.mjs';
// renamed to ProductList to eliminate ambiguity from product-listing.js file
import ProductList from './ProductList.mjs';
import { getParam } from './utils.mjs';

const category = getParam('category');

const dataSource = new ProductData();

const productList = new ProductList(category, dataSource, '.product-list');
productList.init();
