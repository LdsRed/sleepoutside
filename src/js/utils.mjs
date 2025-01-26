// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParams(param) {
  const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get(param);
return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false){
  if (clear) parentElement.innerHTML = '';
  const htmlStrings = list.map((product)=> templateFn(product));
  parentElement.insertAdjacentHTML(position,htmlStrings.join(''));
}


export function renderWithTemplate(templateFn, parentElement, data, callback){

  let template = templateFn
  parentElement.insertAdjacentHTML('afterbegin', templateFn);
  console.log('renderWithTemplate template', template);
  if (callback) {
    callback(data);
  }

}

 export async function loadTemplate (path){
const html = await fetch(path);
const htmlResponse = await html.text();
  return htmlResponse
 }

export async function loadHeaderFooter(path){  
  // fetching the path of the html file
  let footerTemplate = await loadTemplate('/partials/footer.html');
 // console.log('footerTemplate ', footerTemplate);
 let headTemplate =  await loadTemplate('/partials/header.html');
 // console.log('headTemplate ', headTemplate);
 
 let footerId = document.getElementById('footer');
 let headerId = document.getElementById('header');
 
 renderWithTemplate(footerTemplate,footerId);
 renderWithTemplate(headTemplate,headerId);


};



