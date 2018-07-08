'use strict';

(function () {
  var MAIN_PIN_WIDTH_OFFSET = 33; // Половина ширины главной метки
  var MAIN_PIN_HEIGHT_OFFSET = 87; // Высота главной метки

  var MAIN_PIN_LEFT = 600;
  var MAIN_PIN_TOP = 352;

  // Границы доступной области для перемещения метки
  var MAP_MIN_Y = 130;
  var MAP_MAX_Y = 630;
  var MAP_MIN_X = 33;

  var mainPinPosition = {
    x: MAIN_PIN_LEFT,
    y: MAIN_PIN_TOP
  };

  window.map = document.querySelector('.map');

  window.mainPin = window.map.querySelector('.map__pin--main');

  var addressInput = document.querySelector('input[name="address"]');

  // Стартовые координаты главной метки
  window.resetMainPinPosition = function () {
    window.mainPin.style.left = mainPinPosition.x - MAIN_PIN_WIDTH_OFFSET + 'px';
    window.mainPin.style.top = mainPinPosition.y - MAIN_PIN_HEIGHT_OFFSET + 'px';
    putMainPinPositionToAddress(mainPinPosition);
  };

  // Ставим начальные координаты в поле address
  var putMainPinPositionToAddress = function (coordinates) {
    addressInput.value = coordinates.x + ', ' + coordinates.y;
  };

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

      if (newX < MAP_MIN_X - MAIN_PIN_WIDTH_OFFSET) {
        newX = MAP_MIN_X - MAIN_PIN_WIDTH_OFFSET;
      }

      if (newX > window.mainPin.parentElement.offsetWidth - window.mainPin.offsetWidth) {
        newX = window.mainPin.parentElement.offsetWidth - window.mainPin.offsetWidth;
      }

      if (newY < MAP_MIN_Y - MAIN_PIN_HEIGHT_OFFSET) {
        newY = MAP_MIN_Y - MAIN_PIN_HEIGHT_OFFSET;
      }
      if (newY > MAP_MAX_Y - MAIN_PIN_HEIGHT_OFFSET) {
        newY = MAP_MAX_Y - MAIN_PIN_HEIGHT_OFFSET;
      }

      // debugger;
      window.mainPin.style.left = newX + 'px';
      window.mainPin.style.top = newY + 'px';

      var position = {
        x: newX + MAIN_PIN_WIDTH_OFFSET,
        y: newY + MAIN_PIN_HEIGHT_OFFSET
      };

      putMainPinPositionToAddress(position);
    };

    var pinUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', pinMoveHandler);
      document.removeEventListener('mouseup', pinUpHandler);
    };

    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', pinUpHandler);
  });

  window.resetMainPinPosition();
})();
