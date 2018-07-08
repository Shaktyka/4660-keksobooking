'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;

  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;

  window.mainPinCoords = {
    x: MAIN_PIN_LEFT - Math.round(MAIN_PIN_WIDTH / 2),
    y: MAIN_PIN_TOP - MAIN_PIN_HEIGHT
  };

  // Границы доступной области для перемещения метки
  var MAP_MIN_Y = 130;
  var MAP_MAX_Y = 630;
  var MAP_MIN_X = 0;

  window.map = document.querySelector('.map');

  window.mainPin = window.map.querySelector('.map__pin--main');

  var addressInput = document.querySelector('input[name="address"]');

  // Стартовые координаты главной метки
  window.getStartCoords = function (coords) {
    window.mainPin.style.left = coords.x + 'px';
    window.mainPin.style.top = coords.y + 'px';
  };
  window.getStartCoords(window.mainPinCoords);

  // Ставим начальные координаты в поле address
  window.putCoordsInAddress = function (coordinates) {
    addressInput.value = coordinates.x + ', ' + coordinates.y;
  };
  window.putCoordsInAddress(window.mainPinCoords);

  // Перетаскивание главной метки
  window.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newX = window.mainPin.offsetLeft + shift.x;
      var newY = window.mainPin.offsetTop + shift.y;

      if (newX < MAP_MIN_X) {
        newX = MAP_MIN_X;
      }

      if (newX > window.mainPin.parentElement.offsetWidth - window.mainPin.offsetWidth) {
        newX = window.mainPin.parentElement.offsetWidth - window.mainPin.offsetWidth;
      }

      if (newY < MAP_MIN_Y) {
        newY = MAP_MIN_Y;
      }
      if (newY > MAP_MAX_Y) {
        newY = MAP_MAX_Y;
      }

      window.mainPin.style.left = newX + 'px';
      window.mainPin.style.top = newY + 'px';

      var locationX = newX + Math.round(window.mainPin.offsetWidth / 2);
      var locationY = newY + window.mainPin.offsetHeight;

      addressInput.value = locationX + ', ' + locationY;
    };

    var pinUpHandler = function (upEvt) {
      upEvt.preventDefault();

      addressInput.value = window.mainPin.offsetLeft + ', ' + window.mainPin.offsetTop;
      document.removeEventListener('mousemove', pinMoveHandler);
      document.removeEventListener('mouseup', pinUpHandler);
    };

    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', pinUpHandler);
  });
})();
