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
    window.pins.container.appendChild(fragment);
  };

  var update = function (pins) {
    window.card.close();
    window.pins.removeAll();
    createPins(pins);
  };

  var successHandler = function (data) {
    window.adverts = data;
    var slicedAdverts = window.adverts.slice(0, PIN_LIMIT);
    createPins(slicedAdverts);
  };

  // Обработка неуспеха при выполнении запроса
  var errorHandler = function (errorMessage) {
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
  var pinMouseupHandler = function () {
    if (!window.activation.alreadyLoaded) {
      window.activation.alreadyLoaded = true;
    } else {
      return;
    }
    // Разблокируем карту и форму
    window.map.location.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    // Разблокируем филдсеты
    fieldsets.forEach(function (item) {
      item.disabled = false;
    });
    // Разблокируем генерацию массива меток
    window.backend.load(successHandler, errorHandler);
  };

  window.map.mainPin.addEventListener('mouseup', pinMouseupHandler);

  window.map.mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, pinMouseupHandler);
  });

  window.activation = {
    update: update,
    errorHandler: errorHandler,
    alreadyLoaded: false,
    fieldsets: fieldsets
  };
})();
