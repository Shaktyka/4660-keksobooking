'use strict';
/* global debounce, updatePins, adverts */

// Фильтрация объявлений

(function () {
  var ANY_VALUE = 'any';
  var PIN_LIMIT = 5;

  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelector('.map__features');

  var filterPins = function () {
    // Сортировка по типу
    var checkType = function (advert) {
      return (typeFilter.value === advert.offer.type) || (typeFilter.value === ANY_VALUE);
    };

    // Сортировка по цене
    var checkPrice = function (advert) {
      switch (priceFilter.value) {

        case 'low':
          return advert.offer.price < 10000;

        case 'middle':
          return advert.offer.price > 10000 && advert.offer.price < 50000;

        case 'high':
          return advert.offer.price > 50000;

        default:
          return true;
      }
    };

    // Сортировка по кол-ву комнат
    var checkRooms = function (advert) {
      return (roomsFilter.value === advert.offer.rooms.toString()) || (roomsFilter.value === ANY_VALUE);
    };

    // Сортировка по кол-ву гостей
    var checkGuests = function (advert) {
      return (guestsFilter.value === advert.offer.guests.toString()) || (guestsFilter.value === ANY_VALUE);
    };

    // Сортировка по фичам
    var checkFeatures = function (advert) {
      var checkedElements = featuresFilter.querySelectorAll('input[type=checkbox]:checked');
      var selectedFeatures = [].map.call(checkedElements, function (item) {
        return item.value;
      });
      return selectedFeatures.every(function (currentFeature) {
        return advert.offer.features.includes(currentFeature);
      });
    };

    // Сортировка всех пинов
    var sortedArray = adverts.filter(checkType).filter(checkPrice).filter(checkRooms).filter(checkGuests).filter(checkFeatures).slice(0, PIN_LIMIT);

    updatePins(sortedArray);
  };

  // Отлеживание изменений фильтров
  typeFilter.addEventListener('change', debounce(function () {
    filterPins();
  }));

  priceFilter.addEventListener('change', debounce(function () {
    filterPins();
  }));

  roomsFilter.addEventListener('change', debounce(function () {
    filterPins();
  }));

  guestsFilter.addEventListener('change', debounce(function () {
    filterPins();
  }));

  featuresFilter.addEventListener('change', debounce(function () {
    filterPins();
  }, true));
})();
