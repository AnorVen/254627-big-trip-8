export default class ModelOffer {
  constructor(data) {
    this.type = data[`type`];
    this.offers = data[`offers`];
    this._getOffer = this._getOffer.bind(this);
  }

  _getOffer() {
    const temp = this.offers.map((item)=>{
      return {title: item.name,
        price: item.price,
        accepted: false};
    });
    this.offers = temp;
    return this;
  }

  static parseOffer(data) {
    return new ModelOffer(data)._getOffer();
  }

  static parseOffers(data) {
    return data.map(ModelOffer.parseOffer);
  }
}
