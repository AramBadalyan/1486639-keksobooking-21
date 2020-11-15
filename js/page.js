'use strict';

const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const photoPreview = document.querySelector(`.ad-form__photo`);

const errorHandler = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: #f0f0ea; vertical-align: middle`;
  node.style.position = `absolute`;
  node.style.width = `80%`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.top = `30px`;
  node.style.fontSize = `30px`;

  node.textContent = `${errorMessage}.
    Укажите местоположение вашего объявления без соседних`;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

// Сброс превью загруженных картинок
const resetImagesPreview = () => {
  avatarPreview.src = `img/muffin-grey.svg`;
  photoPreview.innerHTML = ``;
};

// Выключение/выключение элементов формы
const disableElement = (element) => {
  element.disabled = true;
};

const enableElement = (element) => {
  element.disabled = false;
};

// Перевод страницы в неактивное состояние
const disactivate = () => {
  window.constants.MAP.classList.add(`map--faded`);
  window.form.advert.classList.add(`ad-form--disabled`);

  Array.from(window.form.advertElements).forEach(disableElement);
  Array.from(window.form.filterElements).forEach(disableElement);

  window.constants.mainPin.style.left = `${window.constants.mainPinStartPosition.x}px`;
  window.constants.mainPin.style.top = `${window.constants.mainPinStartPosition.y}px`;
  window.card.onClose();
  window.pin.setCoordinates(false);
  window.pin.removeAll();
  resetImagesPreview();

  window.constants.mainPin.addEventListener(`mousedown`, activate);
};

// Активация страницы
const activateMap = (pins) => {
  Array.from(window.form.filterElements).forEach(enableElement);
  window.map.fillElement(pins);
};

const activateadvert = () => {
  window.form.advert.classList.remove(`ad-form--disabled`);
  window.pin.setCoordinates(true);

  Array.from(window.form.advertElements).forEach(enableElement);
};

const activate = (evt) => {
  if (evt.button === window.constants.MOUSE_MAIN_BUTTON) {
    window.server.load(activateMap, errorHandler); // требование ТЗ 5.10
    activateadvert();

    window.constants.MAP.classList.remove(`map--faded`);
    window.constants.mainPin.removeEventListener(`mousedown`, activate);
  }
};

window.page = {
  activate,
  disactivate
};
