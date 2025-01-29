import {renderListWithTemplate} from './utils.mjs';

function productCardTemplate(product){
    return `<li class="product-card">
          <a href="/product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand} ">
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
        this.listElement = document.querySelector(`${listElement}`);
        
    }


    async init(){
        const list = await this.dataSource.getData(this.category);
        // console.log('list', list); 
        // console.log('list element ', this.listElement);
        // renderWithTemplate(templateFunction, parentElement, data, callback)
        renderListWithTemplate(productCardTemplate, this.listElement, this.productFilter(list));
        document.querySelector(".title").innerHTML = this.category.charAt(0).toUpperCase() + this.category.slice(1);

    }

    productFilter(list){
        return list.filter((product)=> product.ListPrice != 179.99)
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

