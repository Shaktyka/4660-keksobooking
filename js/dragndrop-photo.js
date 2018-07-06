'use strict';

(function () {
  var photoBlock = document.querySelector('.ad-form__photo-container');
  var draggedItem = null;

  photoBlock.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  photoBlock.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  photoBlock.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
  });

  photoBlock.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  photoBlock.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

})();
