import Component from './Component';
export class Filters extends Component {
  constructor({title, checked = false}) {
    super();
    this._title = title;
    this._checked = checked;
    this._element = null;
    this._onFilter = null;
  }

  bind() {
    this._element.addEventListener(`click`, this._onEFilterButtonClick);
  }
  unbind() {
    this._element.removeEventListener(`click`, this._onEFilterButtonClick);
  }

  _onEFilterButtonClick() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return (`
      <label class="trip-filter__item"
        for="filter-${this._title.toLowerCase()}">
        <input type="radio" 
          id="filter-${this._title.toLowerCase()}" 
          name="filter" value="${this._title.toLowerCase()}" 
          ${this._checked ? `checked` : null}>
        ${this._title}</label>`.trim());
  }
}
