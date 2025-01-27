import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import {getParam} from './utils.mjs';


const category = getParam('category');

const dataSource = new ProductData();
const productList = new ProductList(category, dataSource, '.product-list');
productList.init();



