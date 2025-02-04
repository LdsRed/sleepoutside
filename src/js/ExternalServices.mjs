// const baseURL = 'http://wdd330-backend.onrender.com/checkout';
const baseURL = import.meta.env.VITE_SERVER_URL;




function convertToJson(res) {
  jsonResponse = res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw {name: 'servicesError', message: jsonResponse};  }
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
