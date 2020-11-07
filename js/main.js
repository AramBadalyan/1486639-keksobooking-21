'use strict';

window.page.disactivatePage();

window.constants.mainPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();
  window.page.activatePage();
  window.pin.movePin(evt);
});

window.constants.MAP.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  window.pin.pinClickHandler(evt);
});
