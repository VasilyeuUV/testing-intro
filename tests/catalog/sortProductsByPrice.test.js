const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  // test.todo("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]");
  // test.todo('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]');
  // test.todo("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]");
  // test.todo("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]");
  // test.todo("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]");
  // test.todo("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]");
  // test.todo("'asc' не меняет исходный массив [1, 3, 4]");
  // test.todo("'desc' не меняет исходный массив [1, 3, 4]");
  // test.todo('направление по умолчанию не меняет исходный массив всех товаров');

  const arrSortAsc = [3, 6, 5, 4, 2, 1];
  const idsDefault = [1, 3, 4];
  const ascArg = 'asc';
  const descArg = 'desc';

  Array.prototype.getIds = function () {
    return this.map(p => p.id);
  };

  function getProductsByIds(ids) {
    return ids
      .map(id => products.find(p => p.id === id))
      .filter(Boolean);
  }

  test(`все товары c ${ascArg} сортируются как [${arrSortAsc}]`, () => {
    const result = sortProductsByPrice(products, ascArg)
      .getIds();
    expect(result).toEqual(arrSortAsc);
  })

  test(`все товары без направления сортируются как [${arrSortAsc}]`, () => {
    const result = sortProductsByPrice(products)
      .getIds();
    expect(result).toEqual(arrSortAsc);
  })

  test(`товары [${idsDefault.join(', ')}] c ${ascArg} сортируются как [3, 4, 1]`, () => {
    const expectedResult = [3, 4, 1];
    const selectedProducts = getProductsByIds(idsDefault);
    const result = sortProductsByPrice(selectedProducts, ascArg)
      .getIds();
    expect(result).toEqual(expectedResult);
  })

  test(`все товары c ${descArg} сортируются как [1, 2, 4, 5, 6, 3]`, () => {
    const expectedResult = [1, 2, 4, 5, 6, 3];
    const result = sortProductsByPrice(products, descArg)
      .getIds();
    expect(result).toEqual(expectedResult);
  })

  test(`товары [3, 1, 4] c ${descArg} сортируются как [1, 4, 3]`, () => {
    const initIds = [1, 4, 3];
    const expectedResult = [1, 4, 3];
    const selectedProducts = getProductsByIds(initIds);
    const result = sortProductsByPrice(selectedProducts, descArg)
      .getIds();
    expect(result).toEqual(expectedResult);
  });

  test(`товары [5, 2, 6] c ${descArg} сортируются как [2, 5, 6]`, () => {
    const initIds = [5, 2, 6];
    const expectedResult = [2, 5, 6];
    const selectedProducts = getProductsByIds(initIds);
    const result = sortProductsByPrice(selectedProducts, descArg)
      .getIds();
    expect(result).toEqual(expectedResult);
  });

  test(`${ascArg} не меняет исходный массив [${idsDefault}]`, () => {
    const selectedProducts = getProductsByIds(idsDefault);
    const idsBefore = selectedProducts.getIds();
    sortProductsByPrice(selectedProducts, ascArg);
    const idsAfter = selectedProducts.getIds();
    expect(idsAfter).toEqual(idsBefore);
  });

  test(`${descArg} не меняет исходный массив [${idsDefault}]`, () => {
    const selectedProducts = getProductsByIds(idsDefault);
    const idsBefore = selectedProducts.getIds();
    sortProductsByPrice(selectedProducts, descArg);
    const idsAfter = selectedProducts.getIds();
    expect(idsAfter).toEqual(idsBefore);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const idsBefore = products.getIds();
    sortProductsByPrice(products);
    const idsAfter = products.getIds();
    expect(idsAfter).toEqual(idsBefore);
  })
});
