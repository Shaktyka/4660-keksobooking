'use strict';

// СБОРКА ОБЪЯВЛЕНИЯ

(function () {

  // window.OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  // window.OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

  // window.OFFER_CHECKS = ['12:00', '13:00', '14:00'];

  // window.OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // window.OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // Функция, возвращающая адрес ссылки аватара автора. Значения не повторяются.
//  window.getAvatarLink = function (num) {
//    if (num < 10) {
//      var index = '0' + num;
//    } else {
//      index = num;
//    }
//    var linkPath = 'img/avatars/user';
//    var linkExtension = '.png';
//    return linkPath + index + linkExtension;
//  };

  // Функция для конвертации англоязычного типа жилья в русскоязычный
  window.convertType = function (typeHouse) {
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

  // Функция для сборки списка фичей для объявления
  window.getListFeatures = function (rawList) {
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

  // Функция для вставки фото жилья в объявление
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

  // ГЕНЕРАЦИЯ ОБЪЯВЛЕНИЙ

  var similarCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  // Генерация объявления на основе шаблона
  window.renderCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('img').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = card.offer.price + '&#x20bd;<span>/ночь</span>';
    cardElement.querySelector('.popup__type').textContent = card.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = card.offer.features;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    renderPhotos(card.offer.photos, cardElement);
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
})();
