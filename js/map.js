'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var OFFER_CHECKS = ['12:00', '13:00', '14:00'];

var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Функция, возвращающая рандомное число в диапзоне между переданными min и max.
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

// Функция, возвращающая адрес ссылки аватара автора.
// var getAvatarLink = function (array) {};

// Функция для выбора заголовка (1) объявления из переданного массива. Значения не должны повторяться.
// var getOfferTitle = function (array) {};
// Может использ-ся функция getRandomElement

// Функция, возвращающая координаты адреса в виде 'x, y'.
// var getOfferAddress = function () {};

// Функция, возвращающая один рандомный элемент из переданного массива.
var getRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

// Функция, возвращающая массив строк случайной длины из переданного массива.
// var getOfferFeatures = function (array) {};

// Функция, возвращающая рандомно перемешанный массив той же длины (для фото).
var getMixedArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
