'use strict';

(function () {
  var PIN_HALFWIDTH = 25;
  var PIN_HEIGHT = 70;

  // Блок для новых меток
  var container = window.map.location.querySelector('.map__pins');

  // Шаблон для генерации меток
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // Перем-ные для вставки объявления
  var cardsBeforeElement = window.map.location.querySelector('.map__filters-container');
  var cardsParentElement = cardsBeforeElement.parentNode;

  // Отрисовка объявлений и добавление их в целевой блок
  var createCard = function (pin) {
    cardsParentElement.insertBefore(window.card.render(pin), cardsBeforeElement);
  };

  // Деактивация пина
  var deactivate = function () {
    var activePin = container.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // Скрытие меток на карте
  var removeAll = function () {
    var pins = window.pins.container.querySelectorAll('button:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  // Генерация пина на основе шаблона
  var render = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x - PIN_HALFWIDTH + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    // Добавление пину обработки клика
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.close();
      pinElement.classList.add('map__pin--active');
      createCard(pin);
    });
    return pinElement;
  };

  window.pins = {
    container: container,
    deactivate: deactivate,
    render: render,
    removeAll: removeAll
  };
})();
