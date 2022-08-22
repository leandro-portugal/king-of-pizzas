const qs = (elmt) => document.querySelector(elmt);
const qsa = (elmt) => document.querySelectorAll(elmt);

let pizzaQuantity = 1;
let cart = [];
let modalKey = 0;
let actualPrice;


pizzaJson.map((item, index) => {
  let pizza = qs('.models .pizza-item').cloneNode(true);

  pizza.setAttribute('data-key', index);
  pizza.querySelector('.pizza-item--img img').src = item.img;
  pizza.querySelector('.pizza-item--name').innerHTML = item.name;
  pizza.querySelector('.pizza-item--desc').innerHTML = item.description;
  pizza.querySelector('.pizza-item--price').innerHTML = `A partir de R$ ${item.price[0].toFixed(2)}`;

  pizza.querySelector('a').addEventListener('click', (e) => {

    let key = e.target.closest('.pizza-item').getAttribute('data-key');
    modalKey = key;
    pizzaQuantity = 1

    e.preventDefault();

    qs('.pizzaBig img').src = pizzaJson[key].img;
    qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[2].toFixed(2)}`;
    qs('.pizzaInfo--size.selected').classList.remove('selected');
    qsa('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add('selected');
      }

      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

    });

    qsa('.pizzaInfo--size').forEach((size, sizeIndex) => {
      size.addEventListener('click', (e) => {

        qs('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        actualPrice = pizzaJson[key].price[sizeIndex].toFixed(2)

        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${actualPrice}`;
      });


    });

    qs('.pizzaInfo--qt').innerHTML = pizzaQuantity;
    qs('.pizzaWindowArea').style.opacity = 0;
    qs('.pizzaWindowArea').style.display = 'flex';

    setTimeout(() => {
      qs('.pizzaWindowArea').style.opacity = 1;
    }, 200);

  });

  qs('.pizza-area').append(pizza);

});


function closeModal() {

  qs('.pizzaWindowArea').style.opacity = 0;

  setTimeout(() => {
    qs('.pizzaWindowArea').style.display = 'none';
  }, 500);
}

qsa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
  item.addEventListener('click', closeModal);
});

qs('.pizzaInfo--qtless').addEventListener('click', () => {
  if (pizzaQuantity > 1) {
    pizzaQuantity--
    qs('.pizzaInfo--qt').innerHTML = pizzaQuantity;

  }

});

qs('.pizzaInfo--qtplus').addEventListener('click', () => {
  pizzaQuantity++
  qs('.pizzaInfo--qt').innerHTML = pizzaQuantity;

});



qs('.pizzaInfo--addButton').addEventListener('click', () => {

  let size = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'));
  let identifier = pizzaJson[modalKey].id + '&' + size;
  let key = cart.findIndex((item) => item.identifier == identifier);

  if (key > -1) {

    cart[key].quantity += pizzaQuantity;
  } else {
    cart.push(
      {
        identifier,
        id: pizzaJson[modalKey].id,
        size: size,
        price: actualPrice,
        quantity: pizzaQuantity,
      }
    );
  }

  closeModal();
  updateCart();

});

function updateCart() {

  if (cart.length > 0) {

    qs('aside').classList.add('show');
    qs('.cart').innerHTML = '';

    
    let subtotal = 0;
    let discount = 0;
    let total = 0;

    for (let i in cart) {

      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
      subtotal += pizzaItem.price[cart[i].size] * cart[i].quantity;
      
      console.log(subtotal);
      let cartItem = qs('.models .cart--item').cloneNode(true);
      let pizzaSizeName;
     
      switch (cart[i].size) {
        case 0:
          pizzaSizeName = 'Pequena';
          break;

        case 1:
          pizzaSizeName = 'Média';
          break;

        case 2:
          pizzaSizeName = 'Grande';
          break;
      }

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

      cartItem.querySelector('img').src = pizzaItem.img;
      cartItem.querySelector('.cart--item-name').innerHTML = pizzaName;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].quantity;

      cartItem.querySelector('.cart--item-qtless').addEventListener('click', () => {

        if (cart[i].quantity > 1) {

          cart[i].quantity--;

        } else {

          cart.splice(i, 1);
        }

        updateCart();

      });

      cartItem.querySelector('.cart--item-qtplus').addEventListener('click', () => {

        cart[i].quantity++;
        updateCart();

      });


      qs('.cart').append(cartItem);
    }
    discount = subtotal * 0.1;
    total = subtotal - discount;
    qs('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
    qs('.discount span:last-child').innerHTML = `R$ ${discount.toFixed(2)}`;
    qs('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
  } else {

    qs('aside').classList.remove('show');
  }
}
