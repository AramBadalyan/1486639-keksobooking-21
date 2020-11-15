(()=>{"use strict";window.util={debounce:e=>{let t=null;return(...n)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...n)}),500)}}},(()=>{const e=document.querySelector(".map"),t=e.clientWidth,n=document.querySelector("main"),o=e.querySelector(".map__pin--main"),i=o.clientWidth,a=o.clientHeight,r={x:o.offsetLeft,y:o.offsetTop};window.constants={MAX_PINS_ON_MAP:5,POINTER_HEIGHT:16,OFFSET_X:25,OFFSET_Y:70,LOC_X_MIN:0,LOC_X_MAX:t,LOC_Y_MIN:130,LOC_Y_MAX:630,MAP:e,ESC_KEY:"Escape",MOUSE_MAIN_BUTTON:0,HABITATION_TYPE:{palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},IMAGE_TYPES:["gif","jpeg","jpg","png"],pageMain:n,mainPinWidth:i,mainPinHeight:a,mainPin:o,mainPinStartPosition:r}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking",n="GET",o="POST";window.server={load:(t,o)=>{const i=new XMLHttpRequest;i.responseType="json",i.timeout=1e4,i.open(n,e),i.addEventListener("load",(()=>{200===i.status?(t(i.response),window.server.loadedOffers=i.response):o(`Статус ответа: ${i.status} ${i.statusText}`)})),i.addEventListener("error",(()=>{o("Внутренняя ошибка сервера")})),i.addEventListener("timeout",(()=>{o(`Время запроса ${i.timeout}мс вышло. Запрос не успел выполниться`)})),i.send()},upload:(e,n,i)=>{const a=new XMLHttpRequest;a.responseType="json",a.addEventListener("load",n),a.addEventListener("error",i),a.addEventListener("timeout",i),a.open(o,t),a.send(e)}}})(),(()=>{const e=document.querySelector("#card"),t=()=>{const e=window.constants.MAP.querySelector(".map__card"),o=window.constants.MAP.querySelector(".map__pin--active");if(e){const n=e.querySelector(".popup__close");e.remove(),n.removeEventListener("click",t)}o&&o.classList.remove("map__pin--active"),document.removeEventListener("keydown",n)},n=e=>{e.key===window.constants.ESC_KEY&&(e.preventDefault(),t(e))};window.card={render:t=>{const n=e.content.cloneNode(!0),o=n.querySelector(".popup__avatar"),i=n.querySelector(".popup__title"),a=n.querySelector(".popup__text--address"),r=n.querySelector(".popup__text--price"),s=n.querySelector(".popup__type"),d=n.querySelector(".popup__text--capacity"),c=n.querySelector(".popup__text--time"),l=n.querySelector(".popup__description"),w=n.querySelector(".popup__features"),p=n.querySelector(".popup__photos");o.src=t.author.avatar,i.textContent=t.offer.title,a.textContent=t.offer.address,r.innerHTML=t.offer.price+"&#x20bd;<span>/ночь</span>",s.textContent=window.constants.HABITATION_TYPE[t.offer.type],d.textContent=`${t.offer.rooms} комнаты для ${t.offer.guests} гостей`,c.textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,l.textContent=t.offer.description,w.innerHTML="",p.innerHTML="";const m=document.createDocumentFragment(),u=document.createDocumentFragment();return t.offer.features.forEach((e=>{let t=document.createElement("li");t.classList.add("popup__feature","popup__feature--"+e),m.appendChild(t)})),t.offer.photos.forEach((e=>{let t=document.createElement("img");t.classList.add("popup__photo"),t.width=45,t.height=40,t.alt="Фотография жилья",t.src=e,u.appendChild(t)})),w.appendChild(m),p.appendChild(u),n},openElement:e=>{window.constants.MAP.querySelector(".map__card")&&t(),e.querySelector(".popup__close").addEventListener("click",t),document.addEventListener("keydown",n),window.constants.MAP.insertBefore(e,window.constants.MAP.querySelector(".map__filters-container"))},onClose:t,onCloseByEsc:n}})(),(()=>{const e=document.querySelector(".map__pins"),t=document.querySelector("#pin"),n=document.querySelector("#address"),o=0,i=window.constants.MAP.clientWidth,a=130,r=630,s=e=>{const t=window.constants.mainPin.offsetLeft,o=window.constants.mainPin.offsetTop,i=window.constants.mainPin.clientHeight,a=window.constants.mainPin.clientWidth,r=Math.floor(t+a/2),s=e?Math.floor(o+i+window.constants.POINTER_HEIGHT):Math.floor(o+i/2);n.value=`${r}, ${s}`};window.pin={MAP_PINS:e,loadedOffers:[],render:(e,n)=>{const o=t.content.cloneNode(!0),i=o.querySelector(".map__pin"),a=o.querySelector("img");return i.style=`left: ${e.location.x-window.constants.OFFSET_X}px; top: ${e.location.y-window.constants.OFFSET_Y}px`,a.src=e.author.avatar,a.alt=e.offer.title,i.dataset.id=n,o},removeAll:()=>{window.constants.MAP.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}))},onClick:e=>{const t=window.constants.MAP.querySelector(".map__pin--active");e.target.classList.contains("map__pin")&&!e.target.classList.contains("map__pin--main")?(t&&t.classList.remove("map__pin--active"),window.card.onClose(e),window.card.openElement(window.card.render(window.pin.loadedOffers[e.target.dataset.id])),e.target.classList.add("map__pin--active")):e.target.parentElement.classList.contains("map__pin")&&!e.target.parentElement.classList.contains("map__pin--main")&&(t&&t.classList.remove("map__pin--active"),window.card.onClose(e),window.card.openElement(window.card.render(window.pin.loadedOffers[e.target.parentElement.dataset.id])),e.target.parentElement.classList.add("map__pin--active"))},setCoordinates:s,onMove:e=>{if(e.button===window.constants.MOUSE_MAIN_BUTTON){let t={x:e.clientX,y:e.clientY};const n=e=>{e.preventDefault();let n=t.x-e.clientX,d=t.y-e.clientY;window.constants.mainPin.style.left=window.constants.mainPin.offsetLeft-n+"px",window.constants.mainPin.style.top=window.constants.mainPin.offsetTop-d+"px",t={x:e.clientX,y:e.clientY},window.constants.mainPin.offsetLeft<=o-window.constants.mainPin.offsetWidth/2?window.constants.mainPin.style.left=o-window.constants.mainPin.offsetWidth/2+"px":window.constants.mainPin.offsetLeft>=i-window.constants.mainPin.offsetWidth/2&&(window.constants.mainPin.style.left=i-window.constants.mainPin.offsetWidth/2+"px"),window.constants.mainPin.offsetTop<a-window.constants.mainPin.offsetHeight-window.constants.POINTER_HEIGHT?window.constants.mainPin.style.top=a-window.constants.mainPin.offsetHeight-window.constants.POINTER_HEIGHT+"px":window.constants.mainPin.offsetTop>r-window.constants.mainPin.offsetHeight-window.constants.POINTER_HEIGHT&&(window.constants.mainPin.style.top=r-window.constants.mainPin.offsetHeight-window.constants.POINTER_HEIGHT+"px"),s(!0)},d=e=>{e.preventDefault(),s(!0),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",d)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",d)}}}})(),window.map={fillElement:e=>{window.pin.MAP_PINS.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}));const t=window.constants.MAX_PINS_ON_MAP<e.length?window.constants.MAX_PINS_ON_MAP:e.length,n=document.createDocumentFragment();window.pin.loadedOffers=e;for(let o=0;o<t;o++)e[o].offer&&n.appendChild(window.pin.render(e[o],o));window.pin.MAP_PINS.appendChild(n)}},(()=>{const e=document.querySelector(".ad-form-header__preview img"),t=document.querySelector(".ad-form__photo"),n=e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: #f0f0ea; vertical-align: middle",t.style.position="absolute",t.style.width="80%",t.style.left=0,t.style.right=0,t.style.top="30px",t.style.fontSize="30px",t.textContent=e+".\n    Укажите местоположение вашего объявления без соседних",document.body.insertAdjacentElement("afterbegin",t)},o=e=>{e.disabled=!0},i=e=>{e.disabled=!1},a=e=>{Array.from(window.form.filterElements).forEach(i),window.map.fillElement(e)},r=e=>{e.button===window.constants.MOUSE_MAIN_BUTTON&&(window.server.load(a,n),window.form.advert.classList.remove("ad-form--disabled"),window.pin.setCoordinates(!0),Array.from(window.form.advertElements).forEach(i),window.constants.MAP.classList.remove("map--faded"),window.constants.mainPin.removeEventListener("mousedown",r))};window.page={activate:r,disactivate:()=>{window.constants.MAP.classList.add("map--faded"),window.form.advert.classList.add("ad-form--disabled"),Array.from(window.form.advertElements).forEach(o),Array.from(window.form.filterElements).forEach(o),window.constants.mainPin.style.left=window.constants.mainPinStartPosition.x+"px",window.constants.mainPin.style.top=window.constants.mainPinStartPosition.y+"px",window.card.onClose(),window.pin.setCoordinates(!1),window.pin.removeAll(),e.src="img/muffin-grey.svg",t.innerHTML="",window.constants.mainPin.addEventListener("mousedown",r)}}})(),(()=>{const e="box-shadow: 0 0 5px 5px rgba(255, 55, 55, 0.5);",t="box-shadow: 0;",n={1:"Только на одного гостя",2:"Только на одного или двух гостей",3:"Только на одного, двух или трех гостей",100:"Только не для гостей"},o={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]},i={bungalow:0,flat:1e3,house:5e3,palace:1e4};window.formValidation={errorNotice:e,nonNotice:t,guestValidation:n,guestCapacity:o,priceOfType:i,typeOfRoom:"1",typeOfHouse:"flat",typeOfCapacity:i=>{const a=i.value;o[window.formValidation.typeOfRoom].some((e=>e===a))?(i.style=t,i.setCustomValidity("")):(i.style=e,i.setCustomValidity(n[window.formValidation.typeOfRoom])),i.reportValidity()},price:e=>{const t=e.value;e.validity.valueMissing?e.setCustomValidity("Обязательное поле"):t<i[window.formValidation.typeOfHouse]?e.setCustomValidity("Минимальная цена "+i[window.formValidation.typeOfHouse]):t>1e6?e.setCustomValidity("Максимальная цена 1000000"):e.setCustomValidity(""),e.reportValidity()},valueLength:(e,t,n)=>{let o=e.value.length;o<t?e.setCustomValidity(`Ещё хотя бы ${t-o} знака(ов)`):o>n?e.setCustomValidity(`Слишком длинно. Удалите лишние ${o-n} знака(ов)`):e.setCustomValidity(""),e.reportValidity()}}})(),(()=>{const e=window.constants.MAP.querySelector(".map__filters"),t=e.children,n=document.querySelector(".ad-form"),o=n.children,i=n.querySelector("#address"),a=n.querySelector("#room_number"),r=n.querySelector("#capacity"),s=n.querySelector(".ad-form__reset"),d=n.querySelector(".ad-form__submit"),c=n.querySelectorAll("input"),l=n.querySelector("#title"),w=n.querySelector("#type"),p=n.querySelector("#price"),m=n.querySelector("#timein"),u=n.querySelector("#timeout"),f=n.querySelector("#avatar"),y=n.querySelector("#images"),_=n.querySelector(".ad-form-header__preview img"),v=n.querySelector(".ad-form__photo"),E=document.querySelector("#success"),h=document.querySelector("#error"),S=e=>{e.preventDefault();const t=window.constants.pageMain.querySelector(".success");window.constants.pageMain.removeChild(t),document.removeEventListener("click",S),document.removeEventListener("keydown",g)},g=e=>{e.key===window.constants.ESC_KEY&&S(e)},P=()=>{const e=h.content.cloneNode(!0),t=e.querySelector(".error__button");document.addEventListener("click",L),document.addEventListener("keydown",q),t.addEventListener("click",L),window.constants.pageMain.appendChild(e)},L=e=>{e.preventDefault();const t=window.constants.pageMain.querySelector(".error"),n=t.querySelector(".error__button");window.constants.pageMain.removeChild(t),document.removeEventListener("click",L),document.removeEventListener("keydown",q),n.removeEventListener("click",L)},q=e=>{e.key===window.constants.ESC_KEY&&L(e)},T=e=>{e===m?u.value=m.value:m.value=u.value},O=(e,t)=>{const n=e.files[0],o=n.name.toLowerCase();if(window.constants.IMAGE_TYPES.some((e=>o.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{t.src=e.result})),e.readAsDataURL(n)}};n.action="https://21.javascript.pages.academy/keksobooking",i.readOnly=!0,window.pin.setCoordinates(!1),a.addEventListener("change",(e=>{window.formValidation.typeOfRoom=e.target.value,window.formValidation.typeOfCapacity(r)})),r.addEventListener("change",(e=>{window.formValidation.typeOfCapacity(e.target)})),s.addEventListener("click",(()=>{n.reset(),e.reset(),window.page.disactivate()})),l.required=!0,l.minLength=30,l.maxLength=100,l.addEventListener("input",(e=>{window.formValidation.valueLength(e.target,30,100)})),p.required=!0,p.max=1e6,p.placeholder=window.formValidation.priceOfType[window.formValidation.typeOfHouse],p.addEventListener("input",(e=>{window.formValidation.price(e.target)})),w.addEventListener("change",(()=>{window.formValidation.typeOfHouse=w.value,p.placeholder=window.formValidation.priceOfType[window.formValidation.typeOfHouse],p.min=window.formValidation.priceOfType[window.formValidation.typeOfHouse],window.formValidation.price(p)})),f.accept="image/*",y.accept="image/*",f.addEventListener("change",(()=>{O(f,_)})),y.addEventListener("change",(()=>{const e=document.createElement("img");e.style.width="100%",e.style.height="auto",e.alt="Фотография жилья",O(y,e),v.innerHTML="",v.appendChild(e)})),m.addEventListener("change",(e=>{T(e.target)})),u.addEventListener("change",(e=>{T(e.target)})),d.addEventListener("click",(()=>{c.forEach((e=>{e.validity.valid?e.style=window.formValidation.nonNotice:e.style=window.formValidation.errorNotice}))})),n.addEventListener("submit",(t=>{window.server.upload(new FormData(n),(()=>{e.reset(),n.reset(),window.page.disactivate(),(()=>{const e=E.content.cloneNode(!0);document.addEventListener("click",S),document.addEventListener("keydown",g),window.constants.pageMain.appendChild(e)})()}),P),t.preventDefault()})),window.form={filter:e,filterElements:t,advert:n,advertElements:o,addressInput:i,syncInOutTime:T}})(),(()=>{const e="any",t={TYPE:window.form.filter.querySelector("#housing-type"),PRICE:window.form.filter.querySelector("#housing-price"),ROOMS:window.form.filter.querySelector("#housing-rooms"),GUESTS:window.form.filter.querySelector("#housing-guests"),FEATURES:window.form.filter.querySelector("#housing-features")},n=e=>Array.from(t.FEATURES.querySelectorAll(".map__checkbox:checked")).every((t=>e.offer.features.some((e=>t.value===e))));window.form.filter.addEventListener("change",window.util.debounce((o=>{window.card.onClose(o),window.map.fillElement((o=>{let i=(n=>t.TYPE.value===e?n:n.filter((e=>e.offer.type===t.TYPE.value)))(o);return i=(n=>{let o=n;switch(t.PRICE.value){case e:break;case"low":o=o.filter((e=>e.offer.price<=9999));break;case"middle":o=o.filter((e=>e.offer.price>9999&&e.offer.price<=5e4));break;case"high":o=o.filter((e=>e.offer.price>5e4))}return o})(i),i=(n=>t.ROOMS.value===e?n:n.filter((e=>e.offer.rooms===parseInt(t.ROOMS.value,10))))(i),i=(n=>t.GUESTS.value===e?n:n.filter((e=>e.offer.guests===parseInt(t.GUESTS.value,10))))(i),i=(e=>e.filter(n))(i),i})(window.server.loadedOffers))})))})(),window.page.disactivate(),window.constants.mainPin.addEventListener("mousedown",window.pin.onMove),window.pin.MAP_PINS.addEventListener("click",(e=>{e.preventDefault(),window.pin.onClick(e)}))})();