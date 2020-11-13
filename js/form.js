'use strict';


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
const adFormSubmit = adForm.querySelector(`.ad-form__submit`);
const adFormInputs = adForm.querySelectorAll(`input`);
const titleInput = adForm.querySelector(`#title`);
const typeInput = adForm.querySelector(`#type`);
const priceInput = adForm.querySelector(`#price`);
const checkInInput = adForm.querySelector(`#timein`);
const checkOutInput = adForm.querySelector(`#timeout`);
const avatarInput = adForm.querySelector(`#avatar`);
const imagesInput = adForm.querySelector(`#images`);

const successMessageTemplate = document.querySelector(`#success`);
const errorMessageTemplate = document.querySelector(`#error`);

// Success message
const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.content.cloneNode(true);

  document.addEventListener(`click`, hideSuccessMessage);
  document.addEventListener(`keydown`, hideSuccessMessageByEsc);

  window.constants.pageMain.appendChild(successMessage);
};

const hideSuccessMessage = (evt) => {
  evt.preventDefault();
  const message = window.constants.pageMain.querySelector(`.success`);
  window.constants.pageMain.removeChild(message);

  document.removeEventListener(`click`, hideSuccessMessage);
  document.removeEventListener(`keydown`, hideSuccessMessageByEsc);
};

const hideSuccessMessageByEsc = (evt) => {
  if (evt.key === window.constants.ESC_KEY) {
    hideSuccessMessage(evt);
  }
};

// Error message
const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.content.cloneNode(true);
  const closeButton = errorMessage.querySelector(`.error__button`);

  document.addEventListener(`click`, hideErrorMessage);
  document.addEventListener(`keydown`, hideErrorMessageByEsc);
  closeButton.addEventListener(`click`, hideErrorMessage);

  window.constants.pageMain.appendChild(errorMessage);
};

const hideErrorMessage = (evt) => {
  evt.preventDefault();
  const message = window.constants.pageMain.querySelector(`.error`);
  const errorButton = message.querySelector(`.error__button`);
  window.constants.pageMain.removeChild(message);

  document.removeEventListener(`click`, hideErrorMessage);
  document.removeEventListener(`keydown`, hideErrorMessageByEsc);
  errorButton.removeEventListener(`click`, hideErrorMessage);
};

const hideErrorMessageByEsc = (evt) => {
  if (evt.key === window.constants.ESC_KEY) {
    hideErrorMessage(evt);
  }
};

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

adFormReset.addEventListener(`click`, function () {
  adForm.reset();
  filterForm.reset();
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
  priceInput.min = window.formValidation.priceOfType[window.formValidation.typeOfHouse];
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

adFormSubmit.addEventListener(`click`, function () {
  adFormInputs.forEach(function (adFormElement) {
    if (!adFormElement.validity.valid) {
      adFormElement.style = window.formValidation.errorNotice;
    } else {
      adFormElement.style = window.formValidation.nonNotice;
    }
  });
});

adForm.addEventListener(`submit`, function (evt) {
  window.server.upload(
      new FormData(adForm),
      function () {
        filterForm.reset();
        adForm.reset();
        window.page.disactivatePage();
        showSuccessMessage();
      },
      function () {
        showErrorMessage();
      });
  evt.preventDefault();
});

window.form = {
  filterForm,
  filterFormElements,
  adForm,
  adFormElements,
  addressInput,

  syncInOutTime
};
