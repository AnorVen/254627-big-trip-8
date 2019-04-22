export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }


  bind() {
  }

  unbind() {
  }

  static createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }

  render() {
    this._element = Component.createElement(this.template);
    this.bind();
    return this._element;
  }
  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}
