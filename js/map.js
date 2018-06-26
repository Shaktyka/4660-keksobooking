'use strict';

(function () {

  // Дефолтная метка на карте
  window.pinMain = window.map.querySelector('.map__pin--main');

  var MAIN_PIN_WIDTH = window.pinMain.offsetWidth;
  // 22 - это высота псевдоэлемента-указателя
  var MAIN_PIN_HEIGTH = window.pinMain.offsetHeight + 22;

  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;

  // Отступы от краёв карты сверху и снизу, на которые метка не должна заходить
  var MAP_MIN_Y = 130;
  var MAP_MAX_Y = 630;

  // Координаты дефолтной метки по её центру
  var mainPinCenteredLeft = MAIN_PIN_LEFT - Math.round(MAIN_PIN_WIDTH / 2);
  var mainPinCenteredTop = MAIN_PIN_TOP - Math.round(MAIN_PIN_HEIGTH / 2);

  // Прописываем координаты дефолтной метки по центру
  window.pinMain.style.left = mainPinCenteredLeft + 'px';
  window.pinMain.style.top = mainPinCenteredTop + 'px';

  // Прописываем координаты в поле Адрес при неактивной странице
  var addressInput = document.getElementById('address');
  addressInput.value = mainPinCenteredLeft + ', ' + mainPinCenteredTop;

  // Функция отрисовки меток и добавления в целевой блок
  var createPins = function () {
    var fragment = document.createDocumentFragment();
    var pins = window.getAdsArray(8);
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.renderPin(pins[i]));
    }
    // Проверяем, есть ли уже на карте метки. Если есть, то новые метки не генерируем.
    var buttonsList = window.similarListPins.querySelectorAll('button:not(.map__pin--main)');
    if (buttonsList.length === 0) {
      window.similarListPins.appendChild(fragment);
    }
  };

  // АКТИВАЦИЯ СТРАНИЦЫ

  // переменные для активации формы
  var form = document.querySelector('.ad-form');
  var fieldsetList = form.querySelectorAll('fieldset');

  // Эмулируем перетаскивание дефолтной метки
  var buttonMouseupHandler = function () {
    // разблокируем карту
    window.map.classList.remove('map--faded');
    // разблокируем форму
    form.classList.remove('ad-form--disabled');
    // разблокируем филдсеты
    fieldsetList.forEach(function (item) {
      item.disabled = false;
    });
    // разблокируем генерацию массива меток и объявлений
    createPins();
    // подняли главную метку над всеми остальными
    window.pinMain.style.zIndex = 100;
  };

  window.pinMain.addEventListener('mouseup', buttonMouseupHandler);

  // DRAGNDROP ГЛАВНОЙ МЕТКИ

  window.pinMain.addEventListener('mousedown', function (ee) {
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

      var newX = window.pinMain.offsetLeft + shift.x;
      var newY = window.pinMain.offsetTop + shift.y;

      if (newX < 0) {
        newX = 0;
      }

      if (newX > window.pinMain.parentElement.offsetWidth - window.pinMain.offsetWidth) {
        newX = window.pinMain.parentElement.offsetWidth - window.pinMain.offsetWidth;
      }

      if (newY < MAP_MIN_Y) {
        newY = MAP_MIN_Y;
      }
      if (newY > MAP_MAX_Y) {
        newY = MAP_MAX_Y;
      }

      window.pinMain.style.left = newX + 'px';
      window.pinMain.style.top = newY + 'px';

      // трансляция координат метки в поле address
      var locationX = newX + Math.round(window.pinMain.offsetWidth / 2);
      var locationY = newY + window.pinMain.offsetHeight;

      addressInput.value = locationX + ', ' + locationY;
    };

    var pinUpHandler = function (upEvt) {
      upEvt.preventDefault();

      // обновление координат метки в поле address после отжатия мыши
      addressInput.value = (window.pinMain.offsetLeft - Math.round(MAIN_PIN_WIDTH / 2)) + ', ' + (window.pinMain.offsetTop + MAIN_PIN_HEIGTH);

      document.removeEventListener('mousemove', pinMoveHandler);
      document.removeEventListener('mouseup', pinUpHandler);
    };

    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', pinUpHandler);
  });
})();
