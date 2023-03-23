import Swal from 'sweetalert2';
import { searchCep } from './helpers/cepFunctions';
import './style.css';
import {
  createCartProductElement,
  /* createCartProductElement, */
  createProductElement,
} from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';

const productsSection = document.querySelector('.products');
const cartSection = document.querySelector('.cart__products');

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

const addEventOnAddOnCartButton = () => {
  const addOnCartButtons = document.querySelectorAll('.product__add');
  addOnCartButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const productID = button.parentNode.firstChild.innerText;
      saveCartID(productID);
      const productData = await fetchProduct(productID);
      cartSection.append(createCartProductElement(productData));
    });
  });
};

window.onload = () => {
  loading();
  renderProduct()
    .then(() => addEventOnAddOnCartButton()).catch(() => {
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
};

document.querySelector('.cep-button').addEventListener('click', searchCep);
