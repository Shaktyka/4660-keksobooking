'use strict';

(function () {
  var HouseType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

  var cardElement = null;

  // Конвертация названий типа жилья
  var convertType = function (type) {
    var typeValue = HouseType[type];
    return typeValue;
  };

  // Сборка списка фичей для объявления
  var getListFeatures = function (rawList) {
    var featuresBlock = cardElement.querySelector('.popup__features');
    var parsedList = '';
    if (rawList.length) {
      for (var i = 0; i < rawList.length; i++) {
        parsedList += '<li class="popup__feature popup__feature--' + rawList[i] + '">' + rawList[i] + '</li>';
      }
      featuresBlock.innerHTML = parsedList;
      return featuresBlock.innerHTML;
    }
    featuresBlock.innerHTML = featuresBlock.classList.add('hidden');
    return featuresBlock.innerHTML;
  };

  var enterKeydownHandler = function (evt) {
    window.utils.isEnterEvent(evt, window.closeCard);
  };

  // Закрытие объявления
  var escKeydownHandler = function (evt) {
    window.utils.isEscEvent(evt, window.closeCard);
  };

  window.closeCard = function () {
    window.pins.deactivate();
    if (cardElement) {
      cardElement.remove();
      cardElement = null;
      document.removeEventListener('keydown', escKeydownHandler);
    }
  };

  // Генерация карточки объявления на основе шаблона
  window.renderCard = function (card) {
    cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('img').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = card.offer.price + '&#x20bd;<span>/ночь</span>';
    cardElement.querySelector('.popup__type').textContent = convertType(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    getListFeatures(card.offer.features);

    // Если в объявлении нет описания, то блок скрываем
    var descriptionBlock = cardElement.querySelector('.popup__description');
    if (card.offer.description.length === 0) {
      descriptionBlock.classList.add('hidden');
    } else {
      descriptionBlock.textContent = card.offer.description;
    }

    // Вставка фото жилья в объявление
    var photoContainer = cardElement.querySelector('.popup__photos');

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
    var closeButton = cardElement.querySelector('.popup__close');

    closeButton.addEventListener('click', function () {
      window.closeCard(cardElement);
    });

    closeButton.addEventListener('keydown', enterKeydownHandler);

    document.addEventListener('keydown', escKeydownHandler);
    return cardElement;
  };
})();
