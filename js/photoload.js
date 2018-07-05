'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__input');

  var photoBlock = document.querySelector('.ad-form__photo-container');

  var template = photoBlock.querySelector('.ad-form__photo--template');

  var renderPreview = function (link) {
    var previewElement = document.createElement('div');
    previewElement.classList.add('ad-form__photo');
    previewElement.innerHTML = '<img src="" width="60" height="55" alt="Фотография жилья">';
    previewElement.querySelector('img').src = link;
    return previewElement;
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (template) {
          template.style.display = 'none';
        }
        photoBlock.appendChild(renderPreview(reader.result));
      });

      reader.readAsDataURL(file);
    }
  });
})();
