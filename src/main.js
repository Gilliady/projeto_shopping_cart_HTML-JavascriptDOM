import Swal from 'sweetalert2';
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
  renderProduct().catch(() => {
    document.querySelector('.loading').innerHTML = '';
    /* h3el.classList.add('error');
    h3el.classList.remove('loading');
    h3el.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente'; */
    // solução com Swal.;
    Swal.fire({
      title: 'Algum erro ocorreu, recarregue a página e tente novamente',
      customClass: { title: 'error' },
    });
  });
};

document.querySelector('.cep-button').addEventListener('click', searchCep);
