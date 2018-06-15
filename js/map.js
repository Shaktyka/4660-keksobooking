'use strict';

var map = document.querySelector('.map');

// Находим форму на странице
var form = document.querySelector('.ad-form');

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

// Функция, возвращающая адрес ссылки аватара автора. Значения не должны повторяться.
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

// Работающий вариант функции для перемешивания фоток
var mixPhotos = function (array) {
  var finalArray = [];
  var helpArray = [[0, 1, 2], [2, 1, 0], [0, 2, 1], [1, 0, 2], [2, 0, 1], [1, 2, 0]];
  var index = getRandomNumber(0, 5);
  var middleArray = helpArray[index];
  for (var i = 0; i < 3; i++) {
    finalArray[i] = array[middleArray[i]];
  }
  return finalArray;
};

// Функция, выдающая 1-й элемент массива поочерёдно
var getSeriatimElement = function (array) {
  var title = array.shift();
  return title;
};

// Функция для конвертации англоязычного типа жилья в русскоязычный
var convertType = function (type) {
  var typeValue = '';
  switch (type) {
    case 'palace':
      typeValue = 'Дворец';
      break;
    case 'flat':
      typeValue = 'Квартира';
      break;
    case 'house':
      typeValue = 'Дом';
      break;
    case 'bungalo':
      typeValue = 'Бунгало';
  }
  return typeValue;
};

// Функция для сборки списка фичей
var getListFeatures = function (rawList) {
  var parsedList = '';
  for (var i = 0; i < rawList.length; i++) {
    if (rawList[i] === 'wifi') {
      parsedList += '<li class="popup__feature popup__feature--wifi">wifi</li>';
    } else if (rawList[i] === 'dishwasher') {
      parsedList += '<li class="popup__feature popup__feature--dishwasher">dishwasher</li>';
    } else if (rawList[i] === 'parking') {
      parsedList += '<li class="popup__feature popup__feature--parking">parking</li>';
    } else if (rawList[i] === 'washer') {
      parsedList += '<li class="popup__feature popup__feature--washer">washer</li>';
    } else if (rawList[i] === 'elevator') {
      parsedList += '<li class="popup__feature popup__feature--elevator">elevator</li>';
    } else if (rawList[i] === 'conditioner') {
      parsedList += '<li class="popup__feature popup__feature--conditioner">conditioner</li>';
    }
  }
  return parsedList;
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
        'price': getRandomNumber(1000, 1000000),
        'type': convertType(getRandomElement(OFFER_TYPES)),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 8),
        'checkin': getRandomElement(OFFER_CHECKS),
        'checkout': getRandomElement(OFFER_CHECKS),
        'features': getListFeatures(getVariativeLengthArray(OFFER_FEATURES)),
        'description': '',
        'photos': mixPhotos(OFFER_PHOTOS)
      },
      'location': {
        'x': getRandomNumber(300, 900),
        'y': getRandomNumber(130, 630)
      }
    };
    ad.offer.address = ad.location.x + ', ' + ad.location.y;
    adsArray.push(ad);
  }
  return adsArray;
};

// Находим шаблон изображения

var renderPhotos = function (photos, cardElement) {
  var photoTemplateElement = document.querySelector('template').content.querySelector('.popup__photo');
  var photoContainer = cardElement.querySelector('.popup__photos');
  photoContainer.innerHTML = '';
  for (var i = 0; i < photos.length; i++) {
    var photoElement = photoTemplateElement.cloneNode(true);
    photoElement.src = photos[i];
    photoContainer.appendChild(photoElement);
  }
};

// Находим блок, куда поместим все новые метки
var similarListPins = map.querySelector('.map__pins');

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

// Отрисовка меток и добавление в целевой блок
var fragment = document.createDocumentFragment();
var pins = getAdsArray(8);
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}

// Находим шаблон для генерации объявлений
var similarAdTemplate = document.querySelector('template').content.querySelector('.map__card');

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
  return cardElement;
};

// Отрисовка объявлений и добавление их в целевой блок

var createCard = function (pin) {
  var cardsBeforeElement = map.querySelector('.map__filters-container');

  var cardsParentElement = cardsBeforeElement.parentNode;

  // Добавление карточек объявлений
  cardsParentElement.insertBefore(renderAd(pin), cardsBeforeElement);
};

// Находим дефолтную метку на карте
var pinMain = map.querySelector('.map__pin--main');

// Размеры и положение дефолтной метки

var MAIN_PIN_WIDTH = 60;
var MAIN_PIN_HEIGTH = 80;
var MAIN_PIN_DEF_LEFT = 570;
var MAIN_PIN_DEF_TOP = 375;

// Координаты дефолтной метки по её центру

var mainPinLeftCentered = MAIN_PIN_DEF_LEFT - MAIN_PIN_WIDTH / 2;
var mainPinTopCentered = MAIN_PIN_DEF_TOP - MAIN_PIN_HEIGTH / 2;

// Координаты дефолтной метки по указателю

var mainPinLeftPointed = MAIN_PIN_DEF_LEFT - MAIN_PIN_WIDTH / 2;
var mainPinTopPointed = MAIN_PIN_DEF_TOP - MAIN_PIN_HEIGTH;

// Прописываем координаты дефолтной метки по центру

pinMain.style.left = mainPinLeftCentered + 'px';
pinMain.style.top = mainPinTopCentered + 'px';

// Прописываем координаты в поле Адрес при неактивной странице
var addressInput = document.getElementById('address');
addressInput.value = mainPinLeftCentered + ', ' + mainPinTopCentered;

// Находим все элементы fieldset
var fieldsetList = form.querySelectorAll('fieldset');

// Эмулируем перетаскивание дефолтной метки
// Активация страницы

var buttonMouseupHandler = function () {
  // разблокируем карту
  map.classList.remove('map--faded');
  // разблокируем форму
  form.classList.remove('ad-form--disabled');
  // разблокируем филдсеты
  fieldsetList.forEach(function (item) {
    item.disabled = false;
  });
  // разблокируем генерацию массива меток и объявлений
  similarListPins.appendChild(fragment);
  // координаты дефолтной метки по указателю
  pinMain.style.left = mainPinLeftCentered + 'px';
  pinMain.style.top = MAIN_PIN_DEF_TOP - MAIN_PIN_HEIGTH + 'px';
  // прописываем координаты дефолтной метки в поле адреса по указателю
  addressInput.value = mainPinLeftPointed + ', ' + mainPinTopPointed;
};

pinMain.addEventListener('mouseup', buttonMouseupHandler);
