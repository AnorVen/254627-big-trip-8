import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format'; // без этого не запускается плагин для момента
import Component from './Component';
import {POINT_VARIABLES} from '../Database';
export class TripPoint extends Component {
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
    this._onEdit = null;
    this.state = {
      price: this._price,
      offers: this._offers,
    };
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
    this._price = data.price;
    this._offers = data.offers;
    this._timeShift = data.timeShift;
  }


  get template() {
    return (`<article class="trip-point"> 
    <i class="trip-icon" >${POINT_VARIABLES.icon[this._icon.toLowerCase()]} </i>
    <input type="hidden" class="visually-hidden" value="${this._id}">
    <h3 class="trip-point__title" >${this._title} </h3>
    <p class="trip-point__schedule" >
      ${this._timeSectionRender(this._timestart, this._timeend)}
    </p>
    <p  class = "trip-point__price" > &euro; &nbsp; ${this.fullPrice()}</p>
    ${this._offerRender(this._offers)}</article>`.trim());
  }

  _offerRender(arr) {
    arr = arr.filter((offer) => offer.isChecked === true);
    this.setState({
      offers: arr
    })
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
      offers += `${offer.title}+ €${offer.price}`;
      offers += `</button></li>`;
    }
    offers += `</ul>`;
    return offers;
  }


  get offersPrice() {
    return Object.keys(this._state.offers).reduce((acc, offer) => {
      if (this._state.offers[offer].isChecked) {
        return acc + parseInt(this._state.offers[offer].price, 10);
      }
      return acc;
    }, 0);
  }

  get fullPrice() {
    return parseInt(this._state.price, 10) + this.offersPrice;
  }



  _timeSectionRender(timestart, timeend) {
    let timeStart = moment(timestart).format(`DD MM HH:mm`);
    let timeEnd = moment(timeend).format(`DD MM HH:mm`);
    let timeShift = moment.duration(moment(timeend).diff(moment(timestart))).format(`hh[h]: mm[m]`);


    return `<span class="trip-point__timetable">${timeStart}&nbsp;&mdash; ${timeEnd}</span>
            <span class="trip-point__duration">${timeShift}</span>`;
  }
}
