'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var OFFER_CHECKS = ['12:00', '13:00', '14:00'];

var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Функция, возвращающая рандомное число в диапазоне между переданными min и max.
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

// Функция, возвращающая адрес ссылки аватара автора. Значения не должны повторяться. Функция пока ЧЕРНОВАЯ.
var getAvatarLink = function (num) {
  if (num < 10) {
    var index = '0' + num;
  } else {
    index = num;
  }
  var linkPath = 'img/avatars/user';
  var linkExtension = '.png';
  return linkPath + index + linkExtension;
};

// Функция, возвращающая координаты адреса в виде 'x, y'.
var getCoordinates = function () {
  var locationX = getRandomNumber(100,999); 
  var locationY = getRandomNumber(100,999);
  var coordinates = locationX + ', ' + locationY;
  return coordinates;
};

// Функция, возвращающая один рандомный элемент из переданного массива.
var getRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

// Функция, возвращающая массив строк случайной длины из переданного массива.
var getVariativeLengthArray = function (array) {
  var newArray = [];
  // Перемешиваем переданный массив
  var draftArray = getMixedArray(array);
  // Определяем длину массива
  var arrayLength = draftArray.length;
  // Генерируем случайное число от 1 до длины массива
  var num = getRandomNumber(1, arrayLength);
  // Записываем в новый массив выбранное из перемешанного мссива число элементов
  for (var i = 0; i < num; i++) {
    newArray.push(draftArray[i]);
  }
  return newArray;
};

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

// Функция для сбора массива объектов объявлений
var getAdsArray = function (amount) {
  var adsArray = [];
  for (var i = 0; i < amount; i++) {
    var ad = {
      'author': {
        'avatar': getAvatarLink(i+1)
      }
    }
    adsArray.push(ad);
  }
  
  console.log(adsArray);
  return adsArray;
};
getAdsArray(8);
