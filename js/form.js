'use strict';

// ВСЁ, ЧТО КАСАЕТСЯ ФОРМЫ

(function () {

  // Переменные формы
  var INVALID_FIELD_STYLE = '2px solid #ff0000';
  var form = document.querySelector('.ad-form');
  var fieldsetList = form.querySelectorAll('fieldset');
  var type = document.getElementById('type');
  var price = document.getElementById('price');
  var checkin = document.getElementById('timein');
  var checkout = document.getElementById('timeout');
  var rooms = document.getElementById('rooms');
  var guests = document.getElementById('capacity');
  var sendForm = document.querySelector('.ad-form__submit');
  var resetButton = document.querySelector('.ad-form__reset');
  var addressInput = document.getElementById('address');

  // Соответствие типа жилья и цены
  type.addEventListener('change', function () {
    if (type.selectedIndex === 0) {
      price.min = 0;
      price.placeholder = 0;
    } else if (type.selectedIndex === 1) {
      price.min = 1000;
      price.placeholder = 1000;
    } else if (type.selectedIndex === 2) {
      price.min = 5000;
      price.placeholder = 5000;
    } else if (type.selectedIndex === 3) {
      price.min = 10000;
      price.placeholder = 10000;
    }
  });

  // Синхронизация времени чекина и чекаута
  checkin.addEventListener('change', function () {
    checkout.selectedIndex = checkin.selectedIndex;
  });
  checkout.addEventListener('change', function () {
    checkin.selectedIndex = checkout.selectedIndex;
  });

  // Соответствие количества комнат количеству гостей
  rooms.addEventListener('change', function () {
    var currentValue = rooms.value;
    if (currentValue === '0') {
      for (var c = 0; c < guests.children.length; c++) {
        guests.children[c].disabled = true;
      }
      guests.children[guests.children.length - 1].disabled = false;
      guests.children[guests.children.length - 1].selected = true;
    } else {
      for (var d = 0; d < guests.children.length; d++) {
        if (d < currentValue) {
          guests.children[d].disabled = false;
        } else {
          guests.children[d].disabled = true;
        }
      }
      guests.children[0].selected = true;
    }
  });

  // ВАЛИДАЦИЯ ОТПРАВКИ ВСЕЙ ФОРМЫ

  // Функция поиска невалидных полей
  var findInvalidFields = function () {
    var fields = form.querySelectorAll('input:not(.visually-hidden):not([type="checkbox"])');
    var invalidFields = [];

    for (var h = 0; h < fields.length; h++) {
      if (fields[h].checkValidity() === false) {
        var field = fields[h];
        invalidFields.push(field);
      }
    }
    return invalidFields;
  };

  // Функция навешивания красных рамок на невалидные поля
  var submitClickHandler = function () {
    var invalidInputs = findInvalidFields();
    if (invalidInputs) {
      for (var y = 0; y < invalidInputs.length; y++) {
        var input = invalidInputs[y];
        input.style.outline = INVALID_FIELD_STYLE;
      }
    }
  };

  sendForm.addEventListener('click', submitClickHandler);

  // Функция скрытия меток на карте при reset
  var hidePins = function () {
    var pinsList = window.similarListPins.querySelectorAll('button:not(.map__pin--main)');
    for (var g = 0; g < pinsList.length; g++) {
      pinsList[g].remove();
    }
  };

  // Функция закрытия открытых объявлений при reset
  var hideAds = function () {
    var adsList = window.map.querySelectorAll('article.map__card');
    if (adsList) {
      for (var l = 0; l < adsList.length; l++) {
        adsList[l].classList.add('hidden');
      }
    }
  };

  // Функция сброса выделенных чекбоксов
  var resetCheckboxes = function () {
    var featuresList = form.querySelector('.features').querySelectorAll('input');
    if (featuresList) {
      for (var z = 0; z < featuresList.length; z++) {
        featuresList[z].checked = false;
      }
    }
  };

  // Функция сброса красных рамок у невалидных полей
  var resetInvalidDecor = function (invalidInputs) {
    if (invalidInputs) {
      for (var x = 0; x < invalidInputs.length; x++) {
        var invalidInput = invalidInputs[x];
        invalidInput.style.outline = '';
      }
    }
  };

  // Reset введённых данных
  var resetInputs = function () {
    var titleInput = document.getElementById('title');
    var description = document.getElementById('description');

    if (titleInput.value) {
      titleInput.value = '';
    }
    if (description.value) {
      description.value = '';
    }
    if (price.value) {
      price.value = '';
    }
    if (type.selectedIndex !== 0) {
      type.selectedIndex = 0;
    }
    if (rooms.selectedIndex !== 0) {
      rooms.selectedIndex = 0;
    }
    if (guests.selectedIndex !== 0) {
      guests.selectedIndex = 0;
    }
    if (checkin.selectedIndex !== 0) {
      checkin.selectedIndex = 0;
    }
    if (checkout.selectedIndex !== 0) {
      checkout.selectedIndex = 0;
    }
  };

  // Cброс данных формы
  var resetHandler = function () {
    // закрываем открытые объявления
    hideAds();
    // убираем все метки с карты
    hidePins();
    // ставим главную метку на исходную позицию
    window.pinMain.style.left = window.mainPinCenteredLeft + 'px';
    window.pinMain.style.top = window.mainPinCenteredTop + 'px';
    // устанавливаем координаты в поле address
    addressInput.value = window.mainPinCenteredLeft + ', ' + window.mainPinCenteredTop;
    // сбрасываем введённые данные, если были
    resetInputs();
    // устанавливаем default плейсхолдера селекта price
    price.placeholder = 5000;
    // убираем красные рамки invalid полей при наличии
    resetInvalidDecor(findInvalidFields());
    // сбрасываем чекбоксы
    resetCheckboxes();
    // затемняем карту
    window.map.classList.add('map--faded');
    // блокируем филдсеты
    fieldsetList.forEach(function (item) {
      item.disabled = true;
    });
    // затемняем форму
    form.classList.add('ad-form--disabled');
  };

  resetButton.addEventListener('click', resetHandler);

  window.escKeydownSuccessHandler = function (evt) {
    window.utils.isEscEvent(evt, window.closeSuccess);
  };

  // Обработка успешной отправки формы
  var successHandler = function () {
    var success = document.querySelector('.success');
    success.classList.remove('hidden');

    document.addEventListener('keydown', window.escKeydownSuccessHandler);

    window.closeSuccess = function () {
      success.classList.add('hidden');
      document.removeEventListener('keydown', window.escKeydownSuccessHandler);
    };

    success.addEventListener('click', function () {
      window.closeSuccess();
    });
  };

  // Функция обработки неуспеха при отправке формы
  var errorHandler = function (errorMessage) {
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
      window.util.isEnterEvent(e, window.closeError);
    });
  };

  form.addEventListener('submit', function (submitEvt) {
    submitEvt.preventDefault();
    var formData = new FormData(form);
    window.save(formData, successHandler, errorHandler);
    resetHandler();
  });

})();
