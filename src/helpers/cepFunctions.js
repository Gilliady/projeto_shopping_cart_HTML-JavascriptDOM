export const getAddress = async (cep) => {
  // seu código aqui
  const awesomeApiBaseURL = 'https://cep.awesomeapi.com.br/json/';
  const brasilAPIBaseURL = 'https://brasilapi.com.br/api/cep/v2/';
  const cepResponse = await Promise.any([fetch(`${awesomeApiBaseURL}${cep}`),
    fetch(`${brasilAPIBaseURL}${cep}`)])
    .then((response) => response.json())
    .then((data) => data);
  const { address, district, city, state } = cepResponse;
  if (!cepResponse.address || !cepResponse.district
      || !cepResponse.city || !cepResponse.state) {
    throw new Error();
  }
  return `${address} - ${district} - ${city} - ${state}`;
};

export const searchCep = async () => {
  // seu código aqui
  try {
    const result = await getAddress(document.querySelector('.cep-input').value);
    document.querySelector('.cart__address').innerHTML = result;
  } catch (error) {
    document.querySelector('.cart__address').innerHTML = 'CEP não encontrado';
  }
};
