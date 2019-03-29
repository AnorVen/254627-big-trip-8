import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format'; // без этого не запускается плагин для момента
import Component from './Component';
import {POINT_VARIABLES} from '../Database';
export class TripPoint extends Component {
  constructor({id, icon, title, timestart, timeend, price, offers, isFavorite}) {
    super();
    this._id = id;
    this._icon = icon;
    this._title = title;
    this._timestart = timestart;
    this._timeend = timeend;
    this._price = price;
    this._offers = offers;
    this._isFavorite = isFavorite;

    this._element = null;
    this._onEdit = null;
    this._state.price = price;
    this._state.offers = offers;

    this.fullPrice = this.fullPrice.bind(this);
    this.offersPrice = this.offersPrice.bind(this);
  }
  bind() {
    this._element.addEventListener(`click`, this._onEditButtonClick.bind(this));
  }
  unbind() {
    this._element.removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }
  update(data) {
    this._id = data.id;
    this._icon = data.icon;
    this._title = data.title;
    this._timestart = data.timestart;
    this._timeend = data.timeend;
    this._offers = data.offers;
    this._isFavorite = data.isFavorite;
    this._state.offers = data.offers;
    this._state.price = data.price;
  }


  get template() {
    return (`<article class="trip-point"> 
    <i class="trip-icon" >${POINT_VARIABLES.icon[this._icon.toLowerCase()]} </i>
    <input type="hidden" class="visually-hidden" value="${this._id}">
    <h3 class="trip-point__title" >${this._icon} to ${this._title}</h3>
    <p class="trip-point__schedule" >
      ${this._timeSectionRender(this._timestart, this._timeend)}
    </p>
    <p  class = "trip-point__price" > &euro; &nbsp; ${this.fullPrice()}</p>
    ${this._offerRender(this._offers)}</article>`.trim());
  }

  _offerRender(obj) {
    if (typeof obj === `object`) {
      let tempHTML = `<ul class="trip-point__offers">`;
      for (let item in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, item)) {
          if (obj[item].isChecked) {
            tempHTML += `<li><button class="trip-point__offer">${obj[item].title} + €${obj[item].price}</button></li>`;
          }
        }
      }
      tempHTML += `</ul>`;
      return tempHTML;
    }
    return ``;
  }


  offersPrice() {
    if (this._state.offers) {
      return Object.keys(this._state.offers).reduce((acc, offer) => {
        if (this._state.offers[offer].isChecked) {
          return acc + parseInt(this._state.offers[offer].price, 10);
        }
        return acc;
      }, 0);
    }
    return 0;
  }

  fullPrice() {
    if (this._state.offers) {
      return parseInt(this._state.price, 10) + this.offersPrice();
    }
    return this._state.price;

  }

  _timeSectionRender(timestart, timeend) {
    let timeStart = moment(timestart).format(`HH:mm`);
    let timeEnd = moment(timeend).format(`HH:mm`);
    let timeShift = moment.duration(moment(timeend).diff(moment(timestart))).format(`hh[h]: mm[m]`);


    return `<span class="trip-point__timetable">${timeStart} &nbsp;&mdash; ${timeEnd}</span>
            <span class="trip-point__duration">${timeShift}</span>`;
  }
}
