export function isWebElement(element) {
  if (element && element.constructor && /^WebElement(Promise)?$/.test(element.constructor.name)) return true;
  throw new TypeError(`Expected to receive WebElement but instead received ${element && element.constructor.name}`);
}
