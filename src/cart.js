const products = require('./data/products');
const { getProductById } = require('./catalog');

function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, buyCount) {
  if (!cart) cart = [];
  if (!checkProduct(product)) throw new TypeError('Продукт не распознан.');
  if (typeof buyCount !== 'number' || buyCount < 1 || buyCount > product.stock)
    throw new RangeError(`Столько товара (${buyCount}) нет на складе .`);

  const cartProduct = checkProductInCart(cart, product.id);
  return cartProduct
    ? changeQuantity(cart, product.id, cartProduct.quantity + buyCount)
    : [
      ...cart,
      createCartProduct(product, buyCount)
    ];
}

function changeQuantity(cart, productId, qty) {
  const product = getProduct(productId);
  if (!product) return cart;

  if (typeof qty !== 'number' || qty < 1 || qty > product.stock)
    throw new RangeError(`Столько товара (${qty}) нет на складе .`);

  return cart.map(p =>
    p.id === productId ? { ...p, quantity: qty } : p
  )
}

function removeFromCart(cart, productId) {
  return cart.filter(item => item.id !== productId);
}

function calculateCartSubtotal() {
  return notImplemented();
}

function calculateOrderTotal() {
  return notImplemented();
}

function checkProduct(product) {
  return product !== null && typeof product === 'object' && 'id' in product;
}

function getProduct(id) {
  return products.find(p => p.id === id);
}

function checkProductInCart(cart, productId) {
  return cart.find(p => p.id === productId);
}

function createCartProduct(product, qty) {
  const { category, ...productInfo } = product;
  return { ...productInfo, quantity: qty };
}


const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
