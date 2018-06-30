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
    cardsParentElement.insertBefore(window.renderCard(pin), cardsBeforeElement);
  };

  // Генерация метки на основе шаблона
  window.renderPin = function (pin) {

    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x - 25 + 'px';
    pinElement.style.top = pin.location.y - 70 + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    // Добавляем пину обработку клика
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();

      // var openedCard = window.map.querySelector('popup:not(.hidden)');

      if (window.clickedPin) {
        window.clickedPin.classList.remove('map__pin--active');
        pinElement.classList.add('map__pin--active');
        // openedCard.classList.add('hidden');
        createCard(pin);
      } else {
        createCard(pin);
        pinElement.classList.add('map__pin--active');
      }
    });
    return pinElement;
  };
})();
