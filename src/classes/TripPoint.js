import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import Component from './Component';
import {POINT_VARIABLES} from '../Database';
momentDurationFormatSetup(moment);

class TripPoint extends Component {
  constructor({id, icon, offers = [], timeStart, timeEnd, price, isFavorite, title}) {
    super();
    this._id = id;
    this._icon = icon;
    this._title = title;
    this._timeStart = timeStart < timeEnd ? timeStart : timeEnd;
    this._timeEnd = timeStart < timeEnd ? timeEnd : timeStart;
    this._offers = offers;
    this._isFavorite = Boolean(isFavorite);
    this._element = null;
    this._onEdit = null;
    this._state.price = price;
    this._state.offers = offers;
    this._calculateFullPrice = this._calculateFullPrice.bind(this);
    this._calculateOffersPrice = this._calculateOffersPrice.bind(this);
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

  update(data) {
    this._id = data.id;
    this._icon = data.icon;
    this._title = data.title;
    this._timeStart = data.timeStart < data.timeEnd ? data.timeStart : data.timeEnd;
    this._timeEnd = data.timeStart < data.timeEnd ? data.timeEnd : data.timeStart;
    this._offers = data.offers;
    this._isFavorite = data.isFavorite;
    this._state.offers = data.offers;
    this._state.price = data.price;

  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  static _renderOffers(arr) {
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

  _calculateOffersPrice() {
    if (this._state.offers) {
      return this._state.offers.filter((item)=>(item.accepted))
        .reduce((acc, offer) => {
          return acc + parseInt(offer.price, 10);
        }, 0);
    }
    return 0;
  }

  _calculateFullPrice() {
    if (this._state.offers) {
      return parseInt(this._state.price, 10) + this._calculateOffersPrice();
    }
    return this._state.price;

  }

  static _renderTimeSection(timeStart, timeEnd) {
    let timeStartTemp = moment(timeStart).format(`HH:mm`);
    let timeEndTemp = moment(timeEnd).format(`HH:mm`);
    let timeShiftTemp = moment.duration(moment(timeEnd).diff(moment(timeStart)));
    let timeShiftTempRender = `00H:00M`;
    if (timeShiftTemp._data.days > 0) {
      timeShiftTempRender = timeShiftTemp.format(`dd[D] h[h] mm[m]`);
    } else if (timeShiftTemp._data.hours > 0) {
      timeShiftTempRender = timeShiftTemp.format(`h[h] mm[m]`);
    } else {
      timeShiftTempRender = timeShiftTemp.format(`mm[m]`);
    }
    return `<span class="trip-point__timetable">${timeStartTemp} &nbsp;&mdash; ${timeEndTemp}</span>
            <span class="trip-point__duration">${timeShiftTempRender}</span>`;
  }

  get template() {
    return (`<article class="trip-point"> 
    <i class="trip-icon" >${POINT_VARIABLES.icon[this._icon.toLowerCase().split(`-`).join(``)]} </i>
    <input type="hidden" class="visually-hidden" value="${this._id}">
    <h3 class="trip-point__title" >${this._icon} to ${this._title}</h3>
    <p class="trip-point__schedule" >
      ${TripPoint._renderTimeSection(this._timeStart, this._timeEnd)}
    </p>
    <p  class = "trip-point__price" > &euro; &nbsp; ${this._calculateFullPrice()}</p>
    ${TripPoint._renderOffers(this._offers)}</article>`.trim());
  }
}

export default TripPoint;
