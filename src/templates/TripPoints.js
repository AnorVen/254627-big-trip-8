function offerRender(arr) {
  let newArr = arr.length > 2 ? arr.slice(0, 2) : arr;
  let offters = `<ul class="trip-point__offers">`;
  for (let offer of newArr) {
    offters += `<li><button class="trip-point__offer">`;
    offters += offer;
    offters += `</button></li>`;
  }
  offters += `</ul>`;
  return offters;
}

function timeSectionRender(timetable, duration) {
  let timeStartHours = new Date(timetable).getHours();
  let timeStartMinutes = new Date(timetable).getMinutes();
  let timeEndHours = new Date(timetable + duration).getHours();
  let timeEndMinutes = new Date(timetable + duration).getMinutes();
  let durationHours = new Date(duration).getHours();
  let durationMinutes = new Date(duration).getMinutes();
  durationMinutes.toString().length === 1 ? durationMinutes = `0${durationMinutes}` : null;
  timeStartMinutes.toString().length === 1 ? timeStartMinutes = `0${timeStartMinutes}` : null;
  timeEndMinutes.toString().length === 1 ? timeEndMinutes = `0${timeEndMinutes}` : null;
  /* Даты складываются как-то коряво.. непойму почему
   console.log(new Date(Date.now() + duration).getHours());
    console.log(new Date(duration).getHours());
    console.log(new Date(Date.now()).getHours());*/
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
