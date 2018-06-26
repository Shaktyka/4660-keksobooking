'use strict';

// СЛУЖЕБНЫЕ ФУНКЦИИ

(function () {
  // Функция, возвращающая рандомное число в диапазоне между переданными min и max.
  window.getRandomNumber = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  };

  // Функция, возвращающая один рандомный элемент из переданного массива.
  window.getRandomElement = function (array) {
    var randomElement = Math.floor(Math.random() * array.length);
    return array[randomElement];
  };

  // Функция, возвращающая рандомно перемешанный массив той же длины (для фото).
  window.getMixedArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  // Функция, возвращающая массив строк случайной длины из переданного массива.
  window.getVariativeLengthArray = function (array) {
    var newArray = [];
    // Перемешиваем переданный массив
    var draftArray = window.getMixedArray(array);
    // Определяем длину массива
    var arrayLength = draftArray.length;
    // Генерируем случайное число от 1 до длины массива
    var num = window.getRandomNumber(1, arrayLength);
    // Записываем в новый массив выбранное из перемешанного мссива число элементов
    for (var i = 0; i < num; i++) {
      newArray.push(draftArray[i]);
    }
    return newArray;
  };

  // Функция, выдающая 1-й элемент массива поочерёдно
  window.getSeriatimElement = function (array) {
    var title = array.shift();
    return title;
  };
})();
