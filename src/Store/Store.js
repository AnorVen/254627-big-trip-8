const Store = class {
  constructor({key, storage}) {
    this._storage = storage;
    this._storeKey = key;
  }

  setItem({key, item}) {
    const items = this.getAll();
    items[key] = item;

    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  getItem({key}) {
    const items = this.getAll();
    return items[key];
  }

  removeItem({key}) {
    const items = this.getAll();
    delete items[key];
    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  getAll() {
    const items = this._storage.getItem(this._storeKey) || {};
    try {
      return JSON.parse(items);
    } catch (e) {
      alert(`Error parse items. Error: ${e}. Items: ${items}`); // eslint-disable-line
      return {};
    }
  }
};
export default Store;
