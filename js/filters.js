'use strict';

// Фильтрация объявлений

(function () {
  var ANY_VALUE = 'any';

  var prices = {
    low: {
      NUMBER: 10000,
      VALUE: 'low'
    },
    high: {
      NUMBER: 50000,
      VALUE: 'high'
    }
  };

  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var features = document.querySelector('.map__features');

  window.adverts = [];
  // var typeValue = '';
  // var priceValue = '';
  // var roomsValue = '';
  // var guestsValue = '';
  // var featureValue = '';

  window.filterPins = function () {
    var initArray = window.adverts.slice();

    // Сортировка по типу
    var checkType = function (advert) {
      return (typeFilter.value === advert.offer.type) || (typeFilter.value === ANY_VALUE);
    };

    // Сортировка по цене
    var checkPrice = function (advert) {
      switch (priceFilter.value) {
        case prices.low.VALUE:
          return advert.offer.price < prices.low.NUMBER;
        case prices.high.VALUE:
          return advert.offer.price > prices.high.NUMBER;
        case ANY_VALUE:
          return true;
        default:
          return advert.offer.price >= prices.low.NUMBER && advert.offer.price <= prices.high.NUMBER;
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
      var checkedElements = features.querySelectorAll('input[type=checkbox]:checked');
      var selectedFeatures = [].map.call(checkedElements, function (item) {
        return item.value;
      });
      return selectedFeatures.every(function (currentFeature) {
        return advert.offer.features.includes(currentFeature);
      });
    };

    // Сортировка всех пинов
    var sortedArray = initArray.filter(checkType).filter(checkPrice).filter(checkRooms).filter(checkGuests).filter(checkFeatures);
    return sortedArray;
  };

  // Отлеживаем изменения
  typeFilter.addEventListener('change', function () {
    var typeValue = typeFilter.value;
    window.filterPins();
  });

  priceFilter.addEventListener('change', function () {
    var priceValue = priceFilter.value;
    window.filterPins();
  });

  roomsFilter.addEventListener('change', function () {
    var roomsValue = roomsFilter.value;
    window.filterPins();
  });

  guestsFilter.addEventListener('change', function () {
    var guestsValue = guestsFilter.value;
    window.filterPins();
  });

  features.addEventListener('change', function (evt) {
    var checkedFeature = evt.target;
    var featureValue = checkedFeature.value;
    window.filterPins();
  }, true);

})();
