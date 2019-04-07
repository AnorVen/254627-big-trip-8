export default class ModelPoint {
  constructor({id, type, destination, date_from, date_to, base_price, offers, is_favorite}) {
    this._id = id;
    this._icon = type || ``;
    this._title = destination.name || ``;
    this._timeStart = date_from || Date.now();
    this._timeEnd = date_to || Date.now();
    this._price = base_price || 0;
    this._offers = offers || [];
    this.destination = destination;
    this._element = null;
    this._isFavorite = is_favorite || false;
    this._destination = destination || {description: ``, name: ``, pictures: []};
    this._onDelete = null;
  }

  toRAW() {
    return {
      'id': this._id,
      'title': this.title,
      'due_date': this.dueDate,
      'tags': [...this.tags.values()],
      'picture': this.picture,
      'repeating_days': this.repeatingDays,
      'color': this.color,
      'is_favorite': this.isFavorite,
      'is_done': this.isDone,
    };
  }


  static parseTask(data) {
    return new ModelPoint(data);
  }

  static parseTasks(data) {
    return data.map(ModelPoint.parseTask);
  }
}
