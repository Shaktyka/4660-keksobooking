'use strict';

(function () {

  var form = document.querySelector('.ad-form');
  var fieldsetList = form.querySelectorAll('fieldset');

  // Функция отрисовки меток и добавления в целевой блок
  var createPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.renderPin(data[i]));
    }
    // Проверяем, есть ли уже на карте метки. Если есть, то новые метки не генерируем.
    var buttonsList = window.pinsContainer.querySelectorAll('button:not(.map__pin--main)');
    if (buttonsList.length === 0) {
      window.pinsContainer.appendChild(fragment);
    }
  };

  // Функция обработки неуспеха при выполнении запроса
  window.errorHandler = function (errorMessage) {
    window.node = document.createElement('div');
    window.node.classList.add('modal');
    window.node.classList.add('modal--error');
    window.node.tabIndex = 0;

    window.node.textContent = errorMessage;
    document.body.insertBefore(window.node, document.body.firstChild);

    window.closeError = function () {
      window.node.classList.add('hidden');
    };

    window.node.addEventListener('click', function () {
      window.closeError();
    });

    window.node.addEventListener('keydown', function (e) {
      window.utils.isEnterEvent(e, window.closeError);
    });
  };

  // Обработчик активации страницы

  var pinMouseupHandler = function () {
    // разблокируем карту
    window.map.classList.remove('map--faded');
    // разблокируем форму
    form.classList.remove('ad-form--disabled');
    // разблокируем филдсеты
    fieldsetList.forEach(function (item) {
      item.disabled = false;
    });
    // разблокируем генерацию массива меток и объявлений
    window.load(createPins, window.errorHandler);
  };

  window.mainPin.addEventListener('mouseup', pinMouseupHandler);
})();
