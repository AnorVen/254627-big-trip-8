import {TripPoint} from './classes/TripPoints';
import {Filters} from './classes/Filters';
import {POINT_VARIABLES, DB} from './Database';


const MainFilter = document.querySelector(`.trip-filter`);
const TripDayItems = document.querySelector(`.trip-day__items`);

function filtersRender(arr) {
  let tempBlock = ``;
  for (let i = 0; i < arr.length; i++) {
    let filterRender = new Filters(arr[i])
    tempBlock += filterRender.render;
  }
  MainFilter.insertAdjacentHTML(`beforeend`, tempBlock);
  MainFilter.addEventListener(`click`, clickOnFilterHandler);
}

function tasksRender(arr) {
  let tempBlock = ``;
  let timeShift = arr[0].timestart;
  for (let i = 0; i < arr.length; i++) {
    let tripPoint = new TripPoint(arr[i], timeShift);
    tempBlock += tripPoint.render();
    timeShift += arr[i].duration;
  }
  TripDayItems.insertAdjacentHTML(`beforeend`, tempBlock);
}

function randomPoint({icon}) {
  TripDayItems.innerHTML = ``;
  let tempBlock = ``;
  for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
    let tripPoint = new TripPoint({
      icon: icon[Object.keys(icon)[Math.floor(Math.random() * Object.keys(icon).length)]],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: Date.now() + Math.round(Math.random() * 2010000),
      duration: Math.round(Math.random() * 60 * 60 * 24 * 1000),
      price: Math.floor(Math.random() * 201),
      offers: [Math.floor(Math.random() * 201), Math.floor(Math.random() * 201)],
    });
    tempBlock += tripPoint.render();
  }
  TripDayItems.insertAdjacentHTML(`beforeend`, tempBlock);
}

function clickOnFilterHandler(event) {
  let target = event.target;
  while (target !== MainFilter) {
    if (target.className === `trip-filter__item`) {
      randomPoint(POINT_VARIABLES);
      return;
    }
    target = target.parentNode;
  }
}

window.onload = function () {
  filtersRender(DB.FILTERS_DATA);
  tasksRender(DB.POINTS_DATA);
};
