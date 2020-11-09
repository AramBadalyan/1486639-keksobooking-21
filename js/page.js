'use strict';

(function () {

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

  // Перевод страницы в неактивное состояние
  const disactivatePage = () => {
    window.constants.MAP.classList.add(`map--faded`);
    window.form.adForm.classList.add(`ad-form--disabled`);
    for (let element of window.form.adFormElements) {
      element.disabled = true;
    }
    for (let element of window.form.filterFormElements) {
      element.disabled = true;
    }
    window.constants.mainPin.style.left = `${window.constants.mainPinStartPosition.x}px`;
    window.constants.mainPin.style.top = `${window.constants.mainPinStartPosition.y}px`;
    window.pin.setCoordinates(false);
    window.pin.removePins();

    window.constants.mainPin.addEventListener(`mousedown`, activatePage);
  };

  // Активация страницы
  const activatePage = (evt) => {
    if (evt.button === window.constants.MOUSE_MAIN_BUTTON) {
      window.server.load(window.map.fillElement, errorHandler);

      window.constants.MAP.classList.remove(`map--faded`);
      window.form.adForm.classList.remove(`ad-form--disabled`);
      for (let element of window.form.adFormElements) {
        element.disabled = false;
      }
      for (let element of window.form.filterFormElements) {
        element.disabled = false;
      }

      window.constants.mainPin.removeEventListener(`mousedown`, activatePage);

      window.pin.setCoordinates(true);
    }
  };

  window.page = {
    activatePage,
    disactivatePage
  };
})();
