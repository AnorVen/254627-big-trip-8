import {TripPoint} from './classes/TripPoints';
import {TripPointEdit} from './classes/TripPointsEdit';
import {Filters} from './classes/Filters';
import {POINT_VARIABLES, DB} from './Database';
import {chartConteiner} from './statistic'
import moment from 'moment'

let initialTasks = DB.POINTS_DATA

const MainFilter = document.querySelector(`.trip-filter`);
const TripPointsList = document.querySelector(`.trip-day__items`);
const Statistic = document.querySelector(`a[href="#stats"]`);
const Table = document.querySelector(`a[href="#table"]`);

Statistic.addEventListener('click', statisticClickHandler);
Table.addEventListener('click', tableClickHandler);

function statisticClickHandler(event) {
  event.preventDefault();
  Statistic.classList.remove(`view-switch__item--active`);
  document.querySelector(`.statistic`).classList.remove(`visually-hidden`);
  document.querySelector(`.trip-points`).classList.add(`visually-hidden`);
  chartConteiner(initialTasks);
}

function tableClickHandler(event) {
  event.preventDefault();
  Table.classList.remove(`view-switch__item--active`);
  document.querySelector(`.trip-points`).classList.remove(`visually-hidden`);
  document.querySelector(`.statistic`).classList.add(`visually-hidden`);
}

function filtersRender(arr) {
  for (let i = 0; i < arr.length; i++) {
    let filterRender = new Filters(arr[i]);
    MainFilter.appendChild(filterRender.render());
  }
  MainFilter.addEventListener(`click`, clickOnFilterHandler);
}


function clickOnFilterHandler(event) {
  let target = event.target;
  while (target !== MainFilter) {
    if (target.className === `trip-filter__item`) {
      const filteredPoints = filterTasks(
        initialTasks,
        target.getAttribute(`for`)
      );
      TripPointsList.innerHTML = ``;
      tasksRender(filteredPoints);
    }
    target = target.parentNode;
  }
}

function filterTasks(initialTasks, target) {
  switch (target) {
    case `filter-everything`:return initialTasks;
    case `filter-future`:
      return initialTasks.filter((item) => moment(item.timeStart) > moment(Date.now()));
    case `filter-past`:
      return initialTasks.filter((item) => moment(item.timeStart) < moment(Date.now()));
    default: return initialTasks;
  }

}
const deleteTask = (tasks, i) => {
  tasks.splice(i, 1);
  return tasks;
};



function tasksRender(arr) {
  if (arr.length){
  let minTimeStart = moment(arr[0].timeStart).unix();
  for (let i = 0; i < arr.length; i++) {
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
      tripPoint.render();
      TripPointsList.replaceChild(tripPoint.element, tripPointEdit.element);
      tripPointEdit.unrender();
    };

    tripPointEdit.onDelete = () => {
      deleteTask(arr, i);
      TripPointsList.removeChild(tripPointEdit.element);
      tripPointEdit.unrender();
    };
    minTimeStart = moment(arr[i].timeEnd);
  }
  }
}

window.onload = function () {
  filtersRender(DB.FILTERS_DATA);
  tasksRender(initialTasks);
};
