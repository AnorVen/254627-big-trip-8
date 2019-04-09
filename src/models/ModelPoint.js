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
      'type': this.icon,
      'destination': {
        'name': this.destination.name,
        'description': this.destination.description,
        'pictures': [...this.destination.pictures.values()],
      },
      'date_from': this.timeStart,
      'date_to': this.timeEnd,
      'base_price': this.price,
      'offers':  [...this.offers.values()],
      'is_favorite': this.isFavorite
    };
  }

  static parseTask(data) {
    return new ModelPoint(data);
  }

  static parseTasks(data) {
    return data.map(ModelPoint.parseTask);
  }
}
