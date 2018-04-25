export default class WebElement {
  constructor() {
    this.selected = false;
    this.isSelected = this.isSelected.bind(this);
  }
  isSelected() {
    return Promise.resolve(this.selected);
  }
}
