import ModelPoint from '../models/ModelPoint';
import ModelOffer from '../models/ModelOffer';
import ModelDestination from '../models/ModelDestination';

const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

const Provider = class {
  constructor({api, store, generateId}) {
    this._api = api;
    this._store = store;
    this._generateId = generateId;
  }

  updateTask({id, data}) {
    if (Provider._isOnline()) {
      return this._api.updateTask({id, data})
        .then((task) => {
          this._store.setItem({key: task.id, item: task.toRAW()});
          return task;
        });
    } else {
      const task = data;
      this._needSync = true;
      this._store.setItem({key: task.id, item: task});
      return Promise.resolve(ModelPoint.parseTask(task));
    }
  }

  createTask({point}) {
    if (Provider._isOnline()) {
      return this._api.createTask({point})
        .then((data) => {
          this._store.setItem({key: data.id, item: data.toRAW()});
          return data;
        });
    } else {
      point.id = this._generateId();
      this._needSync = true;

      this._store.setItem({key: point.id, item: point});
      return Promise.resolve(ModelPoint.parseTask(point));
    }
  }

  deleteTask({id}) {
    if (Provider._isOnline()) {
      return this._api.deleteTask({id})
        .then(() => {
          this._store.removeItem({key: id});
        });
    } else {
      this._needSync = true;
      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  getTasks() {
    if (Provider._isOnline()) {
      return this._api.getTasks()
        .then((tasks) => {
          tasks.map((it) => this._store.setItem({key: it.id, item: it.toRAW()}));
          return tasks;
        });
    } else {
      const rawTasksMap = this._store.getAll();
      const rawTasks = objectToArray(rawTasksMap);
      const tasks = ModelPoint.parseTasks(rawTasks);

      return Promise.resolve(tasks);
    }
  }

  static _isOnline() {
    return window.navigator.onLine;
  }

  syncTasks() {
    return this._api.syncTasks({tasks: objectToArray(this._store.getAll())});
  }

  getOffers() {
    if (Provider._isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setItem({key: `offers`, item: offers});
          return offers;
        });
    } else {
      const rawOffersMap = this._store.getItem(`offers`);
      const rawOffers = rawOffersMap.map((item) =>objectToArray(item));
      const offers = ModelOffer.parseOffers(rawOffers);
      return Promise.resolve(offers);
    }
  }

  getDestinations() {
    if (Provider._isOnline()) {
      return this._api.getDestinations()
      .then((destinations) => {
        this._store.setItem({key: `destinations`, item: destinations});
        return destinations;
      });
    } else {
      const rawDestinationsMap = this._store.getItem(`destinations`);
      const rawDestinations = rawDestinationsMap.map((item) =>objectToArray(item));
      const destinations = ModelDestination.parseDestinations(rawDestinations);
      return Promise.resolve(destinations);
    }
  }
};
export default Provider;
