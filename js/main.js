'use strict';

window.page.disactivatePage();
window.constants.mainPin.addEventListener(`mousedown`, window.pin.movePin);

window.constants.MAP.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  window.pin.pinClickHandler(evt);
});
