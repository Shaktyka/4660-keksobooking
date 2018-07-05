'use strict';

(function () {

  // Переменные формы
  var MIN_PRICE = [0, 1000, 5000, 10000];

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

  // Соответствие типа жилья и цены
  type.addEventListener('change', function () {
    var index = type.selectedIndex;
    price.min = MIN_PRICE[index];
    price.placeholder = MIN_PRICE[index];
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
  window.removePins = function () {
    var pinsList = window.pinsContainer.querySelectorAll('button:not(.map__pin--main)');
    for (var g = 0; g < pinsList.length; g++) {
      pinsList[g].remove();
    }
  };

  // Функция закрытия открытых объявлений при reset
  window.hideAds = function () {
    var adsList = window.map.querySelectorAll('article.map__card');
    if (adsList) {
      for (var l = 0; l < adsList.length; l++) {
        adsList[l].classList.add('hidden');
      }
    }
  };

  // Функция сброса выбранных фильтров
  var resetFilters = function () {
    window.alreadyLoaded = false;

    var typeFilter = document.querySelector('#housing-type');
    var priceFilter = document.querySelector('#housing-price');
    var roomsFilter = document.querySelector('#housing-rooms');
    var guestsFilter = document.querySelector('#housing-guests');

    if (typeFilter.selectedIndex !== 0) {
      typeFilter.selectedIndex = 0;
    }
    if (priceFilter.selectedIndex !== 0) {
      priceFilter.selectedIndex = 0;
    }
    if (roomsFilter.selectedIndex !== 0) {
      roomsFilter.selectedIndex = 0;
    }
    if (guestsFilter.selectedIndex !== 0) {
      guestsFilter.selectedIndex = 0;
    }
    var features = document.querySelector('.map__features').querySelectorAll('input:checked');
    if (features) {
      for (var i = 0; i < features.length; i++) {
        features[i].checked = false;
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

  // Функция сброса аватара
  var resetAvatar = function () {
    var preview = document.querySelector('.ad-form-header__preview img');
    var defaultSrc = 'img/muffin-grey.svg';
    preview.src = defaultSrc;
  };

  // Функция сброса добавленных фотографий жилья
  var resetPhotos = function () {
    var photoBlock = document.querySelector('.ad-form__photo-container');
    var template = photoBlock.querySelector('.ad-form__photo--template');
    var photosList = photoBlock.querySelectorAll('.ad-form__photo:not(.ad-form__photo--template)');

    if (photosList) {
      for (var i = 0; i < photosList.length; i++) {
        photosList[i].remove();
      }
    }
    template.style.display = 'block';
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
    window.hideAds();
    // убираем все метки с карты
    window.removePins();
    // ставим главную метку на исходную позицию
    window.getStartCoords(window.mainPinCentered);
    resetFilters();
    // устанавливаем координаты в поле address
    window.putCoordsInAddress(window.mainPinCentered);
    // Сбрасываем аватар
    resetAvatar();
    // Сбрасываем загруженные фото жилья
    resetPhotos();
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
