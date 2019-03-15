import {createElement} from '../createElement';

export class Filters {
  constructor({title, CHECKED = false}){
    this._title = title;
    this._checked = CHECKED;
    this._element = null;
  }

  get template() {
    return (`<input type="radio" id="filter-${this._title.toLowerCase()}" name="filter"
   value="${this._title.toLowerCase()}" ${this._checked ? `checked` : null
      }><label class="trip-filter__item" for="filter-${this._title.toLowerCase()}">${this._title}</label>`);
  }
  render() {
    this._element = createElement(this.template);
    return this._element;
  }
}
