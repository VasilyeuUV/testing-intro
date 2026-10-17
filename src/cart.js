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
  const allBuyCount = cartProduct ? cartProduct.quantity + buyCount : buyCount;
  if (allBuyCount > product.stock)
    throw new RangeError(`Столько товара (${buyCount}) нет на складе .`);

  return cartProduct
    ? addCartProductQuantity(cart, product.id, allBuyCount)
    : [
      ...cart,
      createCartProduct(product, allBuyCount)
    ];
}

function changeQuantity() {
  return notImplemented();
}

function removeFromCart() {
  return notImplemented();
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

function checkProductInCart(cart, productId) {
  return cart.find(p => p.id === productId);
}

function createCartProduct(product, qty) {
  const { category, ...productInfo } = product;
  return { ...productInfo, quantity: qty };
}

function addCartProductQuantity(cart, productId, qty) {
  return cart.map(p =>
    p.id === productId ? { ...p, quantity: qty } : p
  )
}



const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
