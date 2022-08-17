const qs = (elmt) => document.querySelector(elmt);
const qsa = (elmt) => document.querySelectorAll(elmt);

let pizzaQuantity = 1;

pizzaJson.map((item, index) => {
  let pizza = qs('.models .pizza-item').cloneNode(true);

  pizza.setAttribute('data-key', index);
  pizza.querySelector('.pizza-item--img img').src = item.img;
  pizza.querySelector('.pizza-item--name').innerHTML = item.name;
  pizza.querySelector('.pizza-item--desc').innerHTML = item.description;
  pizza.querySelector('.pizza-item--price').innerHTML = `A partir de R$ ${item.price[0].toFixed(2)}`;

  pizza.querySelector('a').addEventListener('click', (e) => {

    let key = e.target.closest('.pizza-item').getAttribute('data-key');
    pizzaQuantity = 1

    e.preventDefault();

    qs('.pizzaBig img').src = pizzaJson[key].img;
    qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[2].toFixed(2)}`;
    qs('.pizzaInfo--size.selected').classList.remove('selected');

    qsa('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if(sizeIndex == 2){
        size.classList.add('selected');
        
      }

      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]; 
      
    });;
 
   
    qs('.pizzaInfo--qt').innerHTML = pizzaQuantity;
    qs('.pizzaWindowArea').style.opacity = 0;
    qs('.pizzaWindowArea').style.display = 'flex';

    setTimeout(() => {
      qs('.pizzaWindowArea').style.opacity = 1;
    }, 200);

  });

  qs('.pizza-area').append(pizza);
});