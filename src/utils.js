export function isWebElement(element) {
  if (element && element.constructor) {
    if (element.constructor.name === 'WebElement') return true;
    throw new TypeError(`Expected to receive WebElement but instead received ${element.constructor.name}`);
  }
  return false;
}
