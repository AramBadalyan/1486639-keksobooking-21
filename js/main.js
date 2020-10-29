'use strict';

window.page.disactivatePage();

window.constants.mainPin.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  window.page.activatePage();
  window.form.setAddresInputValue();
});

window.constants.MAP.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  window.pin.pinClickHandler(evt);
});
