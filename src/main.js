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
  )
  .catch((err) => {
    console.error(`fetch error: ${err}`);
    TripPointsList.innerHTML =
      `Something went wrong while loading your route info. Check your connection or try again later`;
    throw err;
  });;

api.getOffers()
  .then((data) => {
      offers= data;
      renderFlags.offers = true;
    firstRender(initialTasks);
    }
  )
  .catch((err) => {
    console.error(`fetch error: ${err}`);
    TripPointsList.innerHTML =
      `Something went wrong while loading your route info. Check your connection or try again later`;
    throw err;
  });
api.getTasks()
  .then((tasks) => {
      renderFlags.tasks = true;
      initialTasks = tasks;
    firstRender(initialTasks);
    }
  )
  .catch((err) => {
    console.error(`fetch error: ${err}`);
    TripPointsList.innerHTML =
      `Something went wrong while loading your route info. Check your connection or try again later`;
    throw err;
  });



function firstRender(initialTasks){
  TripPointsList.innerHTML = `Loading route...`;
  if(renderFlags.offers === true
  && renderFlags.tasks  === true
  && renderFlags.destinations  === true) {
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

function tasksRender(arr) {
  if (arr.length) {
    TripPointsList.innerHTML = ``;
    for (let i = 0; i < arr.length; i++) {
      let point = arr[i];

      let tripPoint = new TripPoint({
        ...point, // eslint-disable-line
        destinations: destinations,
        newOffers: offers
      });
      let tripPointEdit = new TripPointEdit({
        ...point,
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

        point.id = newObject.id;
        point.destination.name = newObject.title
        point.title = newObject.title;
        point.icon = newObject.icon;
        point.offers =  [...newObject.offers.values()];
        point.timeStart = newObject.timeStart;
        point.timeEnd = newObject.timeEnd;
        point.price = newObject.price;
        point.isFavorite = newObject.isFavorite;


        api.updateTask({id: point.id, data: point.toRAW() })
          .catch(tripPointEdit.apiError())
          .then((newTask)=>{
            console.log(newTask)
              tripPoint.update(newTask);
              tripPoint.render();
              TripPointsList.replaceChild(tripPoint.element, tripPointEdit.element);
              tripPointEdit.unrender();
          })
      };

      tripPointEdit.onDelete = () => {
        api.deleteTask(point)
          .catch(tripPointEdit.apiError())
          .then(() => api.getTasks())
          .then(tasksRender)
          .catch(alert);
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
