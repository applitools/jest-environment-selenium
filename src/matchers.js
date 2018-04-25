import { isWebElement } from './utils';

export function toBePresent(received) {
  try {
    const element = (received && received.hasOwnProperty('length')) ? received[0] : received;
    return isWebElement(element) ?
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

export default {
  toBePresent
};
