'use strict';

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var OFFER_CHECKS = ['12:00', '13:00', '14:00'];

var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MAIN_PIN_WIDTH = 60;
var MAIN_PIN_HEIGTH = 80;
var MAIN_PIN_LEFT = 570;
var MAIN_PIN_TOP = 375;

var map = document.querySelector('.map');

// Дефолтная метка на карте
var pinMain = map.querySelector('.map__pin--main');


// Координаты дефолтной метки по её центру
var mainPinCenteredLeft = MAIN_PIN_LEFT - MAIN_PIN_WIDTH / 2;
var mainPinCenteredTop = MAIN_PIN_TOP - MAIN_PIN_HEIGTH / 2;

// Координаты дефолтной метки по указателю
var mainPinPointLeft = MAIN_PIN_LEFT - MAIN_PIN_WIDTH / 2;
var mainPinPointTop = MAIN_PIN_TOP - MAIN_PIN_HEIGTH;

// СЛУЖЕБНЫЕ ФУНКЦИИ

// Функция, возвращающая рандомное число в диапазоне между переданными min и max.
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

// Функция, возвращающая адрес ссылки аватара автора. Значения не должны повторяться.
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

// Функция, выдающая 1-й элемент массива поочерёдно
var getSeriatimElement = function (array) {
  var title = array.shift();
  return title;
};

// Функция для конвертации англоязычного типа жилья в русскоязычный
var convertType = function (typeHouse) {
  var typeValue = '';
  switch (typeHouse) {
    case 'palace':
      typeValue = 'Дворец';
      break;
    case 'flat':
      typeValue = 'Квартира';
      break;
    case 'house':
      typeValue = 'Дом';
      break;
    case 'bungalo':
      typeValue = 'Бунгало';
  }
  return typeValue;
};

// Функция для сборки списка фичей
var getListFeatures = function (rawList) {
  var parsedList = '';
  for (var i = 0; i < rawList.length; i++) {
    if (rawList[i] === 'wifi') {
      parsedList += '<li class="popup__feature popup__feature--wifi">wifi</li>';
    } else if (rawList[i] === 'dishwasher') {
      parsedList += '<li class="popup__feature popup__feature--dishwasher">dishwasher</li>';
    } else if (rawList[i] === 'parking') {
      parsedList += '<li class="popup__feature popup__feature--parking">parking</li>';
    } else if (rawList[i] === 'washer') {
      parsedList += '<li class="popup__feature popup__feature--washer">washer</li>';
    } else if (rawList[i] === 'elevator') {
      parsedList += '<li class="popup__feature popup__feature--elevator">elevator</li>';
    } else if (rawList[i] === 'conditioner') {
      parsedList += '<li class="popup__feature popup__feature--conditioner">conditioner</li>';
    }
  }
  return parsedList;
};

// Функция для сбора массива объектов объявлений
var getAdsArray = function (amount) {
  var adsArray = [];
  for (var i = 0; i < amount; i++) {
    var ad = {
      'author': {
        'avatar': getAvatarLink(i + 1)
      },
      'offer': {
        'title': getSeriatimElement(OFFER_TITLES),
        'price': getRandomNumber(1000, 1000000),
        'type': convertType(getRandomElement(OFFER_TYPES)),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 8),
        'checkin': getRandomElement(OFFER_CHECKS),
        'checkout': getRandomElement(OFFER_CHECKS),
        'features': getListFeatures(getVariativeLengthArray(OFFER_FEATURES)),
        'description': '',
        'photos': OFFER_PHOTOS.slice().sort(function () {
          return Math.random() - 0.5;
        })
      },
      'location': {
        'x': getRandomNumber(300, 900),
        'y': getRandomNumber(130, 630)
      }
    };
    ad.offer.address = ad.location.x + ', ' + ad.location.y;
    adsArray.push(ad);
  }
  return adsArray;
};

// Находим шаблон изображения
var renderPhotos = function (photos, cardElement) {
  var photoTemplateElement = document.querySelector('template').content.querySelector('.popup__photo');
  var photoContainer = cardElement.querySelector('.popup__photos');
  photoContainer.innerHTML = '';
  for (var i = 0; i < photos.length; i++) {
    var photoElement = photoTemplateElement.cloneNode(true);
    photoElement.src = photos[i];
    photoContainer.appendChild(photoElement);
  }
};

// Находим блок, куда поместим все новые метки
var similarListPins = map.querySelector('.map__pins');

// Находим шаблон, который будем использовать для генерации меток
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

// Генерация метки на основе шаблона
var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x - 25 + 'px';
  pinElement.style.top = pin.location.y - 70 + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    createCard(pin);
  });
  return pinElement;
};

// Функция отрисовки меток и добавления в целевой блок
var createPins = function () {
  var fragment = document.createDocumentFragment();
  var pins = getAdsArray(8);
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  // Проверяем, есть ли уже на карте метки. Если есть, то новые метки не генерируем.
  var buttonsList = similarListPins.querySelectorAll('button:not(.map__pin--main)');
  if (buttonsList.length === 0) {
    similarListPins.appendChild(fragment);
  }
};

// Функция закрытия объявления нажатием на крестик
var similarAdTemplate = document.querySelector('template').content.querySelector('.map__card');

// Генерация объявления на основе шаблона
var renderAd = function (advertisement) {
  var cardElement = similarAdTemplate.cloneNode(true);
  cardElement.querySelector('img').src = advertisement.author.avatar;
  cardElement.querySelector('.popup__title').textContent = advertisement.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = advertisement.offer.price + '&#x20bd;<span>/ночь</span>';
  cardElement.querySelector('.popup__type').textContent = advertisement.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = advertisement.offer.features;
  cardElement.querySelector('.popup__description').textContent = advertisement.offer.description;
  renderPhotos(advertisement.offer.photos, cardElement);
  var closeButton = cardElement.querySelector('.popup__close');
  closeButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    cardElement.classList.add('hidden');
  });
  closeButton.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === 13) {
      cardElement.classList.add('hidden');
    }
  });
  return cardElement;
};

// Отрисовка объявлений и добавление их в целевой блок
var createCard = function (pin) {
  var cardsBeforeElement = map.querySelector('.map__filters-container');

  var cardsParentElement = cardsBeforeElement.parentNode;

  // Добавление карточек объявлений
  cardsParentElement.insertBefore(renderAd(pin), cardsBeforeElement);
};

// Прописываем координаты дефолтной метки по центру
pinMain.style.left = mainPinCenteredLeft + 'px';
pinMain.style.top = mainPinCenteredTop + 'px';

// Прописываем координаты в поле Адрес при неактивной странице
var addressInput = document.getElementById('address');
addressInput.value = mainPinCenteredLeft + ', ' + mainPinCenteredTop;

// АКТИВАЦИЯ СТРАНИЦЫ

// Эмулируем перетаскивание дефолтной метки
var buttonMouseupHandler = function () {
  // разблокируем карту
  map.classList.remove('map--faded');
  // разблокируем форму
  form.classList.remove('ad-form--disabled');
  // разблокируем филдсеты
  fieldsetList.forEach(function (item) {
    item.disabled = false;
  });
  // разблокируем генерацию массива меток и объявлений
  createPins();
  // координаты дефолтной метки по указателю
  // pinMain.style.left = mainPinCenteredLeft + 'px';
  // pinMain.style.top = MAIN_PIN_TOP - MAIN_PIN_HEIGTH + 'px';
  // прописываем координаты дефолтной метки в поле адреса по указателю
  // addressInput.value = mainPinPointLeft + ', ' + mainPinPointTop;
  window.translateCoordsPin();
};

pinMain.addEventListener('mouseup', buttonMouseupHandler);

// DRAGNDROP ГЛАВНОЙ МЕТКИ

pinMain.addEventListener('mousedown', function (mouseEvt) {
  mouseEvt.preventDefault();

  var startCoords = {
    x: mouseEvt.clientX,
    y: mouseEvt.clientY
  };

  var pinMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    if (moveEvt.pageY < 130) {
      moveEvt.clientY = 130;
    } else if (moveEvt.pageY > 630) {
      moveEvt.clientY = 630;
    }

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
    pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
  };

  var pinUpHandler = function (upEvt) {
    upEvt.preventDefault();

    // Функция для трансляции кординат в поле address
    window.translateCoordsPin = function () {

      // var pinMain = map.querySelector('.map__pin--main');
      // var addressInput = document.getElementById('address');

      // берём текущие координаты метки
      var coordinates = {
        x: pinMain.offsetLeft,
        y: pinMain.offsetTop
      };

      // прописываем координаты в поле address
      addressInput.value = coordinates.x + ', ' + coordinates.y;
    };
    window.translateCoordsPin();

    document.removeEventListener('mousemove', pinMoveHandler);
    document.removeEventListener('mouseup', pinUpHandler);
  };

  document.addEventListener('mousemove', pinMoveHandler);
  document.addEventListener('mouseup', pinUpHandler);
});

// ВАЛИДАЦИЯ ФОРМЫ

var form = document.querySelector('.ad-form');

var fieldsetList = form.querySelectorAll('fieldset');

var type = document.getElementById('type');

var price = document.getElementById('price');

type.addEventListener('change', function () {
  if (type.selectedIndex === 0) {
    price.min = 0;
    price.placeholder = 0;
  } else if (type.selectedIndex === 1) {
    price.min = 1000;
    price.placeholder = 1000;
  } else if (type.selectedIndex === 2) {
    price.min = 5000;
    price.placeholder = 5000;
  } else if (type.selectedIndex === 3) {
    price.min = 10000;
    price.placeholder = 10000;
  }
});

// СИНХРОНИЗАЦИЯ времени ЧЕКИНА и ЧЕКАУТА

var checkin = document.getElementById('timein');

var checkout = document.getElementById('timeout');

checkin.addEventListener('change', function () {
  checkout.selectedIndex = checkin.selectedIndex;
});

checkout.addEventListener('change', function () {
  checkin.selectedIndex = checkout.selectedIndex;
});

// СООТВЕТСТВИЕ КОЛ-ВА КОМНАТ И КОЛ-ВА ГОСТЕЙ

var rooms = document.getElementById('rooms');

var guests = document.getElementById('capacity');

rooms.addEventListener('change', function () {
  var currentValue = rooms.value;
  if (currentValue === '0') {
    for (var c = 0; c < guests.children.length; c++) {
      guests.children[c].disabled = true;
    }
    guests.children[guests.children.length - 1].disabled = false;
    guests.children[guests.children.length - 1].selected = true;
  } else {
    for (var d = 0; d < guests.children.length; d++) {
      if (d < currentValue) {
        guests.children[d].disabled = false;
      } else {
        guests.children[d].disabled = true;
      }
    }
    guests.children[0].selected = true;
  }
});

// ВАЛИДАЦИЯ ОТПРАВКИ ВСЕЙ ФОРМЫ

var sendForm = document.querySelector('.ad-form__submit');

// Функция поиска невалидных полей
var findInvalidFields = function () {
  var fields = form.querySelectorAll('input:not(.visually-hidden):not([type="checkbox"])');
  var invalidFields = [];

  for (var h = 0; h < fields.length; h++) {
    if (fields[h].checkValidity() === false) {
      var field = fields[h];
      invalidFields.push(field);
    }
  }
  return invalidFields;
};

// Функция навешивания красных рамок на невалидные поля
var submitClickHandler = function () {
  var invalidInputs = findInvalidFields();
  if (invalidInputs) {
    for (var y = 0; y < invalidInputs.length; y++) {
      var input = invalidInputs[y];
      input.style.outline = '2px solid red';
    }
  }
};

sendForm.addEventListener('click', submitClickHandler);

// Функция скрытия меток на карте при reset
var hidePins = function () {
  var pinsList = similarListPins.querySelectorAll('button:not(.map__pin--main)');
  for (var g = 0; g < pinsList.length; g++) {
    pinsList[g].remove();
  }
};

// Функция закрытия открытых объявлений при reset
var hideAds = function () {
  var adsList = map.querySelectorAll('article.map__card');
  if (adsList) {
    for (var l = 0; l < adsList.length; l++) {
      adsList[l].classList.add('hidden');
    }
  }
};

// Функция сброса выделенных чекбоксов
var resetCheckboxes = function () {
  var featuresList = form.querySelector('.features').querySelectorAll('input');
  if (featuresList) {
    for (var z = 0; z < featuresList.length; z++) {
      featuresList[z].checked = false;
    }
  }
};

// Функция сброса красных рамок у невалидных полей
var resetInvalidDecor = function (invalidInputs) {
  if (invalidInputs) {
    for (var x = 0; x < invalidInputs.length; x++) {
      var invalidInput = invalidInputs[x];
      invalidInput.style.outline = '';
    }
  }
};

// Reset введённых данных
var resetInputs = function () {
  var titleInput = document.getElementById('title');
  var description = document.getElementById('description');

  if (titleInput.value) {
    titleInput.value = '';
  }
  if (description.value) {
    description.value = '';
  }
  if (price.value) {
    price.value = '';
  }
  if (type.selectedIndex !== 0) {
    type.selectedIndex = 0;
  }
  if (rooms.selectedIndex !== 0) {
    rooms.selectedIndex = 0;
  }
  if (guests.selectedIndex !== 0) {
    guests.selectedIndex = 0;
  }
  if (checkin.selectedIndex !== 0) {
    checkin.selectedIndex = 0;
  }
  if (checkout.selectedIndex !== 0) {
    checkout.selectedIndex = 0;
  }
};

// Функция обработки сброса формы
var resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', function () {
  // закрываем открытые объявления
  hideAds();
  // убираем все метки с карты
  hidePins();
  // ставим главную метку на исходную позицию
  pinMain.style.left = mainPinCenteredLeft + 'px';
  pinMain.style.top = mainPinCenteredTop + 'px';
  // устанавливаем координаты в поле address
  addressInput.value = mainPinCenteredLeft + ', ' + mainPinCenteredTop;
  // сбрасываем введённые данные, если были
  resetInputs();
  // устанавливаем default плейсхолдера селекта price
  price.placeholder = 5000;
  // убираем красные рамки invalid полей при наличии
  resetInvalidDecor(findInvalidFields());
  // сбрасываем чекбоксы
  resetCheckboxes();
  // затемняем карту
  map.classList.add('map--faded');
  // блокируем филдсеты
  fieldsetList.forEach(function (item) {
    item.disabled = true;
  });
  // затемняем форму
  form.classList.add('ad-form--disabled');
});
