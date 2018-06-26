'use strict';

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var OFFER_CHECKS = ['12:00', '13:00', '14:00'];

var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

window.map = document.querySelector('.map');

// Дефолтная метка на карте
window.pinMain = window.map.querySelector('.map__pin--main');

var MAIN_PIN_WIDTH = window.pinMain.offsetWidth;
// 22 - это высота псевдоэлемента-указателя
var MAIN_PIN_HEIGTH = window.pinMain.offsetHeight + 22;

var MAIN_PIN_LEFT = 570;
var MAIN_PIN_TOP = 375;

// Отступы от краёв карты сверху и снизу, на которые метка не должна заходить
var MAP_MIN_Y = 130;
var MAP_MAX_Y = 630;

// Координаты дефолтной метки по её центру
var mainPinCenteredLeft = MAIN_PIN_LEFT - Math.round(MAIN_PIN_WIDTH / 2);
var mainPinCenteredTop = MAIN_PIN_TOP - Math.round(MAIN_PIN_HEIGTH / 2);

// Прописываем координаты дефолтной метки по центру
window.pinMain.style.left = mainPinCenteredLeft + 'px';
window.pinMain.style.top = mainPinCenteredTop + 'px';

// Прописываем координаты в поле Адрес при неактивной странице
var addressInput = document.getElementById('address');
addressInput.value = mainPinCenteredLeft + ', ' + mainPinCenteredTop;

// ГЕНЕРАЦИЯ ПИНОВ

// Находим блок, куда поместим все новые метки
var similarListPins = window.map.querySelector('.map__pins');

// Находим шаблон, который будем использовать для генерации меток
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

// Генерация метки на основе шаблона
var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x - 25 + 'px';
  pinElement.style.top = pin.location.y - 70 + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    createCard(pin);
  });
  return pinElement;
};

// Функция отрисовки меток и добавления в целевой блок
var createPins = function () {
  var fragment = document.createDocumentFragment();
  var pins = getAdsArray(8);
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  // Проверяем, есть ли уже на карте метки. Если есть, то новые метки не генерируем.
  var buttonsList = similarListPins.querySelectorAll('button:not(.map__pin--main)');
  if (buttonsList.length === 0) {
    similarListPins.appendChild(fragment);
  }
};

// ЗАКРЫТИЕ ОБЪЯВЛЕНИЯ

// Функция закрытия объявления нажатием на крестик
var similarAdTemplate = document.querySelector('template').content.querySelector('.map__card');

// ГЕНЕРАЦИЯ ОБЪЯВЛЕНИЙ

// Генерация объявления на основе шаблона
var renderAd = function (advertisement) {
  var cardElement = similarAdTemplate.cloneNode(true);
  cardElement.querySelector('img').src = advertisement.author.avatar;
  cardElement.querySelector('.popup__title').textContent = advertisement.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = advertisement.offer.price + '&#x20bd;<span>/ночь</span>';
  cardElement.querySelector('.popup__type').textContent = advertisement.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = advertisement.offer.features;
  cardElement.querySelector('.popup__description').textContent = advertisement.offer.description;
  renderPhotos(advertisement.offer.photos, cardElement);
  var closeButton = cardElement.querySelector('.popup__close');
  closeButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    cardElement.classList.add('hidden');
  });
  closeButton.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === 13) {
      cardElement.classList.add('hidden');
    }
  });
  return cardElement;
};

// Отрисовка объявлений и добавление их в целевой блок
var createCard = function (pin) {
  var cardsBeforeElement = window.map.querySelector('.map__filters-container');

  var cardsParentElement = cardsBeforeElement.parentNode;

  // Добавление карточек объявлений
  cardsParentElement.insertBefore(renderAd(pin), cardsBeforeElement);
};

// АКТИВАЦИЯ СТРАНИЦЫ

// переменные для активации формы
var form = document.querySelector('.ad-form');
var fieldsetList = form.querySelectorAll('fieldset');

// Эмулируем перетаскивание дефолтной метки
var buttonMouseupHandler = function () {
  // разблокируем карту
  window.map.classList.remove('map--faded');
  // разблокируем форму
  form.classList.remove('ad-form--disabled');
  // разблокируем филдсеты
  fieldsetList.forEach(function (item) {
    item.disabled = false;
  });
  // разблокируем генерацию массива меток и объявлений
  createPins();
  // подняли главную метку над всеми остальными
  window.pinMain.style.zIndex = 100;
};

window.pinMain.addEventListener('mouseup', buttonMouseupHandler);

// DRAGNDROP ГЛАВНОЙ МЕТКИ

window.pinMain.addEventListener('mousedown', function (ee) {
  ee.preventDefault();

  var startCoords = {
    x: ee.clientX,
    y: ee.clientY
  };

  var pinMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: moveEvt.clientX - startCoords.x,
      y: moveEvt.clientY - startCoords.y
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var newX = window.pinMain.offsetLeft + shift.x;
    var newY = window.pinMain.offsetTop + shift.y;

    if (newX < 0) {
      newX = 0;
    }

    if (newX > window.pinMain.parentElement.offsetWidth - window.pinMain.offsetWidth) {
      newX = window.pinMain.parentElement.offsetWidth - window.pinMain.offsetWidth;
    }

    if (newY < MAP_MIN_Y) {
      newY = MAP_MIN_Y;
    }
    if (newY > MAP_MAX_Y) {
      newY = MAP_MAX_Y;
    }

    window.pinMain.style.left = newX + 'px';
    window.pinMain.style.top = newY + 'px';

    // трансляция координат метки в поле address
    var locationX = newX + Math.round(window.pinMain.offsetWidth / 2);
    var locationY = newY + window.pinMain.offsetHeight;

    addressInput.value = locationX + ', ' + locationY;
  };

  var pinUpHandler = function (upEvt) {
    upEvt.preventDefault();

    // обновление координат метки в поле address после отжатия мыши
    addressInput.value = (window.pinMain.offsetLeft - Math.round(MAIN_PIN_WIDTH / 2)) + ', ' + (window.pinMain.offsetTop + MAIN_PIN_HEIGTH);

    document.removeEventListener('mousemove', pinMoveHandler);
    document.removeEventListener('mouseup', pinUpHandler);
  };

  document.addEventListener('mousemove', pinMoveHandler);
  document.addEventListener('mouseup', pinUpHandler);
});
