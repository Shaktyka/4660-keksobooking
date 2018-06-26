'use strict';

// СБОРКА ОБЪЯВЛЕНИЯ

window.map = document.querySelector('.map');

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

// Функция для конвертации англоязычного типа жилья в русскоязычный
var convertType = function (typeHouse) {
  var typeValue = '';
  switch (typeHouse) {
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
        'title': window.util.getSeriatimElement(OFFER_TITLES),
        'price': window.util.getRandomNumber(1000, 1000000),
        'type': convertType(window.util.getRandomElement(OFFER_TYPES)),
        'rooms': window.util.getRandomNumber(1, 5),
        'guests': window.util.getRandomNumber(1, 8),
        'checkin': window.util.getRandomElement(OFFER_CHECKS),
        'checkout': window.util.getRandomElement(OFFER_CHECKS),
        'features': getListFeatures(window.util.getVariativeLengthArray(OFFER_FEATURES)),
        'description': '',
        'photos': OFFER_PHOTOS.slice().sort(function () {
          return Math.random() - 0.5;
        })
      },
      'location': {
        'x': window.util.getRandomNumber(300, 900),
        'y': window.util.getRandomNumber(130, 630)
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
