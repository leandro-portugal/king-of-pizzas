const qs = (elmt) => document.querySelector(elmt);
const qsa = (elmt) => document.querySelectorAll(elmt);

pizzaJson.map((item, index)=>{
let pizza = qs('.models .pizza-item').cloneNode(true);

pizza.querySelector('.pizza-item--img img').src = item.img;
pizza.querySelector('.pizza-item--name').innerHTML = item.name;
pizza.querySelector('.pizza-item--desc').innerHTML = item.description;
pizza.querySelector('.pizza-item--price').innerHTML = `A partir de R$ ${item.price[0].toFixed(2)}`;

qs('.pizza-area').append(pizza);
});