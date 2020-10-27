'use strict';

(function () {
  const OFFERS_NUMBER = 8;
  const OFFER_PRICE = [
    1000,
    2000,
    4000,
    8000,
    16000
  ];
  const OFFER_TYPE = [
    `palace`,
    `flat`,
    `house`,
    `bungalow`
  ];
  const OFFER_ROOMS = [
    1,
    2,
    3,
    4,
    5
  ];
  const OFFER_GUESTS = [
    1,
    2,
    3,
    4,
    8
  ];
  const OFFER_CHECKIN = [
    `12:00`,
    `13:00`,
    `14:00`
  ];
  const OFFER_CHECKOUT = [
    `12:00`,
    `13:00`,
    `14:00`
  ];
  const OFFER_FEATURES = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];
  const OFFER_PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const AVATAR_PATH = `img/avatars/`;

  const getRandomOffer = (number) => {
    // Определяем координаты кончика указателя вычитанием смещения
    let locationX = window.util.getRandomIntInclusive(window.constants.LOC_X_MIN, window.constants.LOC_X_MAX);
    // Ограничение по Y от LOC_Y_MIN до LOC_Y_MAX
    let locationY = window.util.getRandomIntInclusive(window.constants.LOC_Y_MIN, window.constants.LOC_Y_MAX);

    const offer = {
      author: {
        avatar: `${AVATAR_PATH}user0${number}.png`
      },
      location: {
        x: locationX,
        y: locationY
      },
      offer: {
        title: `Заголовок предложения`,
        address: `${locationX}, ${locationY}`,
        price: OFFER_PRICE[window.util.getRandomInt(OFFER_PRICE.length)],
        type: OFFER_TYPE[window.util.getRandomInt(OFFER_TYPE.length)],
        rooms: OFFER_ROOMS[window.util.getRandomInt(OFFER_ROOMS.length)],
        guests: OFFER_GUESTS[window.util.getRandomInt(OFFER_GUESTS.length)],
        checkin: OFFER_CHECKIN[window.util.getRandomInt(OFFER_CHECKIN.length)],
        checkout: OFFER_CHECKOUT[window.util.getRandomInt(OFFER_CHECKOUT.length)],
        features: window.util.getRandomDescription(OFFER_FEATURES),
        description: `Описание`,
        photos: window.util.getRandomDescription(OFFER_PHOTOS)
      }
    };
    return offer;
  };

  const getRandomOffersList = (offersNumber) => {
    const similarOffers = [];

    // Генерируем массив предложений
    for (let i = 0; i < offersNumber; i++) {
      similarOffers.push(getRandomOffer(i + 1));
    }

    return similarOffers;
  };

  const nearbyOffers = getRandomOffersList(OFFERS_NUMBER);

  window.data = {
    nearbyOffers
  };

})();
