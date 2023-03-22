import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct is a function', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  
  it('Call function and verify fetch', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });
  
  it('Verify returns', async() => {
    expect(await fetchProduct('MLB1405519561')).toStrictEqual(product);
  });

  it('Throw an error: \'ID não informado\'', () =>{
    expect(async () => await fetchProduct()).rejects.toThrow('ID não informado');
  });
});
