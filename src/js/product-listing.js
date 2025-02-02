import ExternalServices from './ExternalServices.mjs';
// renamed to ProductList to eliminate ambiguity from product-listing.js file
import ProductList from './ProductList.mjs';
import {getParam} from './utils.mjs';

const category = getParam('category');

const dataSource = new ExternalServices();

const productList = new ProductList(category, dataSource, '.product-list');
productList.init();
// Adding searching event
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = qs('#searchForm');
    const searchInput = qs('#searchInput');
  
    if (searchForm) {
      searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
  
        if (query) {
          // Obtener productos y filtrarlos
          const allProducts = await dataSource.getData(category);
          const filteredProducts = allProducts.filter(product =>
            product.NameWithoutBrand.toLowerCase().includes(query)
          );
  
          // Renderizar los productos filtrados
          productList.renderList(filteredProducts);
        }
      });
    }
  });