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





  let minTimeStart = moment(arr[0].timeStart).unix();
  for (let i = 0; i < 2; i++) {
    //проверка что старт точно раньше окончания
    if(moment(arr[i].timeStart).unix() > moment(arr[i].timeEnd).unix()){
      [arr[i].timeStart, arr[i].timeEnd] = [arr[i].timeEnd, arr[i].timeStart]
    }
    //проверка что начало следующего таска не раньше конца предыдущего
    if( minTimeStart  > moment(arr[i].timeStart) ){
      let tempTime = moment(arr[i].timeEnd).unix() - moment(arr[i].timeStart).unix();
     arr[i].timeStart = moment(minTimeStart);
     arr[i].timeEnd = moment(minTimeStart).add(tempTime,'ms');
    }

// eslint-disable-next-line
    let tripPoint = new TripPoint({id : i, ...arr[i]});
    let tripPointEdit = new TripPointEdit({id : i, ...arr[i]});
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
      point.timeStart = newObject.timeStart;
      point.timeEnd = newObject.timeEnd;
      point.price = newObject.price;
      point.offers = newObject.offers;
      point.isFavorite = newObject.isFavorite;


      tripPoint.update(point);
      debugger
      tripPoint.render();
      TripPointsList.replaceChild(tripPoint.element, tripPointEdit.element);
      tripPointEdit.unrender();
    };
    minTimeStart = moment(arr[i].timeEnd);
  }
}

function randomPoint({icon}) {
  TripPointsList.innerHTML = ``;
  for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
    let tripPoint = new TripPoint({
      id: i,
      icon: POINT_VARIABLES.iconText[Math.floor(Math.random() * POINT_VARIABLES.iconText.length)],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timeStart: Date.now() + Math.round(Math.random() * 2010000),
      duration: Math.round(Math.random() * 60 * 60 * 24 * 1000),
      price: Math.floor(Math.random() * 201),
      offers: [Math.floor(Math.random() * 201), Math.floor(Math.random() * 201)],
    });
    let tripPointEdit = new TripPointEdit({
      id: i,
      icon: POINT_VARIABLES.iconText[Math.floor(Math.random() * POINT_VARIABLES.iconText.length)],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timeStart: Date.now() + Math.round(Math.random() * 2010000),
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
