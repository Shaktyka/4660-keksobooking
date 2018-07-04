'use strict';

// Фильтрация объявлений

(function () {

  // var filterForm = document.querySelector('.map__filters');
  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var features = document.querySelector('.map__features');

  var typeValue = '';
  var priceValue = '';
  var roomsValue = '';
  var guestsValue = '';
  var featureValue = '';

  // Отлеживаем изменения
  typeFilter.addEventListener('change', function () {
    typeValue = typeFilter.value;
    // window.debounce(updateFunction);
  });

  priceFilter.addEventListener('change', function () {
    priceValue = priceFilter.value;
    // window.debounce(updateFunction);
  });

  roomsFilter.addEventListener('change', function () {
    roomsValue = roomsFilter.value;
    // window.debounce(updateFunction);
  });

  guestsFilter.addEventListener('change', function () {
    guestsValue = guestsFilter.value;
    // window.debounce(updateFunction);
  });

  features.addEventListener('change', function (evt) {
    var checkedFeature = evt.target;
    featureValue = checkedFeature.value;
  }, true);

})();
