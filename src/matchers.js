import { isWebElement } from './utils';

export async function toBePresent(received) {
  try {
    const elements = await received;
    return isWebElement(Array.isArray(elements) ? elements[0] : elements) ?
      {
        message: () => 'Assertion failed: unexpected element was found in page',
        pass: true
      }
      :
      {
        message: () => 'Assetion failed: expected element was not found in page',
        pass: false
      };
  } catch (err) {
    return {
      message: () => err.message,
      pass: this.isNot
    };
  }
}

export async function toBeChecked(received) {
  try {
    return isWebElement(received) && await received.isSelected() ?
      {
        message: () => 'Assertion failed: element is checked',
        pass: true
      }
      :
      {
        message: () => 'Assetion failed: element is not checked',
        pass: false
      };
  } catch (err) {
    return {
      message: () => err.message,
      pass: this.isNot
    };
  }
}

export default {
  toBePresent,
  toBeChecked
};
