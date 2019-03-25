import moment from 'moment';
import Component from './Component';
export class TripPoint extends Component {
  constructor({id, icon, title, timestart, duration, price, offers, timeShift = timestart}) {
    super();
    this._id = id;
    this._icon = icon;
    this._title = title;
    this._timestart = timestart;
    this._duration = duration;
    this._price = price;
    this._offers = offers;
    this._timeShift = timeShift;

    this._element = null;
    this._onEdit = null;
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
    this._duration = data.duration;
    this._price = data.price;
    this._offers = data.offers;
    this._timeShift = data.timeShift;
  }
  get template() {
    return (`<article class="trip-point"> 
    <i class="trip-icon" >${this._icon} </i>
    <input type="hidden" class="visually-hidden" value="${this._id}">
    <h3 class="trip-point__title" >${this._title} </h3>
    <p class="trip-point__schedule" >
      ${this._timeSectionRender(this._timeShift, this._duration)}
    </p>
    <p  class = "trip-point__price" > &euro; &nbsp; ${this._price}</p>
    ${this._offerRender(this._offers)}</article>`.trim());
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
    let timeStart = moment(timeShift);
    let durationTemp = moment(duration);
    let endTime = moment(timeStart.toDate().getTime() + durationTemp.toDate().getTime());

    let timeStartHours = timeStart.hour();
    let timeStartMinutes = timeStart.minute();
    let timeEndHours = endTime.hour();
    let timeEndMinutes = endTime.minute();
    let durationHours = durationTemp.hour();
    let durationMinutes = durationTemp.minute();
    return `<span class="trip-point__timetable">${timeStartHours}:${timeStartMinutes}&nbsp;&mdash; ${timeEndHours}:${timeEndMinutes}</span>
            <span class="trip-point__duration">${durationHours}h ${durationMinutes}m</span>`;
  }
}
