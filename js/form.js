'use strict';

(function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  const filterForm = window.constants.MAP.querySelector(`.map__filters`);
  const filterFormElements = filterForm.children;
  const adForm = document.querySelector(`.ad-form`);
  const adFormElements = adForm.children;
  const addressInput = adForm.querySelector(`#address`);
  const roomsInput = adForm.querySelector(`#room_number`);
  const capacityInput = adForm.querySelector(`#capacity`);
  const adFormReset = adForm.querySelector(`.ad-form__reset`);
  const titleInput = adForm.querySelector(`#title`);
  const typeInput = adForm.querySelector(`#type`);
  const priceInput = adForm.querySelector(`#price`);
  const checkInInput = adForm.querySelector(`#timein`);
  const checkOutInput = adForm.querySelector(`#timeout`);
  const avatarInput = adForm.querySelector(`#avatar`);
  const imagesInput = adForm.querySelector(`#images`);

  // Синхронизация времени заезда/выезда
  const syncInOutTime = (target) => {
    if (target === checkInInput) {
      checkOutInput.value = checkInInput.value;
    } else {
      checkInInput.value = checkOutInput.value;
    }
  };

  adForm.action = `https://21.javascript.pages.academy/keksobooking`;
  addressInput.readOnly = true;
  window.pin.setCoordinates(false);

  roomsInput.addEventListener(`change`, function (evt) {
    window.formValidation.typeOfRoom = evt.target.value;
    window.formValidation.typeOfCapacity(capacityInput);
  });

  capacityInput.addEventListener(`change`, function (evt) {
    window.formValidation.typeOfCapacity(evt.target);
  });

  // У кнопки "очистить" type="reset", дополнительно сбрасывать форму не нужно
  adFormReset.addEventListener(`click`, function () {
    window.page.disactivatePage();
  });

  titleInput.required = true;
  titleInput.minLength = MIN_TITLE_LENGTH;
  titleInput.maxLength = MAX_TITLE_LENGTH;

  titleInput.addEventListener(`input`, function (evt) {
    window.formValidation.valueLengthValidation(evt.target, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
  });

  priceInput.required = true;
  priceInput.max = 1000000;
  priceInput.placeholder = window.formValidation.priceOfType[window.formValidation.typeOfHouse];

  priceInput.addEventListener(`input`, function (evt) {
    window.formValidation.priceValidation(evt.target);
  });

  typeInput.addEventListener(`change`, function () {
    window.formValidation.typeOfHouse = typeInput.value;
    priceInput.placeholder = window.formValidation.priceOfType[window.formValidation.typeOfHouse];
    window.formValidation.priceValidation(priceInput);
  });

  avatarInput.accept = `image/*`;
  imagesInput.accept = `image/*`;

  checkInInput.addEventListener(`change`, function (evt) {
    syncInOutTime(evt.target);
  });
  checkOutInput.addEventListener(`change`, function (evt) {
    syncInOutTime(evt.target);
  });

  window.form = {
    filterForm,
    filterFormElements,
    adForm,
    adFormElements,
    addressInput,

    syncInOutTime
  };
})();
