// Данные фасовок товара «Ананасовый улун»
const VARIANTS = [
  { weight: '100 г',  article: '01306', price: 326.4, oldPrice: 349.2 },
  { weight: '500 г',  article: '01307', price: 1432,  oldPrice: 1646 },
  { weight: '1000 г', article: '01308', price: 2064,  oldPrice: 2592 },
  { weight: '5000 г', article: '01309', price: 6320,  oldPrice: 8710 },
];

// Форматирование цены: 326.4 → «326,40 ₽», 1432 → «1 432 ₽»
function formatPrice(value) {
  const formatted = value.toLocaleString('ru-RU', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `${formatted}\u00A0₽`;
}

const articleEl = document.getElementById('product-article');
const priceEl = document.getElementById('product-price');
const oldPriceEl = document.getElementById('product-price-old');
const discountEl = document.getElementById('product-discount');
const variantsEl = document.getElementById('variants');
const cartBtn = document.getElementById('add-to-cart');
const cartBtnLabel = cartBtn.querySelector('.btn-cart__label');

// Обновление артикула, цен и скидки при смене фасовки
function updateVariant(index) {
  const v = VARIANTS[index];
  articleEl.textContent = v.article;
  priceEl.textContent = formatPrice(v.price);

  if (v.oldPrice && v.oldPrice > v.price) {
    oldPriceEl.textContent = formatPrice(v.oldPrice);
    oldPriceEl.hidden = false;
    discountEl.textContent = `−${Math.round((1 - v.price / v.oldPrice) * 100)}%`;
    discountEl.hidden = false;
  } else {
    oldPriceEl.hidden = true;
    discountEl.hidden = true;
  }

  // Сбрасываем состояние «добавлено» у кнопки при смене варианта
  cartBtn.classList.remove('btn-cart--added');
  cartBtnLabel.textContent = 'В корзину';
}

variantsEl.addEventListener('change', (event) => {
  const input = event.target.closest('input[name="weight"]');
  if (input) updateVariant(Number(input.value));
});

// Фиктивное добавление в корзину: меняем состояние кнопки
let cartBtnTimer;

cartBtn.addEventListener('click', () => {
  cartBtn.classList.add('btn-cart--added');
  cartBtnLabel.textContent = 'Добавлено';

  clearTimeout(cartBtnTimer);
  cartBtnTimer = setTimeout(() => {
    cartBtn.classList.remove('btn-cart--added');
    cartBtnLabel.textContent = 'В корзину';
  }, 1600);
});
