export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
  }
  return fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .then((data) => data);
};
export const fetchProductsList = (query) => {
  if (query) {
    return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
      .then((response) => response.json())
      .then((data) => data.results);
  }
  throw new Error('Termo de busca não informado');
};
