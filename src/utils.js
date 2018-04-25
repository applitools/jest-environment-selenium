export function isWebElement(element) {
  if (element && element.constructor && /^WebElement(Promise)?$/.test(element.constructor.name)) return true;
  throw new TypeError(`Expected to receive WebElement but instead received ${element && element.constructor.name}`);
}

export async function isSelectElement(element) {
  if (isWebElement(element)) {
    if ((await element.getTagName()) === 'select') return true;
    throw new TypeError(`Expected to receive Select type WebElement but instead received ${element && element.constructor.name}`);
  }
}
