'use strict';

(function () {

  // Функция отрисовки меток и добавления в целевой блок
  var createPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.renderPin(data[i]));
    }
    // Проверяем, есть ли уже на карте метки. Если есть, то новые метки не генерируем.
    var buttonsList = window.similarListPins.querySelectorAll('button:not(.map__pin--main)');
    if (buttonsList.length === 0) {
      window.similarListPins.appendChild(fragment);
    }
  };

  var errorHandler = function () {
    // Вывод окна с сообщением об ошибке
  };

  window.load(createPins, errorHandler);

  // АКТИВАЦИЯ СТРАНИЦЫ

  // переменные для активации формы
  var form = document.querySelector('.ad-form');
  var fieldsetList = form.querySelectorAll('fieldset');

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
})();
