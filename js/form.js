'use strict';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const filter = window.constants.MAP.querySelector(`.map__filters`);
const filterElements = filter.children;
const advert = document.querySelector(`.ad-form`);
const advertElements = advert.children;
const addressInput = advert.querySelector(`#address`);
const roomsInput = advert.querySelector(`#room_number`);
const capacityInput = advert.querySelector(`#capacity`);
const advertReset = advert.querySelector(`.ad-form__reset`);
const advertSubmit = advert.querySelector(`.ad-form__submit`);
const advertInputs = advert.querySelectorAll(`input`);
const titleInput = advert.querySelector(`#title`);
const typeInput = advert.querySelector(`#type`);
const priceInput = advert.querySelector(`#price`);
const checkInInput = advert.querySelector(`#timein`);
const checkOutInput = advert.querySelector(`#timeout`);
const avatarInput = advert.querySelector(`#avatar`);
const imagesInput = advert.querySelector(`#images`);
const avatarPreview = advert.querySelector(`.ad-form-header__preview img`);
const photoPreview = advert.querySelector(`.ad-form__photo`);

const successMessageTemplate = document.querySelector(`#success`);
const errorMessageTemplate = document.querySelector(`#error`);

// Success message
const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.content.cloneNode(true);

  document.addEventListener(`click`, onHideSuccessMessage);
  document.addEventListener(`keydown`, onHideSuccessMessageByEsc);

  window.constants.pageMain.appendChild(successMessage);
};

const onHideSuccessMessage = (evt) => {
  evt.preventDefault();
  const message = window.constants.pageMain.querySelector(`.success`);
  window.constants.pageMain.removeChild(message);

  document.removeEventListener(`click`, onHideSuccessMessage);
  document.removeEventListener(`keydown`, onHideSuccessMessageByEsc);
};

const onHideSuccessMessageByEsc = (evt) => {
  if (evt.key === window.constants.ESC_KEY) {
    onHideSuccessMessage(evt);
  }
};

// Error message
const onShowErrorMessage = () => {
  const errorMessage = errorMessageTemplate.content.cloneNode(true);
  const closeButton = errorMessage.querySelector(`.error__button`);

  document.addEventListener(`click`, onHideErrorMessage);
  document.addEventListener(`keydown`, onHideErrorMessageByEsc);
  closeButton.addEventListener(`click`, onHideErrorMessage);

  window.constants.pageMain.appendChild(errorMessage);
};

const onHideErrorMessage = (evt) => {
  evt.preventDefault();
  const message = window.constants.pageMain.querySelector(`.error`);
  const errorButton = message.querySelector(`.error__button`);
  window.constants.pageMain.removeChild(message);

  document.removeEventListener(`click`, onHideErrorMessage);
  document.removeEventListener(`keydown`, onHideErrorMessageByEsc);
  errorButton.removeEventListener(`click`, onHideErrorMessage);
};

const onHideErrorMessageByEsc = (evt) => {
  if (evt.key === window.constants.ESC_KEY) {
    onHideErrorMessage(evt);
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

// Вывод превью загруженных изображений
const setImageToPreview = (input, preview) => {
  const image = input.files[0];
  const imageName = image.name.toLowerCase();

  const isImage = window.constants.IMAGE_TYPES.some((type) => {
    return imageName.endsWith(type);
  });

  if (isImage) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(image);
  }
};

advert.action = `https://21.javascript.pages.academy/keksobooking`;
addressInput.readOnly = true;
window.pin.setCoordinates(false);

roomsInput.addEventListener(`change`, (evt) => {
  window.formValidation.typeOfRoom = evt.target.value;
  window.formValidation.typeOfCapacity(capacityInput);
});

capacityInput.addEventListener(`change`, (evt) => {
  window.formValidation.typeOfCapacity(evt.target);
});

advertReset.addEventListener(`click`, () => {
  advert.reset();
  filter.reset();
  window.page.disactivate();
});

titleInput.required = true;
titleInput.minLength = MIN_TITLE_LENGTH;
titleInput.maxLength = MAX_TITLE_LENGTH;

titleInput.addEventListener(`input`, (evt) => {
  window.formValidation.valueLength(evt.target, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
});

priceInput.required = true;
priceInput.max = 1000000;
priceInput.placeholder = window.formValidation.priceOfType[window.formValidation.typeOfHouse];

priceInput.addEventListener(`input`, (evt) => {
  window.formValidation.price(evt.target);
});

typeInput.addEventListener(`change`, () => {
  window.formValidation.typeOfHouse = typeInput.value;
  priceInput.placeholder = window.formValidation.priceOfType[window.formValidation.typeOfHouse];
  priceInput.min = window.formValidation.priceOfType[window.formValidation.typeOfHouse];
  window.formValidation.price(priceInput);
});

avatarInput.accept = `image/*`;
imagesInput.accept = `image/*`;

avatarInput.addEventListener(`change`, () => {
  setImageToPreview(avatarInput, avatarPreview);
});


imagesInput.addEventListener(`change`, () => {
  const offerPhoto = document.createElement(`img`);
  offerPhoto.style.width = `100%`;
  offerPhoto.style.height = `auto`;
  offerPhoto.alt = `Фотография жилья`;

  setImageToPreview(imagesInput, offerPhoto);

  photoPreview.innerHTML = ``;
  photoPreview.appendChild(offerPhoto);
});

checkInInput.addEventListener(`change`, (evt) => {
  syncInOutTime(evt.target);
});
checkOutInput.addEventListener(`change`, (evt) => {
  syncInOutTime(evt.target);
});

advertSubmit.addEventListener(`click`, () => {
  advertInputs.forEach((advertElement) => {
    if (!advertElement.validity.valid) {
      advertElement.style = window.formValidation.errorNotice;
    } else {
      advertElement.style = window.formValidation.nonNotice;
    }
  });
});

advert.addEventListener(`submit`, (evt) => {
  window.server.upload(
      new FormData(advert),
      () => {
        filter.reset();
        advert.reset();
        window.page.disactivate();
        showSuccessMessage();
      },
      onShowErrorMessage);
  evt.preventDefault();
});

window.form = {
  filter,
  filterElements,
  advert,
  advertElements,
  addressInput,

  syncInOutTime
};
