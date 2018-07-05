'use strict';

// Фильтрация объявлений

(function () {

  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var features = document.querySelector('.map__features');

  window.adverts = [];
  var typeValue = '';
  var priceValue = '';
  var roomsValue = '';
  var guestsValue = '';
  var featureValue = '';

  var filterPins = function () {
    var sortedArray = window.adverts.slice();

    return sortedArray;
    // вызов функции отрисовки пинов
  };

  // Отлеживаем изменения
  typeFilter.addEventListener('change', function () {
    typeValue = typeFilter.value;
    filterPins();
  });

  priceFilter.addEventListener('change', function () {
    priceValue = priceFilter.value;
    filterPins();
  });

  roomsFilter.addEventListener('change', function () {
    roomsValue = roomsFilter.value;
    filterPins();
  });

  guestsFilter.addEventListener('change', function () {
    guestsValue = guestsFilter.value;
    filterPins();
  });

  features.addEventListener('change', function (evt) {
    var checkedFeature = evt.target;
    featureValue = checkedFeature.value;
    filterPins();
  }, true);

})();
