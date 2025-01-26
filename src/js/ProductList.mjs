import { renderListWithTemplate } from '/js/utils.mjs';

function productCardTemplate(product){
    return `<li class="product-card">
          <a href="/product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand} ">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.ListPrice}</p>
          </a>
        </li>`
}




export default class ProductListing{
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        
    }

    async init(){
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector('.title').innerHTML = this.category.charAt(0).toUpperCase() + this.category.slice(1).toLowerCase();
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
      }

    // renderList(list){
    //     const htmlStrings = list.map((product)=> productCardTemplate(product));
    //     this.listElement.insertAdjacentHTML('afterbegin',htmlStrings.join(''));
    // }

    // rewriting the above how I would have done it to help me think differently
    // renderList(list){
    //     const htmlStrings = [];
    //     for (product of list){
    //         htmlStrings.push(productCardTemplate(product));
    //     }
    //     this.listElement.innerHTML = htmlStrings.join('');
    // };
}

