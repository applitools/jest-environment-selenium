import { isWebElement } from './utils';

export function toBePresent(received) {
  const element = (received && received.length && received[0]) || received;
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
}

export default {
  toBePresent
};
