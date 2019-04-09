import moment from 'moment'
import {TripPoint} from './classes/TripPoints';
import {TripPointEdit} from './classes/TripPointsEdit';
import {Filters} from './classes/Filters';
import {DB} from './Database';
import {chartConteiner} from './statistic'
import {API} from './api'

let initialTasks = [];

const MainFilter = document.querySelector(`.trip-filter`);
const TripPointsList = document.querySelector(`.trip-day__items`);
const Statistic = document.querySelector(`a[href="#stats"]`);
const Table = document.querySelector(`a[href="#table"]`);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
let destinations = [];
let offers = [];
let renderFlags = {
  // надо для проверки, что все точно загрузилось..
  offers: false,
  tasks: false,
  destinations: false
}
api.getDestinations()
  .then((data) => {
      destinations = data;
      renderFlags.destinations = true;
    firstRender(initialTasks);
    }
  );

api.getOffers()
  .then((data) => {
      offers= data;
      renderFlags.offers = true;
    firstRender(initialTasks);
    }
  );
api.getTasks()
  .then((tasks) => {
      console.log(tasks);
      renderFlags.tasks = true;
      initialTasks = tasks;
    firstRender(initialTasks);
    }
  );



function firstRender(initialTasks){
  if(renderFlags.offers === true
  && renderFlags.tasks  === true
  && renderFlags.destinations  === true) {
    console.log(renderFlags)
    console.log(initialTasks)
    tasksRender(initialTasks);
  }
}
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
    case `filter-everything`:
      return initialTasks;
    case `filter-future`:
      return initialTasks.filter((item) => moment(item.timeStart) > moment(Date.now()));
    case `filter-past`:
      return initialTasks.filter((item) => moment(item.timeStart) < moment(Date.now()));
    default:
      return initialTasks;
  }

}

const deleteTask = (tasks, i) => {
  api.deleteTask(tasks[i])
    .then(() => api.getTasks())
    .then(tasksRender)
    .catch(alert);

};

const updateTask = (task, newTask) => {

};

function tasksRender(arr) {
  TripPointsList.innerHTML = `Loading route...`;
  if (arr.length) {
    TripPointsList.innerHTML = ``;
    for (let i = 0; i < arr.length; i++) {
      // eslint-disable-next-line
      let tripPoint = new TripPoint({...arr[i], destinations: destinations, newOffers: offers});
      let tripPointEdit = new TripPointEdit({
        ...arr[i],
        destinations: destinations,
        newOffers: offers
      });
      TripPointsList.appendChild(tripPoint.render());

      tripPoint.onEdit = () => {
        tripPointEdit.render();
        TripPointsList.replaceChild(tripPointEdit.element, tripPoint.element);
        tripPoint.unrender();
      };

      tripPointEdit.onSubmit = (newObject) => {

        arr[i].id = newObject.id;
        arr[i].title = newObject.destination;
        arr[i].icon = newObject.icon;
        arr[i].offers =  [...newObject.offers.values()];
        arr[i].timeStart = newObject.timeStart;
        arr[i].timeEnd = newObject.timeEnd;
        arr[i].price = newObject.price;
        arr[i].isFavorite = newObject.isFavorite;
        api.updateTask({id: arr[i].id, data: arr[i].toRAW() })
          .then((newTask)=>{
              tripPoint.update(newTask);
              tripPoint.render();
              TripPointsList.replaceChild(tripPoint.element, tripPointEdit.element);
              tripPointEdit.unrender();
          })
      };

      tripPointEdit.onDelete = () => {

        deleteTask(arr, i);
 /*       TripPointsList.removeChild(tripPointEdit.element);
        tripPointEdit.unrender();*/
      };
    }

    renderFlags = {
      offers: false,
      tasks: false,
      destinations: false
    }

  }
}

window.onload = function () {
  filtersRender(DB.FILTERS_DATA);
  // tasksRender(initialTasks);
};
