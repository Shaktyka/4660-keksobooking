'use strict';

(function () {
  var PIN_LIMIT = 5;

  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');

  // Отрисовка меток и добавление их в целевой блок
  var createPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pins.render(pins[i]));
    }
    // Если на карте есть уже метки, то новые не генерируем.
    var buttons = window.pins.container.querySelectorAll('button:not(.map__pin--main)');
    if (buttons.length === 0) {
      window.pins.container.appendChild(fragment);
    }
  };

  window.update = function (pins) {
    window.closeCard();
    window.removePins();
    createPins(pins);
  };

  var successHandler = function (data) {
    window.adverts = data;
    var slicedAdverts = window.adverts.slice(0, PIN_LIMIT);
    createPins(slicedAdverts);
  };

  // Обработка неуспеха при выполнении запроса
  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('modal');
    node.classList.add('modal--error');
    node.tabIndex = 0;

    node.textContent = errorMessage;
    document.body.insertBefore(node, document.body.firstChild);

    var closeError = function () {
      node.classList.add('hidden');
    };

    node.addEventListener('click', function () {
      closeError();
    });

    node.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, closeError);
    });
  };

  // Активация страницы
  window.alreadyLoaded = false;
  var pinMouseupHandler = function () {
    if (!window.alreadyLoaded) {
      window.alreadyLoaded = true;
    } else {
      return;
    }
    // Разблокируем карту и форму
    window.map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    // Разблокируем филдсеты
    fieldsets.forEach(function (item) {
      item.disabled = false;
    });
    // Разблокируем генерацию массива меток
    window.load(successHandler, window.errorHandler);
  };

  window.mainPin.addEventListener('mouseup', pinMouseupHandler);

  window.mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, pinMouseupHandler);
  });
})();
