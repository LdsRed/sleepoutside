import { getLocalStorage, setLocalStorage} from './utils.mjs';

function productDetailsTemplate(product) {
  // console.log('product object ', product);
    return ` <section class="product-detail">
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.Name}</h2>
        <img
          class="divider"
          src="${product.Images.PrimaryLarge}"
          alt="${product.NameWithoutBrand}"
        />
        <p class="product-card__price">${product.ListPrice}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>`;
};


export default class ProductDetails {
constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
}

async init(){
    // console.log('productId', this.productId);
    this.product = await this.dataSource.findProductById(this.productId);
    console.log('product', this.product);
    this.renderProductDetails("main");
    // console.log('productDetails', this.product);
    const addToCartButton = document.getElementById('addToCart');
    // console.log('addToCartButton is present ',addToCartButton);
    addToCartButton.addEventListener('click', () => this.addProductToCart(this.product));

};


addProductToCart(product) {
    console.log("Product Added ",product);
    let cartItems = getLocalStorage('so-cart') || [];
    cartItems.push(product);
    setLocalStorage('so-cart', cartItems);
  }

renderProductDetails(selector){
const element = document.querySelector(selector);

element.insertAdjacentHTML('afterBegin',productDetailsTemplate(this.product));

};

}
