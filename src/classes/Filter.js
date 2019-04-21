import Component from './Component';
export class Filter extends Component {
  constructor({title, checked = false}) {
    super();
    this._title = title;
    this._checked = checked;
  }
  unrender() {
    this.unbind();
    this._element = null;
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
