import Component from './Component';

class ButtonSort extends Component {
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
           ${this._checked ? `checked` : ``}>
              <label class="trip-sorting__item trip-sorting__item--${this._title.toLowerCase()}"
                for="sorting-${this._title.toLowerCase()}">${this._title}</label>
            </span>`.trim();
    }
  }
}
export default ButtonSort;
