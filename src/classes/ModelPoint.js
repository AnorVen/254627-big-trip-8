export default class ModelPoint {
  constructor({id, type, destination, date_from, date_to, base_price, offers, is_favorite}) {
    this.id = id;
    this.icon = type || `bus`;
    this.title = destination.name || `bus`;
    this.timeStart = date_from || Date.now();
    this.timeEnd = date_to || Date.now();
    this.price = base_price || 0;
    this.offers = offers || [];
    this.isFavorite = is_favorite || false;
    this.destination = destination || {description: ``, name: ``, pictures: []};
  }

  toRAW() {
    return {
      'id': this.id,
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
