import Component from './Component';
import moment from 'moment';
import flatpickr from 'flatpickr';
import {POINT_VARIABLES} from '../Database';

export class TripPointEdit extends Component {
  constructor({id, icon, title, timestart, timeend, price, offers, isFavorite}) {
    super();
    this._id = id;
    this._icon = icon;
    this._title = title;
    this._timestart = timestart;
    this._timeend = timeend;
    this._price = price;
    this._offers = offers;
    this._element = null;
    this._isFavorite = isFavorite;

    this._journeyPoint = POINT_VARIABLES.title;
  }
  bind() {
    this._element.querySelector(`form`)
      .addEventListener(`submit`, this._onSaveButtonClick.bind(this));
    this._element.querySelector(`form`)
      .addEventListener(`reset`, this._onResetButtonClick.bind(this));
    this._element.querySelector(`.travel-way__select`)
      .addEventListener(`click`, this.onIconChange.bind(this));
    this._element.querySelector(`.point__destination-input`)
      .addEventListener(`change`, this.onTitleChange.bind(this));
    // Date Input
    flatpickr(
        this._element.querySelector(`.point__date .point__input`),
        {
          dateFormat: `m d`,
          mode: `range`,
          defaultDate: moment(this._timestart).format(`MM DD`),
          onChange: (dateObj) => {
            console.log(dateObj);
          }
        });

    // Time Range
    flatpickr(
        this._element.querySelector(`.point__time .point__input`),
        {
          locale: {
            rangeSeparator: ` — `
          },
          enableTime: true,
          dateFormat: `H:i`,
          mode: `range`,
          time_24hr: true,
          defaultDate: [moment(this._timestart).format(`HH:mm YYYY MM DD`),
            moment(this._timeend).format(`HH:mm YYYY MM DD`)],
          minuteIncrement: 10,
          onClose: (dateObj) => {
            this._timestart = dateObj[0];
            this._timeend = dateObj[1];
            this.reRender();
          }
        });
  }


  unbind() {
    this._element.querySelector(`form`)
      .removeEventListener(`submit`, this._onSaveButtonClick.bind(this));
    this._element.querySelector(`form`)
      .removeEventListener(`reset`, this._onResetButtonClick.bind(this));
    this._element.querySelector(`.travel-way__select`)
      .removeEventListener(`click`, this.onIconChange.bind(this));

  }

  onTitleChange(e) {
    this._title = e.target.value;
    this.reRender();
  }
  onIconChange(e) {
    if (e.target.tagName === `INPUT`) {
      this._icon = e.target.value;
      this.reRender();
    }
  }
  reRender() {
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  update(data) {
    this._id = data.id;
    this._icon = data.icon;
    this._title = data.title;
    this._timestart = data.timestart;
    this._timeend = data.timeend;
    this._price = data.price;
    this._offers = data.offers;
    this._timeShift = data.timeShift;
    this._isFavorite = data.isFavorite;

  }


  _onResetButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }
  set onSubmit(fn) {
    this._onSubmit = fn;
  }


  _onSaveButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.tripPointForm`));
    const newData = this._processForm(formData);
    debugger
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  _processForm(formData) {
    const entry = {
      id: ``,
      title: ``,
      icon: ``,
      offers: this._offers,
      timestart: ``,
      timeend: ``,
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
      timestart: (value) => (target.timestart = moment(value).unix() * 1000),
      timeend: (value) => (target.timeend = moment(value).unix() * 1000),
      price: (value) => (target.price = value),
      iconText: (value) => (target.icon = value),
      favorite: (value) => (target.isFavorite = value),
      offer: (value) => (target.offers[value].isChecked = true)
    };
  }

  get template() {
    return (` <article class="point">
         <div><p>${moment(this._timestart).format(`DD MM YY HH:mm`)}</p>
              <p>${moment(this._timeend).format(`DD MM YY HH:mm`)}</p></div>
    
          <form action="" method="get" class="tripPointForm">
            <header class="point__header">
              <input type="hidden" class="visually-hidden" name="id" value="${this._id}">
              <label class="point__date">
                choose day
                <input class="point__input" type="text" placeholder="MAR 18" name="day">
              </label>

              <div class="travel-way">
              <input type="hidden" value="${this._icon}" name="iconText">
                <label 
                  class="travel-way__label" 
                  for="travel-way__toggle-${this._id}">
                    ${POINT_VARIABLES.icon[this._icon.toLowerCase()]}️</label>

                <input 
                  type="checkbox" 
                  class="travel-way__toggle visually-hidden" 
                  name="icon"
                  value="${this._icon}"
                  id="travel-way__toggle-${this._id}">
                  

                <div class="travel-way__select">
                  <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" 
                  type="radio" 
                  ${this._icon === `flight` && `checked`}
                  value="taxi"
                  id="travel-way-taxi-${this._id}" 
                  name="travel-way-${this._id}">
                   
                      <label class="travel-way__select-label"
                   for="travel-way-taxi-${this._id}">🚕 taxi</label>

                    <input class="travel-way__select-input visually-hidden" 
                      type="radio" 
                      id="travel-way-bus-${this._id}" 
                      name="travel-way-${this._id}" 
                         ${this._icon === `bus` && `checked`}
                        value="bus">
                      <label class="travel-way__select-label"
                       for="travel-way-bus-${this._id}">🚌 bus</label>

                    <input class="travel-way__select-input visually-hidden" 
                      type="radio" 
                      id="travel-way-train-${this._id}"
                      name="travel-way-${this._id}" 
                      value="train"
                        ${this._icon === `train` && `checked`}
                        >
                      <label class="travel-way__select-label"
                        for="travel-way-train-${this._id}">🚂 train</label>
                      
                    <input class="travel-way__select-input visually-hidden"
                      type="radio"
                       id="travel-way-flight-${this._id}" 
                       name="travel-way-${this._id}" 
                       value="flight"
                       ${this._icon === `flight` && `checked`}
                       >
                    <label class="travel-way__select-label" 
                    for="travel-way-flight-${this._id}">✈️ flight</label>
                  </div>

                  <div class="travel-way__select-group">
                    <input class="travel-way__select-input visually-hidden" 
                      type="radio" 
                      id="travel-way-check-in-${this._id}" 
                      name="travel-way-${this._id}" 
                         ${this._icon === `checkin` && `checked`}
                      value="checkin">
                    <label class="travel-way__select-label" 
                      for="travel-way-check-in-${this._id}">🏨 check-in</label>

                    <input class="travel-way__select-input visually-hidden" 
                      type="radio" id="travel-way-sightseeing-${this._id}" 
                      name="travel-way-${this._id}" 
                         ${this._icon === `sightseeing` && `checked`}
                      value="sightseeing">
                    <label class="travel-way__select-label" 
                      for="travel-way-sightseeing-${this._id}">🏛 sightseeing</label>
                  </div>
                </div>
              </div>

              <div class="point__destination-wrap">
                <label class="point__destination-label" for="destination">${this._icon} to</label>
                <input class="point__destination-input" list="destination-select"
                 id="destination" value="${this._title}"
                  name="destination">
                <datalist id="destination-select">
                ${this._journeyPoint.map((item)=>(`<option value="${item}"></option>`).trim()).join(``)}           
                </datalist>
              </div>

              <label class="point__time">
                choose time
                <input class="point__input" type="text" value="00:00 — 00:00" name="time" placeholder="00:00 — 00:00">
                <input type="hidden" name="timestart" value="${moment(this._timestart).format()}">
                <input type="hidden" name="timeend" value="${moment(this._timeend).format()}">
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
                  ${this._offerRender(this._offers)}
                </div>

              </section>
              <section class="point__destination">
                <h3 class="point__details-title">Destination</h3>
                <p class="point__destination-text">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>
                <div class="point__destination-images">
                  <img src="http://picsum.photos/330/140?r=123" alt="picture from place" class="point__destination-image">
                  <img src="http://picsum.photos/300/200?r=1234" alt="picture from place" class="point__destination-image">
                  <img src="http://picsum.photos/300/100?r=12345" alt="picture from place" class="point__destination-image">
                  <img src="http://picsum.photos/200/300?r=123456" alt="picture from place" class="point__destination-image">
                  <img src="http://picsum.photos/100/300?r=1234567" alt="picture from place" class="point__destination-image">
                </div>
              </section>
              <input type="hidden" class="point__total-price" name="total-price" value="">
            </section>
          </form>
        </article>`.trim());
  }


  _offerRender(obj) {
    let tempHTML = ``;
    for (let item in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, item)) {
        tempHTML += `
        <input class="point__offers-input visually-hidden" 
          type="checkbox" 
          id="${item}-${this._id}" 
          name="offer" 
          value="${item}" 
          ${obj[item].isChecked ? `checked` : null} >
        <label for="${item}-${this._id}" 
          class="point__offers-label">
         <span class="point__offer-service">${obj[item].title}</span> + €<span 
          class="point__offer-price">${obj[item].price || 0}</span>
                  </label>`;

      }
    }
    return tempHTML;
  }
}
