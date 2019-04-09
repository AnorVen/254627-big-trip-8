export default class ModelDestination {
  constructor(data) {
    this.name = data[`name`];
    this.description = data[`description`];
    this.pictures = data[`pictures`];
    this._getOffer = this._getOffer.bind(this);
  }

  _getOffer() {
    const temp = this.pictures.map((item)=>{
      return {src: item.src, description: item.description};
    });
    this.pictures = temp;
    return this;
  }

  static parseDestination(data) {
    return new ModelDestination(data)._getOffer();
  }

  static parseDestinations(data) {
    return data.map(ModelDestination.parseDestination);
  }
}
