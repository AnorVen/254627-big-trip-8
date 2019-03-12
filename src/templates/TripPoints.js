export class TripPoint {
  constructor({icon, title, timestart, duration, price, offers}, timeShift = timestart) {
    this._icon = icon;
    this._title = title;
    this._timestart = timestart;
    this._duration = duration;
    this._price = price;
    this._offers = offers;
    this._timeShift = timeShift;
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
    // TODO  const time = (timeShift) => ();
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

  render() {
    return (`<article class = "trip-point" > <i class = "trip-icon" >${this._icon} </i>
    <h3 class = "trip-point__title" >${this._title} </h3>
    <p class = "trip-point__schedule" >
    ${this._timeSectionRender(this._timeShift, this._duration)}
    </p>
    <p  class = "trip-point__price" > &euro; &nbsp; ${this._price}</p>
  ${this._offerRender(this._offers)}
</article>
 `);
  }
}
