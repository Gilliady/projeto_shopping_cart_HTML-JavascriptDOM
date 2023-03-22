import { searchCep } from './helpers/cepFunctions';
import './style.css';
import {
  /* createCartProductElement, */
  createProductElement,
} from './helpers/shopFunctions';
import { fetchProductsList /* fetchProduct */ } from './helpers/fetchFunctions';

const productsSection = document.querySelector('.products');

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

window.onload = () => {
  loading();
  renderProduct();
};

document.querySelector('.cep-button').addEventListener('click', searchCep);
