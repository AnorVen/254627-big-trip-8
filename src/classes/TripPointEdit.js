import Component from './Component';
import moment from 'moment';
import flatpickr from 'flatpickr';
import {POINT_VARIABLES} from '../Database';

class TripPointEdit extends Component {
  constructor({id, icon, destination, timeStart, timeEnd, price, offers, isFavorite, title, destinations, newOffers}) {
    super();
    this._id = id;
    this._icon = icon;
    this._title = title;
    this._timeStart = timeStart;
    this._timeEnd = timeEnd;
    this._price = price;
    this._offers = offers;
    this._element = null;
    this._isFavorite = isFavorite;

    this._state.offers = offers;
    this._state.icon = icon;
    this._destination = destination;
    this._pictures = this._destination.pictures;
    this._destinationDesc = this._destination.description;
    this._destinationTitle = this._destination.name;

    this._newOffers = newOffers;
    this._destinations = destinations;

    this._onDelete = null;
    this.handleApiError = this.handleApiError.bind(this);
    this.flatpickrDate = {};
    this.flatpickrTimeStart = {};
    this.flatpickrTimeEnd = {};
  }

  bind() {
    this._element.querySelector(`form`)
      .addEventListener(`submit`, this._onSaveButtonClick.bind(this));
    this._element.querySelector(`form`)
      .addEventListener(`reset`, this._onResetButtonClick.bind(this));
    this._element.querySelector(`.travel-way__select`)
      .addEventListener(`click`, this._onIconChange.bind(this));
    this._element.querySelector(`.point__destination-input`)
      .addEventListener(`change`, this._onTitleChange.bind(this));
    this._element.querySelector(`.point__offers-wrap`)
      .addEventListener(`change`, this._onChangeOffers.bind(this));
    this._element.querySelector(`#destination`)
      .addEventListener(`change`, this._destinationChangeHandler.bind(this));
    this.flatpickrTimeStart = flatpickr(this._element.querySelector(`.point__time .date__start`),
        {
          enableTime: true,
          noCalendar: false,
          altInput: true,
          [`time_24hr`]: true,
          altFormat: `H:i`,
          dateFormat: `Y-m-d H:i`,
          onClose: (dateObj) => {
            this._timeStart = Date.parse(dateObj);
            this._reRender();
          },
        });
    this.flatpickrTimeEnd = flatpickr(this._element.querySelector(`.point__time .date__end`),
        {
          enableTime: true,
          [`time_24hr`]: true,
          noCalendar: false,
          minDate: this._timeStart,
          altInput: true,
          altFormat: `H:i`,
          dateFormat: `Y-m-d H:i`,
          onClose: (dateObj) => {
            this._timeEnd = Date.parse(dateObj);
            this._reRender();
          },
        });
  }

  unbind() {
    this._element.querySelector(`form`)
      .removeEventListener(`submit`, this._onSaveButtonClick.bind(this));
    this._element.querySelector(`form`)
      .removeEventListener(`reset`, this._onResetButtonClick.bind(this));
    this._element.querySelector(`.travel-way__select`)
      .removeEventListener(`click`, this._onIconChange.bind(this));
    this._element.querySelector(`.point__destination-input`)
      .removeEventListener(`change`, this._onTitleChange.bind(this));
    this._element.querySelector(`.point__offers-wrap`)
      .removeEventListener(`change`, this._onChangeOffers.bind(this));
    this._element.querySelector(`#destination`)
      .removeEventListener(`change`, this._destinationChangeHandler.bind(this));
    this.flatpickrTimeStart.destroy();
    this.flatpickrTimeEnd.destroy();
  }

  _onResetButtonClick(evt) {
    evt.preventDefault();
    this._element.classList.remove(`shake`);
    let buttonReset = evt.target
      .querySelector(`.point__buttons button.point__button[type="reset"]`);
    let buttonSave = evt.target
      .querySelector(`.point__buttons button.point__button[type="submit"]`);
    buttonReset.disabled = true;
    buttonSave.disabled = true;
    buttonReset.innerHTML = `Deleting...`;
    if (typeof this._onDelete === `function`) {
      this.unbind();
      this._onDelete();
    }

    buttonReset.innerHTML = `Delete`;
    buttonReset.disabled = false;
    buttonSave.disabled = false;
  }

  _destinationChangeHandler(evt) {
    if (this._destinations.some((item) => item.name === evt.target.value)) {
      this._destination = this._destinations.filter((item) => item.name === evt.target.value)[0];
    }
    this._pictures = this._destination.pictures;
    this._destinationDesc = this._destination.description;
    this._destinationTitle = this._destination.name;
    this._reRender();
  }


  _onChangeOffers(evt) {
    evt.preventDefault();
    this._state.offers.map((item) => {
      if (item.title === evt.target.value) {
        item.accepted = evt.target.checked;
      }
    });
  }

  _onTitleChange(evt) {
    this._title = evt.target.value.replace(/[&<>"']/g, ``);
    this._reRender();
  }

  _onIconChange(evt) {
    if (evt.target.tagName === `INPUT`) {
      let target = evt.target.value;
      if (this._newOffers.some((item) => item.type === target)) {
        let newOffer = this._newOffers.filter((item) => item.type === target)[0];
        this._state.offers = newOffer.type === this._icon ?
          newOffer.offers.concat(this._offers) : newOffer.offers;
        this._state.icon = newOffer.type;
      }
      this._reRender();
    }
  }

  handleApiError() {
    this._element.classList.add(`shake`);
  }

  _reRender() {
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _onSaveButtonClick(evt) {
    evt.preventDefault();
    this._element.classList.remove(`shake`);
    let buttonSave = evt.target
      .querySelector(`.point__buttons button.point__button[type="submit"]`);
    let buttonReset = evt.target
      .querySelector(`.point__buttons button.point__button[type="reset"]`);
    buttonSave.disabled = true;
    buttonReset.disabled = true;
    buttonSave.innerHTML = `Saving...`;
    const formData = new FormData(this._element.querySelector(`.tripPointForm`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
    buttonSave.innerHTML = `Save`;
    buttonSave.disabled = false;
    buttonReset.disabled = false;
  }

  _renderOffer(arr) {
    return arr.map((item) => (
      `<input class="point__offers-input visually-hidden" 
          type="checkbox" 
          id="${item.title.toLowerCase().split(` `).join(``)}-${this._id}" 
          name="offer" 
          value="${item.title}" 
          ${item.accepted && `checked`} >
        <label for="${item.title.toLowerCase().split(` `).join(``)}-${this._id}" 
          class="point__offers-label">
         <span class="point__offer-service">${item.title}</span> + €<span 
          class="point__offer-price">${item.price || 0}</span>
                  </label>`.trim())).join(``);
  }


  _processForm(formData) {
    const entry = {
      id: ``,
      destination: ``,
      icon: ``,
      offers: this._state.offers,
      timeStart: ``,
      timeEnd: ``,
      price: 0,
      isFavorite: false,
    };
    const TripPointEditMapper = TripPointEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (TripPointEditMapper[property]) {
        TripPointEditMapper[property](value);
      }
    }
    return entry;
  }

  static createMapper(target) {
    return {
      id: (value) => (target.id = value),
      destination: (value) => (target.title = value),
      timeStart: (value) => {
        target.timeStart = value ? Date.parse(moment(value, `YYYY-MM-DD HH:mm`).toDate())
          : ``;
      },
      timeEnd: (value) => {
        target.timeEnd = value ? Date.parse(moment(value, `YYYY-MM-DD HH:mm`).toDate())
          : ``;
      },
      price: (value) => (target.price = value),
      iconText: (value) => (target.icon = value),
      favorite: (value) => (target.isFavorite = value),
      offer: (value) => (target.offers.map((item) => {
        if (item.title === value) {
          item.accepted = true;
        }
      })),
    };
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return (`<article class="point ${this._id}">
         <div>    
          <form action="" method="get" class="tripPointForm">
            <header class="point__header">
              <input type="hidden" class="visually-hidden" name="id" value="${this._id}">
              <label class="point__date">
                choose day
                <input class="point__input" type="text" placeholder="MAR 18" name="day">
              </label>
              <div class="travel-way">
              <input type="hidden" value="${this._state.icon}" name="iconText">
                <label 
                  class="travel-way__label" 
                  for="travel-way__toggle-${this._id}">
                    ${POINT_VARIABLES.icon[this._state.icon.toLowerCase().split(`-`).join(``)]}️</label>

                <input 
                  type="checkbox" 
                  class="travel-way__toggle visually-hidden" 
                  name="icon"
                  value="${this._state.icon}"
                  id="travel-way__toggle-${this._id}">
                  

                <div class="travel-way__select">
                  <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" 
                  type="radio" 
                  ${this._state.icon === `flight` && `checked`}
                  value="taxi"
                  id="travel-way-taxi-${this._id}" 
                  name="travel-way-${this._id}">
                   
                      <label class="travel-way__select-label"
                   for="travel-way-taxi-${this._id}">🚕 taxi</label>

                    <input class="travel-way__select-input visually-hidden" 
                      type="radio" 
                      id="travel-way-bus-${this._id}" 
                      name="travel-way-${this._id}" 
                         ${this._state.icon === `bus` && `checked`}
                        value="bus">
                      <label class="travel-way__select-label"
                       for="travel-way-bus-${this._id}">🚌 bus</label>

                    <input class="travel-way__select-input visually-hidden" 
                      type="radio" 
                      id="travel-way-train-${this._id}"
                      name="travel-way-${this._id}" 
                      value="train"
                        ${this._state.icon === `train` && `checked`}
                        >
                      <label class="travel-way__select-label"
                        for="travel-way-train-${this._id}">🚂 train</label>
                      
                    <input class="travel-way__select-input visually-hidden"
                      type="radio"
                       id="travel-way-flight-${this._id}" 
                       name="travel-way-${this._id}" 
                       value="flight"
                       ${this._state.icon === `flight` && `checked`}
                       >
                    <label class="travel-way__select-label" 
                    for="travel-way-flight-${this._id}">✈️ flight</label>
                  </div>

                  <div class="travel-way__select-group">
                    <input class="travel-way__select-input visually-hidden" 
                      type="radio" 
                      id="travel-way-check-in-${this._id}" 
                      name="travel-way-${this._id}" 
                         ${this._state.icon === `checkin` && `checked`}
                      value="check-in">
                    <label class="travel-way__select-label" 
                      for="travel-way-check-in-${this._id}">🏨 check-in</label>

                    <input class="travel-way__select-input visually-hidden" 
                      type="radio" id="travel-way-sightseeing-${this._id}" 
                      name="travel-way-${this._id}" 
                         ${this._state.icon === `sightseeing` && `checked`}
                      value="sightseeing">
                    <label class="travel-way__select-label" 
                      for="travel-way-sightseeing-${this._id}">🏛 sightseeing</label>
                  </div>
                </div>
              </div>

              <div class="point__destination-wrap">
                <label class="point__destination-label" for="destination">${this._state.icon} to</label>
                <input class="point__destination-input" list="destination-select"
                 id="destination" value="${this._title}"
                  name="destination">
                <datalist id="destination-select">
                ${this._destinations.map((item) => (`<option value="${item.name}"></option>`).trim()).join(``)}           
                </datalist>
              </div>

             <label class="point__time">
                    choose time
                    <input class="point__input date__start" type="text"  value="${moment(this._timeStart).format(`YYYY-MM-DD HH:mm`)}" name="timeStart" placeholder="${moment(this._timeStart).format(`HH:mm`)}">
                    <input class="point__input date__end" type="text"  value="${moment(this._timeEnd).format(`YYYY-MM-DD HH:mm`)}" name="timeEnd" placeholder="${moment(this._timeEnd).format(`HH:mm`)}">
                  </label>

              <label class="point__price">
                write price
                <span class="point__price-currency">€</span>
                <input class="point__input" type="text" value="${this._price}" name="price">
              </label>

              <div class="point__buttons">
                <button class="point__button point__button--save" type="submit">Save</button>
                <button class="point__button" type="reset">Delete</button>
              </div>

              <div class="paint__favorite-wrap">
                <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite && `checked`}>
                <label class="point__favorite" for="favorite">favorite</label>
              </div>
            </header>

            <section class="point__details">
              <section class="point__offers">
                <h3 class="point__details-title">offers</h3>

                <div class="point__offers-wrap">
                  ${this._renderOffer(this._state.offers)}
                </div>

              </section>
              <section class="point__destination">
                <h3 class="point__details-title">Destination ${this._destinationTitle}</h3>
                <p class="point__destination-text">${this._destinationDesc}</p>
                <div class="point__destination-images">
                ${this._pictures.map((item) => (`<img src="${item.src}" alt="${item.description}" class="point__destination-image">`.trim())).join(``)}
                </div>
              </section>
              <input type="hidden" class="point__total-price" name="total-price" value="">
            </section>
          </form>
          </div>
        </article>`.trim());
  }

  update(data) {
    this._id = data.id;
    this._icon = data.icon;
    this._state.icon = data.icon;
    this._title = data.title;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._offers = data.offers;
    this._state.offers = data.offers;
    this._isFavorite = data.isFavorite;
  }
}

export default TripPointEdit;
