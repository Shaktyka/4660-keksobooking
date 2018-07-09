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
  var getFeatures = function (features) {
    if (!features.length) {
      return;
    }
    var featuresContainer = document.createElement('ul');
    featuresContainer.classList.add('popup__features');
    for (var i = 0; i < features.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + features[i]);
      featuresContainer.appendChild(featureElement);
    }
    cardElement.appendChild(featuresContainer);
  };

  // Обработка описания объявления
  var getDescription = function (description) {
    var descriptionBlock = cardElement.querySelector('.popup__description');
    if (description.length) {
      descriptionBlock.textContent = description;
    }
  };

  // Обработка списка фотографий жилья
  var getPhotos = function (photos) {
    if (!photos.length) {
      return;
    }
    var photosContainer = document.createElement('div');
    photosContainer.classList.add('popup__photos');

    for (var i = 0; i < photos.length; i++) {
      var photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.alt = 'Фотография жилья';
      photoElement.src = photos[i];
      photosContainer.appendChild(photoElement);
    }
    cardElement.appendChild(photosContainer);
  };

  // Обработчик закрытия объявления при нажатии Enter
  var enterKeydownHandler = function (evt) {
    window.utils.isEnterEvent(evt, closeCard);
  };

  // Закрытие объявления
  var escKeydownHandler = function (evt) {
    window.utils.isEscEvent(evt, closeCard);
  };

  var closeCard = function () {
    window.pins.deactivate();
    if (cardElement) {
      cardElement.remove();
      cardElement = null;
      document.removeEventListener('keydown', escKeydownHandler);
    }
  };

  // Генерация карточки объявления на основе шаблона
  var renderCard = function (card) {
    cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('img').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = card.offer.price + '&#x20bd;<span>/ночь</span>';
    cardElement.querySelector('.popup__type').textContent = convertType(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    getFeatures(card.offer.features);
    getDescription(card.offer.description);
    getPhotos(card.offer.photos);

    // Обработчики событий для объявления
    var closeButton = cardElement.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      closeCard(cardElement);
    });
    closeButton.addEventListener('keydown', enterKeydownHandler);

    document.addEventListener('keydown', escKeydownHandler);
    return cardElement;
  };

  window.card = {
    closeCard: closeCard,
    renderCard: renderCard
  };
})();
