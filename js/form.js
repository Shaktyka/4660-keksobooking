'use strict';

(function () {
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

  // Поиск невалидных полей
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

  // Навешивание красных рамок на невалидные поля
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

  // Скрытие меток на карте
  window.removePins = function () {
    var pinsList = window.pinsContainer.querySelectorAll('button:not(.map__pin--main)');
    for (var g = 0; g < pinsList.length; g++) {
      pinsList[g].remove();
    }
  };

  // Закрытия открытых объявлений
  window.hideAds = function () {
    var adsList = window.map.querySelectorAll('article.map__card');
    if (adsList) {
      for (var l = 0; l < adsList.length; l++) {
        adsList[l].classList.add('hidden');
      }
    }
  };

  // Ресет настроек фильтров
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

  // Ресет выделенных чекбоксов
  var resetCheckboxes = function () {
    var featuresList = form.querySelector('.features').querySelectorAll('input');
    if (featuresList) {
      for (var z = 0; z < featuresList.length; z++) {
        featuresList[z].checked = false;
      }
    }
  };

  // Ресет красных рамок невалидных полей
  var resetInvalidDecor = function (invalidInputs) {
    if (invalidInputs) {
      for (var x = 0; x < invalidInputs.length; x++) {
        var invalidInput = invalidInputs[x];
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

  var setPricePlaceholder = function () {
    price.placeholder = 5000;
  };

  // Оющий обработчик ресета
  var resetHandler = function () {
    // закрываем открытые объявления
    window.hideAds();
    // убираем все метки с карты
    window.removePins();
    // ставим главную метку на исходную позицию
    window.getStartCoords(window.mainPinCentered);
    resetFilters();
    resetAvatar();
    resetPhotos();
    resetInputs();
    window.putCoordsInAddress(window.mainPinCentered);
    setPricePlaceholder();
    resetInvalidDecor(findInvalidFields());
    resetCheckboxes();
    window.map.classList.add('map--faded');
    fieldsetList.forEach(function (item) {
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

  // Обработчики событий внутри формы
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
