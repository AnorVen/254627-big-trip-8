import {createElement} from '../createElement';

export class Filters {
  constructor({title, checked = false}) {
    this._title = title;
    this._checked = checked;
    this._element = null;
  }

  get template() {
    return (`<label class="trip-filter__item" for="filter-${this._title.toLowerCase()}">
      <input type="radio" id="filter-${this._title.toLowerCase()}" name="filter" value="${this._title.toLowerCase()}" ${this._checked ? `checked` : null}>${this._title}</label>`
        .trim());
  }
  render() {
    this._element = createElement(this.template);
    return this._element;
  }
}
