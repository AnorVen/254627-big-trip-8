import {TripPoint} from './classes/TripPoints';
import {TripPointEdit} from './classes/TripPointsEdit';
import {Filters} from './classes/Filters';
import {POINT_VARIABLES, DB} from './Database';
import moment from 'moment'


const MainFilter = document.querySelector(`.trip-filter`);
const TripPointsList = document.querySelector(`.trip-day__items`);

function filtersRender(arr) {
  for (let i = 0; i < arr.length; i++) {
    let filterRender = new Filters(arr[i]);
    MainFilter.appendChild(filterRender.render());
  }
  MainFilter.addEventListener(`click`, clickOnFilterHandler);
}

function tasksRender(arr) {





  let timeShift = moment(arr[0].timestart).toDate().getTime();
  for (let i = 0; i < 1; i++) {
    let tripPoint = new TripPoint({id : i, timeShift : timeShift, ...arr[i]});
    let tripPointEdit = new TripPointEdit({id : i, timeShift : timeShift, ...arr[i]});
    TripPointsList.appendChild(tripPoint.render());

    tripPoint.onEdit = () => {
      tripPointEdit.render();
      TripPointsList.replaceChild(tripPointEdit.element, tripPoint.element);
      tripPoint.unrender();
    };

    tripPointEdit.onSubmit = (newObject) => {
      let point = {};
      point.id = newObject.id;
      point.icon = newObject.icon;
      point.title = newObject.title;
      point.timestart = newObject.timestart;
      point.duration = newObject.duration;
      point.price = newObject.price;
      point.offers = newObject.offers;
      point.timeShift = newObject.timeShift;

      tripPoint.update(point);
      tripPoint.render();
      TripPointsList.replaceChild(tripPoint.element, tripPointEdit.element);
      tripPointEdit.unrender();
    };


    var end = moment(arr[i].duration).toDate().getTime();
    var timespan = timeShift + end;
     timeShift = moment(timespan);
    debugger
  }
}

function randomPoint({icon}) {
  TripPointsList.innerHTML = ``;
  for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
    let tripPoint = new TripPoint({
      icon: icon[Object.keys(icon)[Math.floor(Math.random() * Object.keys(icon).length)]],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: Date.now() + Math.round(Math.random() * 2010000),
      duration: Math.round(Math.random() * 60 * 60 * 24 * 1000),
      price: Math.floor(Math.random() * 201),
      offers: [Math.floor(Math.random() * 201), Math.floor(Math.random() * 201)],
    });
    let tripPointEdit = new TripPointEdit({
      icon: icon[Object.keys(icon)[Math.floor(Math.random() * Object.keys(icon).length)]],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: Date.now() + Math.round(Math.random() * 2010000),
      duration: Math.round(Math.random() * 60 * 60 * 24 * 1000),
      price: Math.floor(Math.random() * 201),
      offers: [Math.floor(Math.random() * 201), Math.floor(Math.random() * 201)],
    });
    tripPoint.onEdit = () => {
      tripPointEdit.render();
      TripPointsList.replaceChild(tripPointEdit.element, tripPoint.element);
      tripPoint.unrender();
    };

    tripPointEdit.onSubmit = () => {
      tripPoint.render();
      TripPointsList.replaceChild(tripPoint.element, tripPointEdit.element);
      tripPointEdit.unrender();
    };

    TripPointsList.appendChild(tripPoint.render());
  }
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
