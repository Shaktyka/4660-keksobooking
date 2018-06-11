'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var OFFER_CHECKS = ['12:00', '13:00', '14:00'];

var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Функция, возвращающая рандомное число в диапазоне между переданными min и max.
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

// Функция, возвращающая адрес ссылки аватара автора. Значения не должны повторяться. Функция пока ЧЕРНОВАЯ.
var getAvatarLink = function (num) {
  if (num < 10) {
    var index = '0' + num;
  } else {
    index = num;
  }
  var linkPath = 'img/avatars/user';
  var linkExtension = '.png';
  return linkPath + index + linkExtension;
};

// Функция, возвращающая координаты адреса в виде 'x, y'.
var getCoordinates = function () {
  var locationX = getRandomNumber(100, 999);
  var locationY = getRandomNumber(100, 999);
  var coordinates = locationX + ', ' + locationY;
  return coordinates;
};

// Функция, возвращающая один рандомный элемент из переданного массива.
var getRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

// Функция, возвращающая массив строк случайной длины из переданного массива.
var getVariativeLengthArray = function (array) {
  var newArray = [];
  // Перемешиваем переданный массив
  var draftArray = getMixedArray(array);
  // Определяем длину массива
  var arrayLength = draftArray.length;
  // Генерируем случайное число от 1 до длины массива
  var num = getRandomNumber(1, arrayLength);
  // Записываем в новый массив выбранное из перемешанного мссива число элементов
  for (var i = 0; i < num; i++) {
    newArray.push(draftArray[i]);
  }
  return newArray;
};

// Функция, возвращающая рандомно перемешанный массив той же длины (для фото).
var getMixedArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

// Функция, выдающая 1-й элемент массива поочерёдно
var getSeriatimElement = function (array) {
  var title = array.shift();
  return title;
};

// Функция для конвертации англоязычного типа жилья в русскоязычный
var convertType = function (type) {
  switch (type) {
  case 'palace':
    return 'Дворец';
    break;
  case 'flat':
    return 'Квартира';
    break;
  case 'house':
    return 'Дом';
    break;
  case 'bungalo':
    return 'Бунгало';
    break;
  }
};

// Функция для сбора массива объектов объявлений
var getAdsArray = function (amount) {
  var adsArray = [];
  for (var i = 0; i < amount; i++) {
    var ad = {
      'author': {
        'avatar': getAvatarLink(i + 1)
      },
      'offer': {
        'title': getSeriatimElement(OFFER_TITLES),
        'address': getCoordinates(),
        'price': getRandomNumber(1000, 1000000),
        'type': convertType(getRandomElement(OFFER_TYPES)),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 8),
        'checkin': getRandomElement(OFFER_CHECKS),
        'checkout': getRandomElement(OFFER_CHECKS),
        'features': getVariativeLengthArray(OFFER_FEATURES),
        'description': '',
        'photos': getMixedArray(OFFER_PHOTOS)
      },
      'location': {
        'x': getRandomNumber(300, 900),
        'y': getRandomNumber(130, 630)
      }
    };
    adsArray.push(ad);
  }
  // console.log(adsArray);
  return adsArray;
};

// Находим блок, куда поместим все новые метки
var similarListPins = map.querySelector('.map__pins');

// Находим шаблон, который будем использовать для генерации меток
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

// Генерация метки на основе шаблона
var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x + 25 + 'px';
  pinElement.style.top = pin.location.y + 70 + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

// Отрисовка меток и добавление в целевой блок
var fragment = document.createDocumentFragment();
var pins = getAdsArray(8);
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
similarListPins.appendChild(fragment);

// Находим шаблон для генерации объявлений
var similarAdTemplate = document.querySelector('template').content.querySelector('.map__card');

// Генерация объявления на основе шаблона
var renderAd = function (advertisement) {
  var cardElement = similarAdTemplate.cloneNode(true);
  cardElement.querySelector('img').src = advertisement.author.avatar;
  cardElement.querySelector('.popup__title').textContent = advertisement.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = advertisement.offer.price + '&#x20bd;<span>/ночь</span>';
  // Разобраться с выводом типа жилья
  cardElement.querySelector('.popup__type').textContent = advertisement.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  // cardElement.querySelector('.popup__features').textContent = ;
  cardElement.querySelector('.popup__features').textContent = advertisement.offer.description;
  // вывести список фото
  return cardElement;
};

// Отрисовка объявлений и добавление их в целевой блок
var fragment = document.createDocumentFragment();
var cards = pins;
for (var i = 0; i < cards.length; i++) {
  fragment.appendChild(renderAd(cards[i]));
}
map.appendChild(fragment);
// в блок .map перед блоком.map__filters-container
