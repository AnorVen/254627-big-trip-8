import moment from 'moment';
import {TripPoint} from './classes/TripPoints';
import {TripPointEdit} from './classes/TripPointsEdit';
import {Filters} from './classes/Filters';
import {DB} from './Database';
import {chartConteiner} from './statistic';
import {API} from './api';
import {SortsBtn} from './classes/SortsBtn';
import ModelPoint from './models/ModelPoint';
import {Provider} from './provider/Provider';
import {Store} from './Store/Store';
import _ from 'lodash';

const NewPiont = document.querySelector(`.trip-controls__new-event`);
const MainSort = document.querySelector(`.trip-sorting`);
const MainFilter = document.querySelector(`.trip-filter`);
const TripPointsList = document.querySelector(`.trip-day__items`);
const Statistic = document.querySelector(`a[href="#stats"]`);
const Table = document.querySelector(`a[href="#table"]`);
const TotalCost = document.querySelector(`.trip__total-cost`);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const TASKS_STORE_KEY = `tasks-store-key`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const store = new Store({key: TASKS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store, generateId: () => String(Date.now())});

let destinations = [];
let offers = [];
const escKeyKode = 27;
let initialTasks = [];
let newPointOpen = false;
window.addEventListener(`offline`, () => (document.title = `${document.title}[OFFLINE]`));
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncTasks();
});
window.addEventListener(`keydown`, escKeyHandler);

function escKeyHandler(evt) {
  if (evt.keyCode === escKeyKode) {
    tasksRender(initialTasks);
  }
}


function totalCostHandler(arr = []) {
  let totalCost = 0;
  if (arr.length) {
    totalCost += arr.reduce((acc, item) => {
      return acc + +fullprice(item);
    }, 0);
  }
  TotalCost.innerHTML = `&euro;&nbsp;${totalCost}`;
}

let apiDest = provider
  .getDestinations()
  .then((data) => {
    destinations = data;
  });
let apiOffers = provider
  .getOffers()
  .then((data) => {
    offers = data;
  });
let apiTasks = provider
  .getTasks()
  .then((tasks) => {
    initialTasks = tasks;
  });
Promise.all([apiDest, apiOffers, apiTasks])
  .then(() => tasksRender(initialTasks))
  .catch((err) => {
    TripPointsList.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later. fetch error: ${err}`;
    throw err;
  });

TripPointsList.innerHTML = `Loading route...`;

NewPiont.addEventListener(`click`, newPointHandler);

function newPointHandler() {
  if (!newPointOpen) {
    newPointOpen = true;
    let newPointEdit = new TripPointEdit(
        _.assignIn(
            ModelPoint.parseTask(DB.NEW_POINT),
            {id: initialTasks.length},
            {destinations},
            {newOffers: offers})
    );
    TripPointsList.insertBefore(newPointEdit.render(), TripPointsList.children[0]);
    let point = ModelPoint.parseTask(DB.NEW_POINT);

    newPointEdit.onSubmit = (newObject) => {
      if (
        newObject.title === DB.NEW_POINT.destination.name ||
        newObject.price === 0 ||
        newObject.timeStart === newObject.timeEnd
      ) {
        newPointEdit.apiError();
        return;
      }

      point.id = newObject.id;
      point.destination.name = newObject.title;
      point.title = newObject.title;
      point.icon = newObject.icon;
      point.offers = [...newObject.offers.values()];
      point.timeStart = newObject.timeStart;
      point.timeEnd = newObject.timeEnd;
      point.price = newObject.price;
      point.isFavorite = newObject.isFavorite;

      provider
        .createTask({point: point.toRAW()})
        .catch(() => newPointEdit.apiError())
        .then(() => provider.getTasks())
        .then((points) => tasksRender(points))
        .catch((err) => {
          TripPointsList.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later. fetch error: ${err}`;
          throw err;
        });
      newPointOpen = false;
    };

    newPointEdit.onDelete = () => {
      TripPointsList.removeChild(newPointEdit.element);
      newPointEdit.unrender();
      newPointOpen = false;
    };
  }
}

Statistic.addEventListener(`click`, statisticClickHandler);
Table.addEventListener(`click`, tableClickHandler);

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
      const filteredPoints = filterTasks(initialTasks, target.getAttribute(`for`));
      TripPointsList.innerHTML = ``;
      tasksRender(filteredPoints);
    }
    target = target.parentNode;
  }
}

function filterTasks(points, target) {
  switch (target) {
    case `filter-everything`:
      return points;
    case `filter-future`:
      return points.filter((item) => moment(item.timeStart) > moment(Date.now()));
    case `filter-past`:
      return points.filter((item) => moment(item.timeStart) < moment(Date.now()));
    default:
      return points;
  }
}

function sortRender(arr) {
  for (let i = 0; i < arr.length; i++) {
    let sortBtn = new SortsBtn(arr[i]);
    MainSort.appendChild(sortBtn.render());
  }
  MainSort.addEventListener(`click`, clickOnSortHandler);
}

function clickOnSortHandler(event) {
  let target = event.target;
  while (target !== MainSort) {
    if (target.classList.contains(`trip-sorting__item`)) {
      const filteredPoints = sortTasks(initialTasks, target.getAttribute(`for`));
      TripPointsList.innerHTML = ``;
      tasksRender(filteredPoints);
    }
    target = target.parentNode;
  }
}

function sortTasks(points, target) {
  switch (target) {
    case `sorting-event`:
      return points.sort((a, b) => (a.id > b.id ? 1 : -1));
    case `sorting-time`:
      return points.sort((a, b) =>
        moment(a.timeStart) - moment(a.timeEnd) > moment(b.timeStart) - moment(b.timeEnd) ? 1 : -1
      );
    case `sorting-price`:
      return points.sort((a, b) => fullprice(a) < fullprice(b) ? 1 : -1);
    default:
      return points;
  }
}

function fullprice(item) {
  let fullPrice = 0;
  fullPrice += +item.price;
  for (let i = 0; i < item.offers.length; i++) {
    if (item.offers[i].accepted) {
      fullPrice += +item.offers[i].price;
    }
  }
  return fullPrice;
}

function tasksRender(arr) {
  if (arr.length) {
    TripPointsList.innerHTML = ``;
    totalCostHandler(arr);
    for (let i = 0; i < arr.length; i++) {
      let point = arr[i];

      let tripPoint = new TripPoint(
          _.assignIn(
              point,
              {destinations},
              {newOffers: offers}));
      let tripPointEdit = new TripPointEdit(
          _.assignIn(
              point,
              {destinations},
              {newOffers: offers}));
      TripPointsList.appendChild(tripPoint.render());

      tripPoint.onEdit = () => {
        tripPointEdit.render();
        TripPointsList.replaceChild(tripPointEdit.element, tripPoint.element);
        tripPoint.unrender();
      };

      tripPointEdit.onSubmit = (newObject) => {
        point.id = newObject.id;
        point.destination.name = newObject.title;
        point.title = newObject.title;
        point.icon = newObject.icon;
        point.offers = [...newObject.offers.values()];
        point.timeStart = newObject.timeStart;
        point.timeEnd = newObject.timeEnd;
        point.price = newObject.price;
        point.isFavorite = newObject.isFavorite;
        provider
          .updateTask({id: point.id, data: point.toRAW()})
          .catch(() => tripPointEdit.apiError())
          .then((newTask) => {
            tripPoint.update(newTask);
            tripPoint.render();
            TripPointsList.replaceChild(tripPoint.element, tripPointEdit.element);
            tripPointEdit.unrender();
            totalCostHandler(arr);
          });
      };

      tripPointEdit.onDelete = () => {
        provider.deleteTask(point)
          .catch(() => tripPointEdit.apiError())
          .then(() => provider.getTasks())
          .then((tasks) => tasksRender(tasks))
          .catch(alert);
      };
    }
  }
}

window.onload = function () {
  filtersRender(DB.FILTERS_DATA);
  sortRender(DB.SORT_DATA);
};
