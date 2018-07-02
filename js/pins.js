'use strict';

(function () {
  var PIN_HALFWIDTH = 25;
  var PIN_HEIGHT = 70;

  // Находим блок, куда поместим все новые метки
  window.pinsContainer = window.map.querySelector('.map__pins');

  // Находим шаблон, который будем использовать для генерации меток
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // Отрисовка объявлений и добавление их в целевой блок
  var createCard = function (pin) {
    var cardsBeforeElement = window.map.querySelector('.map__filters-container');

    var cardsParentElement = cardsBeforeElement.parentNode;
    cardsParentElement.insertBefore(window.renderCard(pin), cardsBeforeElement);
  };

  window.deactivatePin = function () {
    var activePin = window.pinsContainer.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // Генерация пина на основе шаблона
  window.renderPin = function (pin) {

    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x - PIN_HALFWIDTH + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    // Добавляем пину обработку клика
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();

      window.deactivatePin();
      pinElement.classList.add('map__pin--active');
      window.hideOpenedCard();
      createCard(pin);
    });
    return pinElement;
  };
})();
