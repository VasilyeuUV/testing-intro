const products = require('../../src/data/products');
const { getProductById } = require('../../src/catalog');

describe('getProductById', () => {
  // test.todo('ID 1 возвращает products[0]');
  // test.todo('ID 4 возвращает products[3]');
  // test.todo('ID 6 возвращает products[5]');
  // test.todo('ID 0 возвращает null');
  // test.todo('ID 999 возвращает null');
  // test.todo('ID -1 возвращает null');
  // test.todo("строковый ID '1' возвращает null");
  // test.todo('ID undefined возвращает null');
  // test.todo('ID NaN возвращает null');

  const cases = [
    ['ID 1 возвращает products[0]', 1, products[0]],
    ['ID 4 возвращает products[3]', 4, products[3]],
    ['ID 6 возвращает products[5]', 6, products[5]],
    ['ID 0 возвращает null', 0, null],
    ['ID 999 возвращает null', 999, null],
    ['ID -1 возвращает null', -1, null],
    ["строковый ID '1' возвращает null", '1', null],
    ['ID undefined возвращает null', undefined, null],
    ['ID NaN возвращает null', NaN, null],
  ];

  test.each(cases)('%s', (description, id, res) => {
    const result = getProductById(products, id);
    expect(result).toEqual(res);
  });
});
