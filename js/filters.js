'use strict';

// Фильтрация объявлений

(function () {

  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelector('#housing-features');

  // var housingType = ['palace', 'flat', 'house', 'bungalo'];

  // var housingPrice = ['middle', 'low', 'high'];

  // var housingRooms = [1, 2, 3];

  // var housingGuests = [2, 1, 0];

  // Функция для фильтрации?
  // var functionName = function () {
  // какая-то магия
  // };

  typeFilter.addEventListener('change', function () {
    window.typeValue = typeFilter.value;
    window.hidePins();
    window.updatePins();
  });

  priceFilter.addEventListener('change', function () {
    window.priceValue = priceFilter.value;
    window.hidePins();
    window.updatePins();
  });

  roomsFilter.addEventListener('change', function () {
    window.roomsValue = roomsFilter.value;
    window.hidePins();
    window.updatePins();
  });

  guestsFilter.addEventListener('change', function () {
    window.guestsValue = guestsFilter.value;
    window.hidePins();
    window.updatePins();
  });

  featuresFilter.addEventListener('change', function () {
    window.featuresValues = []; // ммм, наверное проверяем, какие фичи были выбраны, и добавяем их в массив
  }, true);

})();
