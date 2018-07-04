'use strict';

// Фильтрация объявлений

(function () {

  var filterForm = document.querySelector('.map__filters');
  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelector('#housing-features');
  // var featuresFilter = document.querySelectorAll('.map__checkbox');

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

  // Отлеживаем изменения
  typeFilter.addEventListener('change', function () {
    window.debounce(updateFunction);
  });

  priceFilter.addEventListener('change', function () {
    window.debounce(updateFunction);
  });

  roomsFilter.addEventListener('change', function () {
    window.debounce(updateFunction);
  });

  guestsFilter.addEventListener('change', function () {
    window.debounce(updateFunction);
  });

  featuresFilter.addEventListener('change', function () {
    window.debounce(updateFunction);
  });

  var filters = {
    // список функций для получения значений
  };

})();
