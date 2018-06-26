'use strict';

// ГЕНЕРАЦИЯ ПИНОВ

(function () {
  // Находим блок, куда поместим все новые метки
  window.similarListPins = window.map.querySelector('.map__pins');

  // Находим шаблон, который будем использовать для генерации меток
  var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // Отрисовка объявлений и добавление их в целевой блок
  var createCard = function (pin) {
    var cardsBeforeElement = window.map.querySelector('.map__filters-container');

    var cardsParentElement = cardsBeforeElement.parentNode;

    // Добавление карточек объявлений
    cardsParentElement.insertBefore(window.renderCard(pin), cardsBeforeElement);
  };

  // Генерация метки на основе шаблона
  window.renderPin = function (pin) {
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

  // Функция для сборки массива объектов объявлений
  window.getCardsArray = function (amount) {
    var cardsArray = [];
    for (var i = 0; i < amount; i++) {
      var card = {
        'author': {
          'avatar': window.getAvatarLink(i + 1)
        },
        'offer': {
          'title': window.getSeriatimElement(window.OFFER_TITLES),
          'price': window.getRandomNumber(1000, 1000000),
          'type': window.convertType(window.getRandomElement(window.OFFER_TYPES)),
          'rooms': window.getRandomNumber(1, 5),
          'guests': window.getRandomNumber(1, 8),
          'checkin': window.getRandomElement(window.OFFER_CHECKS),
          'checkout': window.getRandomElement(window.OFFER_CHECKS),
          'features': window.getListFeatures(window.getVariativeLengthArray(window.OFFER_FEATURES)),
          'description': '',
          'photos': window.OFFER_PHOTOS.slice().sort(function () {
            return Math.random() - 0.5;
          })
        },
        'location': {
          'x': window.getRandomNumber(300, 900),
          'y': window.getRandomNumber(130, 630)
        }
      };
      card.offer.address = card.location.x + ', ' + card.location.y;
      cardsArray.push(card);
    }
    return cardsArray;
  };
})();
