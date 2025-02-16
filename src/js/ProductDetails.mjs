import { getLocalStorage, setLocalStorage} from './utils.mjs';

function productDetailsTemplate(product,productImages) {
  // console.log('product object ', product);
    return ` <section class="product-detail">
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.Name}</h2>
        <img
          class="divider"
          src="${product.Images.PrimaryLarge}"
          alt="${product.NameWithoutBrand}"/>
        <p class="product-card__price">${product.ListPrice}</p>
        
        <div class="product__colors">
        <h3>Colors</h3>
        <div id="imageSwatches">
          ${productImages}
          </div>
        </div>

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
    this.preppedProduct = {};
    this.dataSource = dataSource;
    this.selectedColorId = null;
    // this.imageSwatches = document.querySelector('#imageSwatches').addEventListener('click', (e) => {});
}

async init(){
    // console.log('productId', this.productId);
    this.product = await this.dataSource.findProductById(this.productId);
  
    console.log('product', this.product);
    this.imageSwatches = this.product.Colors.map((color,index) => `<div class="imageSwatch"><img src="${color.ColorPreviewImageSrc}" data-id="${color.ColorCode}" alt="${color.ColorName}" title="${color.ColorName}" class="${index === 0 ? 'selected' : null}" width=25 height=25></div>`).join('');
    // console.log('images',images);
    this.renderProductDetails("main");
    // console.log('productDetails', this.product);
    document.querySelector('#imageSwatches').addEventListener('click', (e) => { this.handleSwatchClick(e)});

    const addToCartButton = document.getElementById('addToCart');
    // console.log('addToCartButton is present ',addToCartButton);
    addToCartButton.addEventListener('click', () => {
      console.log('add to cart clicked');
      this.addProductToCart(this.product)
    });

};


handleSwatchClick(event) {
    this.selectedColorId = parseInt(event.target.getAttribute('data-id'));
    // console.log('selectedColorId from handleSwatchClick', this.selectedColorId)
    // remove all selected classes
    const selectedSwatches = document.querySelectorAll('#imageSwatches .selected');
    if (this.imageSwatches.length > 0) {
      selectedSwatches.forEach((swatch) => {
      swatch.classList.remove('selected');
    });}
    event.target.classList.add('selected');

    // console.log('selectedColorId', this.selectedColorId);
}

addProductToCart(product) {
    // console.log("Product to be added ",product);
    let cartItems = getLocalStorage('so-cart') || [];
    this.preppedProduct = {...product};

    // const selectedColor = this.preppedProduct.Colors.find(color => parseInt(color.ColorCode) === parseInt(this.selectedColorId));
    // console.log('selectedColor: ',selectedColor);
      this.preppedProduct.Colors = [this.preppedProduct.Colors.find(color => {
        return parseInt(color.ColorCode) === parseInt(this.selectedColorId)
      })];

      console.log('preppedProduct', this.preppedProduct);
    cartItems.push(this.preppedProduct);
    setLocalStorage('so-cart', cartItems);
    // added to reload page to update cart count
    // location.reload();
  }



renderProductDetails(selector){
const element = document.querySelector(selector);
element.insertAdjacentHTML('afterBegin',productDetailsTemplate(this.product,this.imageSwatches));

};

}
