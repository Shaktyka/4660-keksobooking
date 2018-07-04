'use strict';

// Фильтрация объявлений

(function () {

  var filterForm = document.querySelector('.map__filters');
  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var features = document.querySelectorAll('.map__checkbox');

  var price = {
    any: {
      minPrice: 0,
      maxPrice: Infinity
    },
    middle: {
      minPrice: 10000,
      maxPrice: 50000
    },
    low: {
      minPrice: 0,
      maxPrice: 10000
    },
    high: {
      minPrice: 50000,
      maxPrice: Infinity
    },
  };

  // Функция получения списка изменений фильтров
  var filterAdverts = window.debounce(function () {
    var filteredValues = [];

    var checkType = function (object, filter) {
      if (filter.value !== 'any') {
        return object === filter.value;
      }
      return true;
    };

    var checkPrice = function (object, filter) {
      switch (filter.value) {
        case 'middle':
          return object.offer.price >= 10000 && object.offer.price <= 50000;
        case 'low':
          return object.offer.price < 10000;
        case 'high':
          return object.offer.price > 50000;
      }
      return true;
    };

    var checkNumber = function (object, filter) {
      if (filter.value !== 'any') {
        return object === +filter.value;
      }
      return true;
    };

    var checkFeatures = function (object, filter) {
      var checkedFeatures = [];

      for (var i = 0; i < filter.length; i++) {
        if (filter[i].checked) {
          checkedFeatures.push(filter[i].value);
        }
      }

      if (checkedFeatures.length === 0) {
        return true;
      } else {
        return (checkedFeatures.every(function (feature) {
          return (object.offer.features.indexOf(feature) >= 0);
        }));
      }
    };

  });

  // Отслеживаем изменения
  filterForm.addEventListener('change', function () {
    filterAdverts();
  });

})();
