const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

describe('filterByCategory', () => {
  const allEpected = [1, 2, 3, 4, 5, 6];
  const expectedElectronics = [1, 2];
  const expectedBooks = [3, 6];
  const expectedHome = [4, 5];
  const expextedEmptyArr = [];

  //test.todo("'all' возвращает товары с ID [1, 2, 3, 4, 5, 6]");
  test(`'all' возвращает товары с ID [${allEpected}]`, () => {
    const result = filterByCategory(products, 'all');
    const resultIds = result.map(p => p.id);
    expect(resultIds).toEqual(allEpected);
  })

  // test.todo("undefined возвращает товары с ID [1, 2, 3, 4, 5, 6]");
  test(`undefined возвращает товары с ID [${allEpected}]`, () => {
    const arg = undefined;
    const result = filterByCategory(products, arg)
      .map(p => p.id);
    expect(result).toEqual(allEpected);
  })

  // test.todo("пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]");
  test(`пустая строка возвращает товары с ID [${allEpected}]`, () => {
    const result = getResult('');
    expect(result).toEqual(allEpected);
  })

  // test.todo("'electronics' возвращает товары с ID [1, 2]");
  test(`'electronics' возвращает товары с ID [${expectedElectronics}]`, () => {
    const arg = 'electronics';
    expect(getResult(arg)).toEqual(expectedElectronics);
  })

  // test.todo("'books' возвращает товары с ID [3, 6]");
  test(`'books' возвращает товары с ID [${expectedBooks}]`, () => {
    const arg = 'books';
    expect(getResult(arg)).toEqual(expectedBooks);
  })

  // test.todo("'home' возвращает товары с ID [4, 5]");
  test(`'home' возвращает товары с ID [${expectedHome}]`, () => {
    const arg = 'home';
    expect(getResult(arg)).toEqual(expectedHome);
  })

  // test.todo("'clothes' возвращает пустой массив");
  test("'clothes' озвращает пустой массив", () => {
    const arg = 'clothes';
    expect(getResult(arg)).toEqual(expextedEmptyArr);
  })

  // test.todo("'toys' возвращает пустой массив");
  test("'toys' возвращает пустой массив", () => {
    const arg = 'toys';
    expect(getResult(arg)).toEqual(expextedEmptyArr);
  })

  // test.todo("'sports' возвращает пустой массив");
  test("'sports' возвращает пустой массив", () => {
    const arg = 'sports';
    expect(getResult(arg)).toEqual(expextedEmptyArr);
  })

  function getResult(category) {
    return filterByCategory(products, category)
      .map(p => p.id);
  }
});

describe('filterByCategory через параметризированный тест', () => {
  const allEpected = [1, 2, 3, 4, 5, 6];
  const expectedEmptyArr = [];

  const cases = [
    ['all', allEpected],
    [undefined, allEpected],
    ['', allEpected],
    ['electronics', [1, 2]],
    ['books', [3, 6]],
    ['home', [4, 5]],
    ['clothes', expectedEmptyArr],
    ['toys', expectedEmptyArr],
    ['sports', expectedEmptyArr],
  ];

  test.each(cases)('категория "%s" должна вернуть товары с ID: %j',
    (category, expectedIds) => {
      const result = filterByCategory(products, category)
        .map(p => p.id);
      expect(result).toEqual(expectedIds);
    });
});
