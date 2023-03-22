import { searchCep } from './helpers/cepFunctions';
import './style.css';
import {
  /* createCartProductElement, */
  createProductElement,
} from './helpers/shopFunctions';
import { fetchProductsList /* fetchProduct */ } from './helpers/fetchFunctions';

const renderProduct = async () => {
  const computers = await fetchProductsList('computador');
  const productsSection = document.querySelector('.products');
  computers.forEach((computador) => {
    productsSection.appendChild(createProductElement(computador));
  });
};

window.onload = () => {
  renderProduct();
};

document.querySelector('.cep-button').addEventListener('click', searchCep);
