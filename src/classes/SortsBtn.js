import Component from './Component';

export class SortsBtn extends Component {
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
    if (this._title.toLowerCase() === `Offers`.toLowerCase()) {
      return `<span 
        class="trip-sorting__item trip-sorting__item--${this._title.toLowerCase()}">
          ${this._title}</span>`.trim();
    } else {
      return `<span>
        <input type="radio"
           name="trip-sorting" 
           id="sorting-${this._title.toLowerCase()}" 
           value="${this._title.toLowerCase()}"  
           ${this._checked ? `checked` : null}>
              <label class="trip-sorting__item trip-sorting__item--${this._title.toLowerCase()}"
                for="sorting-${this._title.toLowerCase()}">${this._title}</label>
            </span>`.trim();
    }
  }
}
