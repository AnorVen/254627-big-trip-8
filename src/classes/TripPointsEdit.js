import Component from './Component';
import moment from 'moment';
import flatpickr from 'flatpickr';
import {POINT_VARIABLES} from '../Database';

export class TripPointEdit extends Component {
  constructor({id, icon, title, timestart, timeend, price, offers}) {
    super();
    this._id = id;
    this._icon = icon;
    this._title = title;
    this._timestart = timestart;
    this._timeend = timeend;
    this._price = price;
    this._offers = offers;
    this._element = null;
  }
  bind() {
    this._element.querySelector(`form`).addEventListener(`submit`, this._onSaveButtonClick.bind(this));
    this._element.querySelector(`form`).addEventListener(`reset`, this._onResetButtonClick.bind(this));
    this._element.querySelector(`.travel-way__select`).addEventListener(`click`, this.onIconChange.bind(this));

    // Date Input
    const dateInput = this._element.querySelector(`.point__date .point__input`);
    dateInput.flatpickr({
      dateFormat: `m d`,
      mode: `range`,
      defaultDate: moment(this._timestart).format(`MM DD`),
      onChange: (dateObj) => {
        dateInput.dataset.date = dateObj.toString();
      }
    });

    // Time Range
    this._element.querySelector(`.point__time .point__input`).flatpickr({
      locale: {
        rangeSeparator: ` — `
      },
      mode: `range`,
      enableTime: true,
      dateFormat: `H:i`,
      time_24hr: true,
      defaultDate: [moment(this._timestart).format(`HH:MM YYYY MM DD `),
        moment(this._timeend).format(`HH:MM YYYY MM DD `)],
      minuteIncrement: 10,
      onClose: (dateObj) => {
        this._timestart = dateObj[0];
        this._timeend = dateObj[1];
        this.reRender();
      }
    });
  }


  unbind() {
    this._element.querySelector(`form`).removeEventListener(`submit`, this._onSaveButtonClick.bind(this));
    this._element.querySelector(`form`).removeEventListener(`reset`, this._onResetButtonClick.bind(this));

    this._element.querySelector(`.travel-way__select`).removeEventListener(`click`, this.onIconChange.bind(this));

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
  _onSaveButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
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
  get template() {
    return (` <article class="point">
         <div><p>${moment(this._timestart).format(`DD MM HH:mm`)}</p>
              <p>${moment(this._timeend).format(`DD MM HH:mm`)}</p></div>
    
          <form action="" method="get">
            <header class="point__header">
    
             <input type="hidden" class="visually-hidden" value="${this._id}">
              <label class="point__date">
                choose day
                <input class="point__input" type="text" placeholder="MAR 18" name="day">
              </label>

              <div class="travel-way">
                <label class="travel-way__label" for="travel-way__toggle">${POINT_VARIABLES.icon[this._icon.toLowerCase()]}️</label>

                <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

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
                <input class="point__destination-input" list="destination-select" id="destination" value="Chamonix" name="destination">
                <datalist id="destination-select">
                  <option value="airport"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                  <option value="hotel"></option>
                </datalist>
              </div>

              <label class="point__time">
                choose time
                <input class="point__input" type="text" value="00:00 — 00:00" name="time" placeholder="00:00 — 00:00">
              </label>

              <label class="point__price">
                write price
                <span class="point__price-currency">€</span>
                <input class="point__input" type="text" value="160" name="price">
              </label>

              <div class="point__buttons">
                <button class="point__button point__button--save" type="submit">Save</button>
                <button class="point__button" type="reset">Delete</button>
              </div>

              <div class="paint__favorite-wrap">
                <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
                <label class="point__favorite" for="favorite">favorite</label>
              </div>
            </header>

            <section class="point__details">
              <section class="point__offers">
                <h3 class="point__details-title">offers</h3>

                <div class="point__offers-wrap">
                  <input class="point__offers-input visually-hidden" type="checkbox" id="add-luggage" name="offer" value="add-luggage">
                  <label for="add-luggage" class="point__offers-label">
                    <span class="point__offer-service">Add luggage</span> + €<span class="point__offer-price">30</span>
                  </label>

                  <input class="point__offers-input visually-hidden" type="checkbox" id="switch-to-comfort-class" name="offer" value="switch-to-comfort-class">
                  <label for="switch-to-comfort-class" class="point__offers-label">
                    <span class="point__offer-service">Switch to comfort class</span> + €<span class="point__offer-price">100</span>
                  </label>

                  <input class="point__offers-input visually-hidden" type="checkbox" id="add-meal" name="offer" value="add-meal">
                  <label for="add-meal" class="point__offers-label">
                    <span class="point__offer-service">Add meal </span> + €<span class="point__offer-price">15</span>
                  </label>

                  <input class="point__offers-input visually-hidden" type="checkbox" id="choose-seats" name="offer" value="choose-seats">
                  <label for="choose-seats" class="point__offers-label">
                    <span class="point__offer-service">Choose seats</span> + €<span class="point__offer-price">5</span>
                  </label>
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


  _offerRender(arr) {

    if (arr.length > 2) {
      let newItems = [];
      for (let i = 0; i < Math.round(Math.random() * 2); i++) {
        let idx = Math.floor(Math.random() * arr.length);
        newItems.push(arr[idx]);
        arr.splice(idx, 1);
      }
      arr = newItems;
    }
    let offers = `<ul class="trip-point__offers">`;
    for (let offer of arr) {
      offers += `<li><button class="trip-point__offer">`;
      offers += offer;
      offers += `</button></li>`;
    }
    offers += `</ul>`;
    return offers;
  }


  _timeSectionRender(timeShift, duration) {
    let timeStart = new Date(timeShift);
    let durationTemp = new Date(duration);
    let endTime = new Date(timeShift + duration);

    let timeStartHours = timeStart.getHours();
    let timeStartMinutes = timeStart.getMinutes();
    let timeEndHours = endTime.getHours();
    let timeEndMinutes = endTime.getMinutes();
    let durationHours = durationTemp.getUTCHours();
    let durationMinutes = durationTemp.getMinutes();
    return `<span class="trip-point__timetable">${timeStartHours}:${timeStartMinutes}&nbsp;&mdash; ${timeEndHours}:${timeEndMinutes}</span>
            <span class="trip-point__duration">${durationHours.toLocaleString()}h ${durationMinutes.toLocaleString()}m</span>`;
  }
}
