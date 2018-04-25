export default class WebElement {
  constructor() {
    this.selected = false;
    this.enabled = true;
    this.readonly = false;
    this.getAttribute = this.getAttribute.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.isEnabled = this.isEnabled.bind(this);
  }
  getAttribute(attr) {
    return Promise.resolve(this[attr]);
  }
  isSelected() {
    return Promise.resolve(this.selected);
  }
  isEnabled() {
    return Promise.resolve(this.enabled);
  }
}
