export const getAddress = async (cep) => {
  // seu código aqui
  const awesomeApiBaseURL = 'https://cep.awesomeapi.com.br/json/';
  const brasilAPIBaseURL = 'https://brasilapi.com.br/api/cep/v2/';
  const cepResponse = await Promise.any([fetch(`${awesomeApiBaseURL}${cep}`),
    fetch(`${brasilAPIBaseURL}${cep}`)])
    .then((response) => response.json())
    .then((data) => data);
  if (cepResponse.address) {
    const { address, district, city, state } = cepResponse;
    return `${address} - ${district} - ${city} - ${state}`;
  }
  if (cepResponse.street) {
    const { street, city, state, neighborhood } = cepResponse;
    return `${street} - ${neighborhood} - ${city} - ${state}`;
  }
  throw new Error();
};

export const searchCep = async () => {
  // seu código aqui
  try {
    const result = await getAddress(document.querySelector('.cep-input').value);
    document.querySelector('.cart__address').innerHTML = result;
  } catch (e) {
    document.querySelector('.cart__address').innerText = 'CEP não encontrado';
  }
};
