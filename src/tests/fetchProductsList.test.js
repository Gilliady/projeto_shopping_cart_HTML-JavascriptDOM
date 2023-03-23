import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toBeCalled();
  });
  
  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async() => {
    await fetchProductsList('computador');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  
  it('retorno ao executar fetchProductsList', async() => {
    expect((await fetchProductsList('computador'))).toEqual(computadorSearch);
  });
  
  it('throw Error e imprime no console a mensagem: Termo de busca não informado', () => {
    expect( () => { fetchProductsList() }).toThrowError();
    expect( () => { fetchProductsList() }).toThrow('Termo de busca não informado');
  })
})
