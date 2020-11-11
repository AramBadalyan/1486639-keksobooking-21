'use strict';

window.page.disactivatePage();
window.constants.mainPin.addEventListener(`mousedown`, window.pin.movePin);

window.pin.MAP_PINS.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  window.pin.pinClickHandler(evt);
});
