import Swal from 'sweetalert2';
import { searchCep } from './helpers/cepFunctions';
import './style.css';
import {
  createCartProductElement,
  /* createCartProductElement, */
  createProductElement,
} from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';

const productsSection = document.querySelector('.products');
const cartSection = document.querySelector('.cart__products');

const updateTotalValue = () => {
  const values = document.querySelectorAll('li .product__price__value');
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerText = Array.prototype.reduce.call(
    values,
    (acc, curr) => acc + Number(curr.innerText),
    0,
  );
};

const loading = () => {
  const loadingText = document.createElement('h3');
  loadingText.innerText = 'carregando...';
  loadingText.classList.add('loading');
  productsSection.appendChild(loadingText);
};

const renderProduct = async () => {
  const computers = await fetchProductsList('computador');
  productsSection.innerHTML = '';
  computers.forEach((computador) => {
    productsSection.appendChild(createProductElement(computador));
  });
};

const addOnCart = async (productData) => {
  saveCartID(productData.id);
  const elementCreated = createCartProductElement(productData);
  cartSection.append(elementCreated);
  elementCreated.addEventListener('click', updateTotalValue);
  updateTotalValue();
};

const loadCartFromLocalStorage = async () => {
  const productsData = getSavedCartIDs().map((id) => fetchProduct(id));
  await Promise.all(productsData).then((products) => {
    localStorage.setItem('cartProducts', '');
    products.forEach((product) => {
      addOnCart(product);
    });
  });
  updateTotalValue();
};

const addEventOnAddOnCartButton = () => {
  const addOnCartButtons = document.querySelectorAll('.product__add');
  addOnCartButtons.forEach(async (button) => {
    button.addEventListener('click', async () => {
      const productData = await fetchProduct(
        button.parentNode.firstChild.innerText,
      );
      await addOnCart(productData);
    });
  });
};

window.onload = () => {
  loading();
  renderProduct()
    .then(() => {
      addEventOnAddOnCartButton();
    })
    .catch(() => {
      document.querySelector('.loading').innerHTML = '';
      // solução padrão:
      /* h3el.classList.add('error');
      h3el.classList.remove('loading');
      h3el.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente'; */
      // solução com Swal:
      Swal.fire({
        title: 'Algum erro ocorreu, recarregue a página e tente novamente',
        customClass: { title: 'error' },
      });
    });
  if (localStorage.getItem('cartProducts')) {
    loadCartFromLocalStorage();
  }
};

document.querySelector('.cep-button').addEventListener('click', searchCep);
