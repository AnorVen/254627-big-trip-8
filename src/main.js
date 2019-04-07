import moment from 'moment'
import {TripPoint} from './classes/TripPoints';
import {TripPointEdit} from './classes/TripPointsEdit';
import {Filters} from './classes/Filters';
import {DB} from './Database';
import {chartConteiner} from './statistic'
import {API} from './api'

let initialTasks = DB.POINTS_DATA;

const MainFilter = document.querySelector(`.trip-filter`);
const TripPointsList = document.querySelector(`.trip-day__items`);
const Statistic = document.querySelector(`a[href="#stats"]`);
const Table = document.querySelector(`a[href="#table"]`);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});


api.getTasks()
  .then((tasks) => {
  console.log(tasks)
    tasksRender(tasks);
  });








Statistic.addEventListener('click', statisticClickHandler);
Table.addEventListener('click', tableClickHandler);

function statisticClickHandler(event) {
  event.preventDefault();
  Table.classList.remove(`view-switch__item--active`);
  Statistic.classList.add(`view-switch__item--active`);
  document.querySelector(`.statistic`).classList.remove(`visually-hidden`);
  document.querySelector(`.trip-points`).classList.add(`visually-hidden`);
  chartConteiner(initialTasks);
}

function tableClickHandler(event) {
  event.preventDefault();
  Statistic.classList.remove(`view-switch__item--active`);
  Table.classList.add(`view-switch__item--active`);
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
 /* tasks.splice(i, 1);*/
  return  tasks.filter((item) => item.id !== i);
};

const updateTask = (task, newTask) => {
  return {...task, ...newTask};
};

function tasksRender(arr) {
  if (arr.length) {
    for (let i = 0; i < arr.length; i++) {
      // eslint-disable-next-line
      let tripPoint = new TripPoint(arr[i]);
      let tripPointEdit = new TripPointEdit(arr[i]);
      TripPointsList.appendChild(tripPoint.render());

      tripPoint.onEdit = () => {
        tripPointEdit.render();
        TripPointsList.replaceChild(tripPointEdit.element, tripPoint.element);
        tripPoint.unrender();
      };

      tripPointEdit.onSubmit = (newObject) => {
        const updatedTask = updateTask(arr[i], newObject);
        tripPoint.update(updatedTask);
        tripPoint.render();
        TripPointsList.replaceChild(tripPoint.element, tripPointEdit.element);
        tripPointEdit.unrender();
        arr[i] = updatedTask;
      };

      tripPointEdit.onDelete = () => {
        deleteTask(arr, i);
        TripPointsList.removeChild(tripPointEdit.element);
        tripPointEdit.unrender();
      };
    }
  }
}

window.onload = function () {
  filtersRender(DB.FILTERS_DATA);
  tasksRender(initialTasks);
};
