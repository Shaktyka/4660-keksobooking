'use strict';

(function () {

  // Высота кончика пина
  var MAIN_PIN_TIP = 22;

  var MAIN_PIN_WIDTH = document.querySelector('.map').querySelector('.map__pin--main').offsetWidth;

  var MAIN_PIN_HEIGHT = document.querySelector('.map').querySelector('.map__pin--main').offsetHeight + MAIN_PIN_TIP;

  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;

  // Границы доступной области
  var MAP_MIN_Y = 130;
  var MAP_MAX_Y = 630;

  window.map = document.querySelector('.map');

  window.mainPin = window.map.querySelector('.map__pin--main');

  var addressInput = document.getElementById('address');

  window.mainPinCentered = {
    x: MAIN_PIN_LEFT - Math.round(MAIN_PIN_WIDTH / 2),
    y: MAIN_PIN_TOP - Math.round(MAIN_PIN_HEIGHT / 2)
  };

  // Стартовые координаты главной метки
  window.getStartCoords = function (coord) {
    window.mainPin.style.left = coord.x + 'px';
    window.mainPin.style.top = coord.y + 'px';
  };
  window.getStartCoords(window.mainPinCentered);

  // Прописываем координаты в поле Адрес при неактивной странице
  window.putCoordsInAddress = function (coordinates) {
    addressInput.value = coordinates.x + ', ' + coordinates.y;
  };
  window.putCoordsInAddress(window.mainPinCentered);

  // DragAndDrop главной метки
  window.mainPin.addEventListener('mousedown', function (ee) {
    ee.preventDefault();

    var startCoords = {
      x: ee.clientX,
      y: ee.clientY
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

      if (newX < 0) {
        newX = 0;
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

      // Трансляция координат метки в поле address
      var locationX = newX + Math.round(window.mainPin.offsetWidth / 2);
      var locationY = newY + window.mainPin.offsetHeight;

      addressInput.value = locationX + ', ' + locationY;
    };

    var pinUpHandler = function (upEvt) {
      upEvt.preventDefault();

      // Обновление координат метки в поле address после отжатия мыши
      addressInput.value = (window.mainPin.offsetLeft - Math.round(MAIN_PIN_WIDTH / 2)) + ', ' + (window.mainPin.offsetTop + MAIN_PIN_HEIGHT);

      document.removeEventListener('mousemove', pinMoveHandler);
      document.removeEventListener('mouseup', pinUpHandler);
    };

    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', pinUpHandler);
  });
})();
