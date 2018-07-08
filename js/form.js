'use strict';

(function () {
  var MIN_PRICES = [0, 1000, 5000, 10000];
  var DEFAULT_PLACEHOLDER = 5000;

  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var type = form.querySelector('select[name="type"]');
  var price = form.querySelector('input[name="price"]');
  var checkIn = form.querySelector('select[name="timein"]');
  var checkOut = form.querySelector('select[name="timeout"]');
  var rooms = form.querySelector('select[name="rooms"]');
  var guests = form.querySelector('select[name="capacity"]');
  var sendForm = form.querySelector('.ad-form__submit');
  var resetButton = form.querySelector('.ad-form__reset');
  var success = document.querySelector('.success');

  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');

  var RoomsValue = {
    '100 комнат': '0',
    '1 комната': '1',
    '2 комнаты': '2',
    '3 комнаты': '3'
  };

  // Соответствие типа жилья и цены
  type.addEventListener('change', function () {
    var index = type.selectedIndex;
    price.min = MIN_PRICES[index];
    price.placeholder = MIN_PRICES[index];
  });

  // Соответствие количества комнат количеству гостей
  rooms.addEventListener('change', function () {
    var currentValue = rooms.value;
    if (currentValue === RoomsValue['100 комнат']) {
      for (var i = 0; i < guests.children.length; i++) {
        guests.children[i].disabled = true;
      }
      guests.children[guests.children.length - 1].disabled = false;
      guests.children[guests.children.length - 1].selected = true;
    } else {
      for (var j = 0; j < guests.children.length; j++) {
        if (j < currentValue) {
          guests.children[j].disabled = false;
        } else {
          guests.children[j].disabled = true;
        }
      }
      guests.children[0].selected = true;
    }
  });

  // Поиск невалидных полей
  var findInvalidFields = function () {
    var fields = form.querySelectorAll('input:not(.visually-hidden):not([type="checkbox"])');
    var invalidFields = [];

    for (var i = 0; i < fields.length; i++) {
      if (fields[i].checkValidity() === false) {
        var field = fields[i];
        invalidFields.push(field);
      }
    }
    return invalidFields;
  };

  // Навешивание красных рамок на невалидные поля
  var submitClickHandler = function () {
    var invalidInputs = findInvalidFields();
    if (invalidInputs) {
      for (var i = 0; i < invalidInputs.length; i++) {
        var input = invalidInputs[i];
        input.classList.add('error');
      }
    }
  };

  // Ресет данных

  // Скрытие меток на карте
  window.removePins = function () {
    var pinsList = window.pinsContainer.querySelectorAll('button:not(.map__pin--main)');
    for (var i = 0; i < pinsList.length; i++) {
      pinsList[i].remove();
    }
  };

  // Закрытия открытых объявлений
  window.hideAds = function () {
    var adsList = window.map.querySelectorAll('article.map__card');
    if (adsList) {
      for (var i = 0; i < adsList.length; i++) {
        adsList[i].classList.add('hidden');
      }
    }
  };

  // Ресет настроек фильтров
  var resetFilters = function () {
    window.alreadyLoaded = false;

    if (typeFilter.selectedIndex) {
      typeFilter.selectedIndex = 0;
    }
    if (priceFilter.selectedIndex) {
      priceFilter.selectedIndex = 0;
    }
    if (roomsFilter.selectedIndex) {
      roomsFilter.selectedIndex = 0;
    }
    if (guestsFilter.selectedIndex) {
      guestsFilter.selectedIndex = 0;
    }
    var features = document.querySelector('.map__features').querySelectorAll('input:checked');
    if (features) {
      for (var i = 0; i < features.length; i++) {
        features[i].checked = false;
      }
    }
  };

  // Ресет выделенных чекбоксов
  var resetCheckboxes = function () {
    var featuresList = form.querySelector('.features').querySelectorAll('input');
    if (featuresList) {
      for (var i = 0; i < featuresList.length; i++) {
        featuresList[i].checked = false;
      }
    }
  };

  // Ресет красных рамок невалидных полей
  var resetInvalidDecor = function (invalidInputs) {
    if (invalidInputs) {
      for (var i = 0; i < invalidInputs.length; i++) {
        var invalidInput = invalidInputs[i];
        invalidInput.classList.remove('error');
      }
    }
  };

  // Ресет аватара
  var resetAvatar = function () {
    var preview = document.querySelector('.ad-form-header__preview img');
    var defaultSrc = 'img/muffin-grey.svg';
    preview.src = defaultSrc;
  };

  // Ресет добавленных фотографий жилья
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

  // Ресет введённых данных
  var resetInputs = function () {
    var titleInput = form.querySelector('input[name="title"]');
    var description = form.querySelector('textarea[name="description"]');

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
    if (checkIn.selectedIndex !== 0) {
      checkIn.selectedIndex = 0;
    }
    if (checkOut.selectedIndex !== 0) {
      checkOut.selectedIndex = 0;
    }
  };

  var setPricePlaceholder = function () {
    price.placeholder = DEFAULT_PLACEHOLDER;
  };

  // Оющий обработчик ресета
  var resetHandler = function () {
    // закрываем открытые объявления
    window.hideAds();
    // убираем все метки с карты
    window.removePins();
    // ставим главную метку на исходную позицию
    window.getStartCoords(window.mainPinCoords);
    resetFilters();
    resetAvatar();
    resetPhotos();
    resetInputs();
    window.putCoordsInAddress(window.mainPinCoords);
    setPricePlaceholder();
    resetInvalidDecor(findInvalidFields());
    resetCheckboxes();
    window.map.classList.add('map--faded');
    fieldsets.forEach(function (item) {
      item.disabled = true;
    });
    form.classList.add('ad-form--disabled');
  };

  window.escKeydownSuccessHandler = function (evt) {
    window.utils.isEscEvent(evt, window.closeSuccess);
  };

  // Отправка формы

  // Обработка успешной отправки формы
  var successHandler = function () {
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

  // Обработчики событий внутри формы
  checkIn.addEventListener('change', function () {
    checkOut.selectedIndex = checkIn.selectedIndex;
  });

  checkOut.addEventListener('change', function () {
    checkIn.selectedIndex = checkOut.selectedIndex;
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
