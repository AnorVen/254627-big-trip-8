export default class ModelPoint {
  constructor(data) { // eslint-disable-line
    this.id = data[`id`];
    this.icon = data[`type`] || `bus`;
    this.title = data[`destination`][`name`] || ``;
    this.timeStart = data[`date_from`] || Date.now(); // eslint-disable-line
    this.timeEnd = data[`date_to`] || Date.now(); // eslint-disable-line
    this.price = data[`base_price`] || 0; // eslint-disable-line
    this.offers = data[`offers`] || [];
    this.isFavorite = data[`is_favorite`] || false; // eslint-disable-line
    this.destination = data[`destination`] || {description: ``, name: ``, pictures: []};
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
      'offers': [...this.offers.values()],
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
