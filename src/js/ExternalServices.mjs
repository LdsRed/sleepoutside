const baseURL = 'http://wdd330-backend.onrender.com/checkout';

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {

  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
    // return fetch(this.path)
    //   .then(convertToJson)
    //   .then((data) => data);
  }
  
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`)
    const data = await convertToJson(response);
    const products = data.Result;

    // return products.find((item) => item.Id === id);
    return products;
  }
}
