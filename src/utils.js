export function isWebElement(element) {
  return element && element.constructor && element.constructor.name === 'WebElement';
}
