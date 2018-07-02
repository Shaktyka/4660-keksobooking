'use strict';

(function () {

  var SAVE_URL = 'https://js.dump.academy/keksobooking';
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';

  var SUCCESS_CODE = 200;
  var INVALID_REQUEST_CODE = 400;
  var NOT_AUTHORIZED_CODE = 401;
  var ERROR_NOT_FOUND_CODE = 404;
  var SERVER_ERROR_CODE = 500;

  // Функция для отправки данных на сервер
  window.save = function (data, onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case SUCCESS_CODE:
          onLoad(xhr.response);
          break;

        case INVALID_REQUEST_CODE:
          error = 'Неверный запрос';
          break;
        case NOT_AUTHORIZED_CODE:
          error = 'Пользователь не авторизован';
          break;
        case ERROR_NOT_FOUND_CODE:
          error = 'Ничего не найдено';
          break;
        case SERVER_ERROR_CODE:
          error = 'Ошибка сервера';
          break;

        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  // Функция для загрузки объявлений с сервера
  window.load = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case SUCCESS_CODE:
          onLoad(xhr.response);
          break;

        case INVALID_REQUEST_CODE:
          error = 'Неверный запрос';
          break;
        case NOT_AUTHORIZED_CODE:
          error = 'Пользователь не авторизован';
          break;
        case ERROR_NOT_FOUND_CODE:
          error = 'Ничего не найдено';
          break;
        case SERVER_ERROR_CODE:
          error = 'Ошибка сервера';
          break;

        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

})();
