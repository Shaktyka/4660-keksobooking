'use strict';

(function () {

  var Code = {
    SUCCESS: 200,
    INVALID_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    ERROR_NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  // Функция для отправки данных на сервер
  window.save = function (data, onLoad, onError) {
    var urlSave = 'https://js.dump.academy/keksobooking';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Code.SUCCESS:
          onLoad(xhr.response);
          break;

        case Code.INVALID_REQUEST:
          error = 'Неверный запрос';
          break;
        case Code.NOT_AUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case Code.ERROR_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case Code.SERVER_ERROR:
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

    xhr.open('POST', urlSave);
    xhr.send(data);
  };

  // Функция для загрузки объявлений с сервера
  window.load = function (onLoad, onError) {
    var urlLoad = 'https://js.dump.academy/keksobooking/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Code.SUCCESS:
          onLoad(xhr.response);
          break;

        case Code.INVALID_REQUEST:
          error = 'Неверный запрос';
          break;
        case Code.NOT_AUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case Code.ERROR_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case Code.SERVER_ERROR:
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

    xhr.open('GET', urlLoad);
    xhr.send();
  };

})();
