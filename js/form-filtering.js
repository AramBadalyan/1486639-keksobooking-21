'use strict';


const PriceGrade = {
  LOW_TOP: 9999,
  MIDDLE_TOP: 50000
};
const ANY_VALUE = `any`;
const Filter = {
  TYPE: window.form.filterForm.querySelector(`#housing-type`),
  PRICE: window.form.filterForm.querySelector(`#housing-price`),
  ROOMS: window.form.filterForm.querySelector(`#housing-rooms`),
  GUESTS: window.form.filterForm.querySelector(`#housing-guests`),
  FEATURES: window.form.filterForm.querySelector(`#housing-features`),
};

const filterOffersByType = (offers) => {
  if (Filter.TYPE.value === ANY_VALUE) {
    return offers;
  }
  const offersCopy = offers.filter(function (element) {
    return element.offer.type === Filter.TYPE.value;
  });
  return offersCopy;
};

const filterOffersByPrice = (offers) => {
  let offersCopy = offers;
  switch (Filter.PRICE.value) {
    case ANY_VALUE:
      break;
    case `low`:
      offersCopy = offersCopy.filter(function (element) {
        return (element.offer.price <= PriceGrade.LOW_TOP);
      });
      break;
    case `middle`:
      offersCopy = offersCopy.filter(function (element) {
        return (element.offer.price > PriceGrade.LOW_TOP && element.offer.price <= PriceGrade.MIDDLE_TOP);
      });
      break;
    case `high`:
      offersCopy = offersCopy.filter(function (element) {
        return (element.offer.price > PriceGrade.MIDDLE_TOP);
      });
      break;
  }
  return offersCopy;
};

const filterOffersByRooms = (offers) => {
  if (Filter.ROOMS.value === ANY_VALUE) {
    return offers;
  }
  const offersCopy = offers.filter(function (element) {
    return element.offer.rooms === parseInt(Filter.ROOMS.value, 10);
  });
  return offersCopy;
};

const filterOffersByGuests = (offers) => {
  if (Filter.GUESTS.value === ANY_VALUE) {
    return offers;
  }
  const offersCopy = offers.filter(function (element) {
    return element.offer.guests === parseInt(Filter.GUESTS.value, 10);
  });
  return offersCopy;
};

const isOfferIncludesFeatures = (offer) => {
  const checkedFeatures = Array.from(Filter.FEATURES.querySelectorAll(`.map__checkbox:checked`));
  const offerIncludesFeatures = checkedFeatures.every(function (checkedFeature) {
    const offerIncludesFeature = offer.offer.features.some(function (offerFeature) {
      return checkedFeature.value === offerFeature;
    });
    return offerIncludesFeature;
  });

  return offerIncludesFeatures;
};

const filterOffersByFeatures = (offers) => {
  const offersCopy = offers.filter(isOfferIncludesFeatures);
  return offersCopy;
};

const filterOffers = (offers) => {
  let filteredOffers = filterOffersByType(offers);
  filteredOffers = filterOffersByPrice(filteredOffers);
  filteredOffers = filterOffersByRooms(filteredOffers);
  filteredOffers = filterOffersByGuests(filteredOffers);
  filteredOffers = filterOffersByFeatures(filteredOffers);

  return filteredOffers;
};

window.form.filterForm.addEventListener(`change`, window.util.debounce(function (evt) {
  window.card.closeCard(evt);
  window.map.fillElement(filterOffers(window.server.loadedOffers));
}));
