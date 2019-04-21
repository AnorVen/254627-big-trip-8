import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormatSetup from 'moment-duration-format'; // без этого не запускается плагин для момента
import Component from './Component';
import {POINT_VARIABLES} from '../Database';
momentDurationFormatSetup(moment);
export class TripPoint extends Component {
  constructor({id, icon, offers = [], timeStart, timeEnd, price, isFavorite, title, newOffers}) {
    super();
    this._id = id;
    this._icon = icon;
    this._title = title;
    this._timeStart = timeStart;
    this._timeEnd = timeEnd;
    this._price = price;
    this._offers = offers;
    this._isFavorite = Boolean(isFavorite);
    this._element = null;
    this._onEdit = null;
    this._state.price = price;
    this._state.offers = offers;
    this._newOffers = newOffers;
    this.calculateFullPrice = this.calculateFullPrice.bind(this);
    this.calculateOffersPrice = this.calculateOffersPrice.bind(this);
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
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._offers = data.offers;
    this._isFavorite = data.isFavorite;
    this._state.offers = data.offers;
    this._state.price = data.price;

  }


  get template() {
    return (`<article class="trip-point"> 
    <i class="trip-icon" >${POINT_VARIABLES.icon[this._icon.toLowerCase().split(`-`).join(``)]} </i>
    <input type="hidden" class="visually-hidden" value="${this._id}">
    <h3 class="trip-point__title" >${this._icon} to ${this._title}</h3>
    <p class="trip-point__schedule" >
      ${this._renderTimeSection(this._timeStart, this._timeEnd)}
    </p>
    <p  class = "trip-point__price" > &euro; &nbsp; ${this.calculateFullPrice()}</p>
    ${this._renderOffers(this._offers)}</article>`.trim());
  }

  _renderOffers(arr) {
    let filteredOffers = arr.filter((item)=>(item.accepted));
    if (filteredOffers.length > 2) {
      filteredOffers = [filteredOffers[0], filteredOffers[1]];
    }
    let tempHTML = `<ul class="trip-point__offers">`;
    tempHTML += filteredOffers.map((item)=>(
      `<li><button class="trip-point__offer">${item.title} + €${item.price}</button></li>`.trim()
    )).join(``);
    tempHTML += `</ul>`;
    return tempHTML;
  }


  calculateOffersPrice() {
    if (this._state.offers) {
      return this._state.offers.filter((item)=>(item.accepted))
        .reduce((acc, offer) => {
          return acc + parseInt(offer.price, 10);
        }, 0);
    }
    return 0;
  }

  calculateFullPrice() {
    if (this._state.offers) {
      return parseInt(this._state.price, 10) + this.calculateOffersPrice();
    }
    return this._state.price;

  }

  _renderTimeSection(timeStart, timeEnd) {
    let timeStartTemp = moment(timeStart).format(`HH:mm`);
    let timeEndTemp = moment(timeEnd).format(`HH:mm`);
    let timeShiftTemp = moment.duration(moment(timeEnd).diff(moment(timeStart)));
    let timeShiftTempRender = `00H:00M`;
    if (timeShiftTemp._data.days > 0) {
      timeShiftTempRender = timeShiftTemp.format(`dd[D] h[h]:mm[m]`);
    } else if (timeShiftTemp._data.hours > 0) {
      timeShiftTempRender = timeShiftTemp.format(`h[h]:mm[m]`);
    } else {
      timeShiftTempRender = timeShiftTemp.format(`mm[m]`);
    }
    return `<span class="trip-point__timetable">${timeStartTemp} &nbsp;&mdash; ${timeEndTemp}</span>
            <span class="trip-point__duration">${timeShiftTempRender}</span>`;
  }
}
