'use strict';

// ГЕНЕРАЦИЯ ПИНОВ

(function () {
  // Находим блок, куда поместим все новые метки
  window.similarListPins = window.map.querySelector('.map__pins');

  // Находим шаблон, который будем использовать для генерации меток
  var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // Генерация метки на основе шаблона
  window.renderPin = function (pin) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x - 25 + 'px';
    pinElement.style.top = pin.location.y - 70 + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.createCard(pin);
    });
    return pinElement;
  };

  // Функция для сборки массива объектов объявлений
  window.getAdsArray = function (amount) {
    var adsArray = [];
    for (var i = 0; i < amount; i++) {
      var ad = {
        'author': {
          'avatar': window.getAvatarLink(i + 1)
        },
        'offer': {
          'title': window.util.getSeriatimElement(window.OFFER_TITLES),
          'price': window.util.getRandomNumber(1000, 1000000),
          'type': window.convertType(window.util.getRandomElement(window.OFFER_TYPES)),
          'rooms': window.util.getRandomNumber(1, 5),
          'guests': window.util.getRandomNumber(1, 8),
          'checkin': window.util.getRandomElement(window.OFFER_CHECKS),
          'checkout': window.util.getRandomElement(window.OFFER_CHECKS),
          'features': window.getListFeatures(window.util.getVariativeLengthArray(window.OFFER_FEATURES)),
          'description': '',
          'photos': window.OFFER_PHOTOS.slice().sort(function () {
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
})();
