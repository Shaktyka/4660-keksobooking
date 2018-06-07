'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var AUTHOR_AVATARS = [01, 02, 03, 04, 05, 06, 07, 08];

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var OFFER_CHECKS = ['12:00', '13:00', '14:00'];

var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg]', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Функция, возвращающая рандомное число между переданными min и max.
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min) + min);
  return randomNumber;
};

// Функция, возвращающая адрес ссылки аватара автора.
// var getAvatarLink = function (array) {};

// Функция для выбора заголовка (1) объявления из переданного массива. Значения не должны повторяться.
// var getOfferTitle = function () {};

// Функция, возвращающая координаты адреса в виде 'x, y'.
// var getOfferAddress = function () {};

// Функция, возвращающая тип жилья: один рандомный из переданного массива.
var getOfferType = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

// Функция, возвращающая массив строк случайной длины из переданного массива.
// var getOfferFeatures = function (array) {};

// Функция, возвращающая рандомно перемешанный массив той же длины (для фото).
// var getMixedArray = function () {};
