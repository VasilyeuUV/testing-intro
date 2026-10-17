const products = require('./data/products');
const { getProductById } = require('./catalog');

const PROMO = 'SAVE10';
const PROMO_PRICE = 20_000;
const DISCOUNT = 0.1;
const FREE_DELIVERY_PRICE = 50_000;
const DELIVERY_PRICE = 30_000



function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, buyCount) {
  cart = checkCart(cart);
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
  cart = checkCart(cart);

  const product = getProduct(productId);
  if (!product) return cart;

  if (typeof qty !== 'number' || qty < 1 || qty > product.stock)
    throw new RangeError(`Столько товара (${qty}) нет на складе .`);

  return cart.map(p =>
    p.id === productId ? { ...p, quantity: qty } : p
  )
}

function removeFromCart(cart, productId) {
  cart = checkCart(cart);
  return cart.filter(item => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  cart = checkCart(cart);
  return cart.reduce((total, p) => total + (p.price * p.quantity), 0);
}

function calculateOrderTotal(cart, promo) {
  cart = checkCart(cart);
  const subtotal = calculateCartSubtotal(cart);
  const delivery = subtotal < 1
    ? 0
    : subtotal < FREE_DELIVERY_PRICE ? DELIVERY_PRICE : 0;
  const discount = subtotal < 1
    ? 0
    : promo === PROMO && subtotal >= PROMO_PRICE
      ? subtotal * DISCOUNT
      : 0;
  const total = subtotal + delivery - discount;
  return { subtotal, discount, delivery, total };
}


function checkCart(cart) {
  return !cart || !Array.isArray(cart) ? [] : cart;
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
