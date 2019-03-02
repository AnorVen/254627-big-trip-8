function offerRender(arr) {
  let offters = `<ul class="trip-point__offers">`;
  for (let offer of arr) {
    offters += `<li><button class="trip-point__offer">`;
    offters += offer;
    offters += `</button></li>`;
  }
  offters += `</ul>`;
  return offters;
}

const tripPointRender = ({icon, title, timetable, duration, price, offers}) => `
 <article class="trip-point">
          <i class="trip-icon">${icon}</i>
          <h3 class="trip-point__title">${title}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${timetable}</span>
            <span class="trip-point__duration">${duration}m</span>
          </p>
          <p class="trip-point__price">${price}</p>
         ${offerRender(offers)}
        </article>
`;
export default tripPointRender;
