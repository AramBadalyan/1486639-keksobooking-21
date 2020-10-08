'use strict';

const OFFERS_NUMBER = 8;
const OFFER_TYPE = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
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

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomDescription = (possibleOptions) => {
  let mutableOptions = possibleOptions.slice(); // Создаем копию входящего массива
  let result = [];

  for (let i = 0, l = getRandomInt(possibleOptions.length); i < l; i++) {
    result[i] = mutableOptions.splice(getRandomInt(mutableOptions.length), 1)[0];
  }

  return result;
};

const getSimilarOffers = (offersNumber) => {
  const similarOffers = [];
  let avatarFiles = [];

  for (let i = 0; i < offersNumber; i++) {
    avatarFiles[i] = `user0${i + 1}.png`;
  }

  for (let i = 0; i < offersNumber; i++) {
    similarOffers[i] = {
      author: {
        avatar: `${AVATAR_PATH}${avatarFiles.splice(getRandomInt(avatarFiles.length), 1)}`
      },
      location: {
        x: `размеры блока`,
        y: getRandomInt(500) + 130
      },
      offer: {
        title: `Заголовок предложения`,
        addres: `${location.x}, ${location.y}`,
        price: getRandomInt(20) * 1000,
        type: OFFER_TYPE[getRandomInt(OFFER_TYPE.length)],
        rooms: getRandomInt(10),
        guests: getRandomInt(12),
        checkin: OFFER_CHECKIN[getRandomInt(OFFER_CHECKIN.length)],
        checkout: OFFER_CHECKOUT[getRandomInt(OFFER_CHECKOUT.length)],
        features: getRandomDescription(OFFER_FEATURES),
        description: `Описание`,
        photos: getRandomDescription(OFFER_PHOTOS)
      }
    };
  }

  return similarOffers;
};

let offers = getSimilarOffers(OFFERS_NUMBER);
console.log(offers);
