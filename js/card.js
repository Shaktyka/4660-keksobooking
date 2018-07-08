'use strict';

(function () {
  var HouseType = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

  // Конвертация названий типа жилья
  var convertType = function (type) {
    var typeValue = HouseType[type];
    return typeValue;
  };

  // Сборка списка фичей для объявления
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

  // Закрытие объявления
  window.escKeydownHandler = function (evt) {
    window.utils.isEscEvent(evt, window.closeCard);
  };

  window.closeCard = function () {
    window.cardElement.classList.add('hidden');
    document.removeEventListener('keydown', window.escKeydownHandler);
    window.deactivatePin();
  };

  window.hideOpenedCard = function () {
    var openedCard = window.map.querySelector('.popup:not(.hidden)');
    if (openedCard) {
      openedCard.classList.add('hidden');
    }
  };

  // Генерация карточки объявления на основе шаблона
  window.renderCard = function (card) {
    window.cardElement = cardTemplate.cloneNode(true);
    window.cardElement.querySelector('img').src = card.author.avatar;
    window.cardElement.querySelector('.popup__title').textContent = card.offer.title;
    window.cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    window.cardElement.querySelector('.popup__text--price').innerHTML = card.offer.price + '&#x20bd;<span>/ночь</span>';
    window.cardElement.querySelector('.popup__type').textContent = convertType(card.offer.type);
    window.cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    window.cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    // Если в объявлении нет фичей, то блок фичей скрываем
    var featuresBlock = window.cardElement.querySelector('.popup__features');
    if (card.offer.features.length === 0) {
      featuresBlock.classList.add('hidden');
    } else {
      featuresBlock.innerHTML = getListFeatures(card.offer.features);
    }

    // Если в объявлении нет описания, то блок скрываем
    var descriptionBlock = window.cardElement.querySelector('.popup__description');
    if (card.offer.description.length === 0) {
      descriptionBlock.classList.add('hidden');
    } else {
      descriptionBlock.textContent = card.offer.description;
    }

    // Вставка фото жилья в объявление
    var photoContainer = window.cardElement.querySelector('.popup__photos');

    var renderPhotos = function (photos) {
      var photoTemplateElement = document.querySelector('template').content.querySelector('.popup__photo');

      photoContainer.innerHTML = '';
      for (var i = 0; i < photos.length; i++) {
        var photoElement = photoTemplateElement.cloneNode(true);
        photoElement.src = photos[i];
        photoContainer.appendChild(photoElement);
      }
    };

    if (card.offer.photos.length === 0) {
      photoContainer.innerHTML = '';
      photoContainer.classList.add('hidden');
    } else {
      renderPhotos(card.offer.photos);
    }

    // Обработчики событий для объявления
    var closeButton = window.cardElement.querySelector('.popup__close');

    closeButton.addEventListener('click', function () {
      window.closeCard();
    });

    closeButton.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, window.closeCard);
    });

    document.addEventListener('keydown', window.escKeydownHandler);
    return window.cardElement;
  };
})();
