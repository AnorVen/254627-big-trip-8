function offerRender(arr) {

  if (arr.length > 2) {
    let newItems = [];
    for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
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

function timeSectionRender(timetable, duration) {
  let timeStartHours = new Date(timetable).getHours();
  let timeStartMinutes = new Date(timetable).getMinutes();
  let timeEndHours = new Date(timetable + duration).getHours();
  let timeEndMinutes = new Date(timetable + duration).getMinutes();
  let durationHours = new Date(duration).getHours() + ((new Date()).getTimezoneOffset() / 60);
  let durationMinutes = new Date(duration).getMinutes();

  if (durationMinutes.toString().length === 1) {
    durationMinutes = `0${durationMinutes}`;
  }
  if (timeStartMinutes.toString().length === 1) {
    timeStartMinutes = `0${timeStartMinutes}`;
  }
  if (timeEndMinutes.toString().length === 1) {
    timeEndMinutes = `0${timeEndMinutes}`;
  }
  return `<span class="trip-point__timetable">${timeStartHours}:${timeStartMinutes}&nbsp;&mdash; ${timeEndHours}:${timeEndMinutes}</span>
            <span class="trip-point__duration">${durationHours}h ${durationMinutes}m</span>`;
}

const tripPointRender = ({icon, title, timetable, duration, price, offers}) => {
  return `
 <article class="trip-point">
          <i class="trip-icon">${icon}</i>
          <h3 class="trip-point__title">${title}</h3>
          <p class="trip-point__schedule">
            ${timeSectionRender(timetable, duration)}
          </p>
          <p class="trip-point__price">&euro;&nbsp; ${price}</p>
           ${offerRender(offers)}
        </article>
`;
};
export default tripPointRender;
