'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__input');
  // var photoContainer = document.querySelector('.ad-form__photo-container');
  // var preview = document.querySelector('.ad-form__photo');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        // тут надо тег img добавлять
        // проверить насчёт множественной загрузки
        // + добавить сброс фото в reset
        // preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
