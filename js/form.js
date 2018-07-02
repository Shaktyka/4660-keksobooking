'use strict';

(function () {

  // Переменные формы
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

  var MinPrice = {
    0: 0,
    1: 1000,
    2: 5000,
    3: 10000
  };

  var Placeholder = {
    0: 0,
    1: 1000,
    2: 5000,
    3: 10000
  };

  // Соответствие типа жилья и цены
  type.addEventListener('change', function () {
    var index = type.selectedIndex;
    price.min = MinPrice[index];
    price.placeholder = Placeholder[index];
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

  // Валидация отправки формы

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
        input.classList.add('error');
      }
    }
  };

  // Ресет данных

  // Функция скрытия меток на карте при reset
  var hidePins = function () {
    var pinsList = window.pinsContainer.querySelectorAll('button:not(.map__pin--main)');
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
        invalidInput.classList.remove('error');
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

  // Обработчик сброса данных
  var resetHandler = function () {
    // закрываем открытые объявления
    hideAds();
    // убираем все метки с карты
    hidePins();
    // ставим главную метку на исходную позицию
    window.getStartCoords(window.MainPinCentered);
    // устанавливаем координаты в поле address
    window.putCoordsInAddress(window.MainPinCentered);
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

  window.escKeydownSuccessHandler = function (evt) {
    window.utils.isEscEvent(evt, window.closeSuccess);
  };

  // Обработка отправки формы

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

  // Обработчики событий

  checkin.addEventListener('change', function () {
    checkout.selectedIndex = checkin.selectedIndex;
  });

  checkout.addEventListener('change', function () {
    checkin.selectedIndex = checkout.selectedIndex;
  });

  sendForm.addEventListener('click', submitClickHandler);

  resetButton.addEventListener('click', resetHandler);

  form.addEventListener('submit', function (submitEvt) {
    submitEvt.preventDefault();
    var formData = new FormData(form);
    window.save(formData, successHandler, window.errorHandler);
    resetHandler();
  });

})();
