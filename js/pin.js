'use strict';

// ГЕНЕРАЦИЯ ПИНОВ

// Находим блок, куда поместим все новые метки

var similarListPins = window.map.querySelector('.map__pins');

// Находим шаблон, который будем использовать для генерации меток
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

// Генерация метки на основе шаблона
var renderPin = function (pin) {
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

// Функция отрисовки меток и добавления в целевой блок
var createPins = function () {
  var fragment = document.createDocumentFragment();
  var pins = getAdsArray(8);
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  // Проверяем, есть ли уже на карте метки. Если есть, то новые метки не генерируем.
  var buttonsList = similarListPins.querySelectorAll('button:not(.map__pin--main)');
  if (buttonsList.length === 0) {
    similarListPins.appendChild(fragment);
  }
};
