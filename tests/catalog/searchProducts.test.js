const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  // test.todo("'Наушники' возвращает товар с ID 1");
  // test.todo("'Чистый код' возвращает товар с ID 6");
  // test.todo("'Настольная лампа' возвращает товар с ID 4");
  // test.todo("'javascript' возвращает товар с ID 3");
  // test.todo("'ЧЕХОЛ' возвращает товар с ID 5");
  // test.todo("'наушники' возвращает товар с ID 1");
  // test.todo("пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]");
  // test.todo("строка из пробелов возвращает товары с ID [1, 2, 3, 4, 5, 6]");
  // test.todo("'\\t\\n' возвращает товары с ID [1, 2, 3, 4, 5, 6]");

  const allExpected = [1, 2, 3, 4, 5, 6];

  function getTestTitle(description, expectedIds) {
    const word = expectedIds.length === 1 ? 'товар' : 'товары';
    return `${description} возвращает ${word} с ID: ${JSON.stringify(expectedIds)}`;
  }

  const rawCases = [
    ["'Наушники'", 'Наушники', [1]],
    ["'Чистый код'", 'Чистый код', [6]],
    ["'Настольная лампа'", 'Настольная лампа', [4]],
    ["'javascript'", 'javascript', [3]],
    ["'ЧЕХОЛ'", 'ЧЕХОЛ', [5]],
    ["'наушники'", 'наушники', [1]],
    ['пустая строка', '', allExpected],
    ['строка из пробелов', '   ', allExpected],
    ["'\\t\\n'", '\t\n', allExpected],
  ];

  const cases = rawCases.map(([description, query, expectedIds]) => {
    const title = getTestTitle(description, expectedIds);
    return [title, query, expectedIds];
  });

  test.each(cases)('%s', (title, query, expectedIds) => {
    const result = searchProducts(products, query)
      .map(p => p.id)
    expect(result).toEqual(expectedIds);
  });

});
