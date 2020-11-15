'use strict';

window.page.disactivate();
window.constants.mainPin.addEventListener(`mousedown`, window.pin.onMove);

window.pin.MAP_PINS.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  window.pin.onClick(evt);
});
