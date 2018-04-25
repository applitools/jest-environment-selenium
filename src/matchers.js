import { isWebElement, isSelectElement } from './utils';

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

export async function toBeEditable(received) {
  try {
    return isWebElement(received) && await received.isEnabled() && !(await received.getAttribute('readonly')) ?
      {
        message: () => 'Assertion failed: element is editable',
        pass: true
      }
      :
      {
        message: () => 'Assetion failed: element is not editable',
        pass: false
      };
  } catch (err) {
    return {
      message: () => err.message,
      pass: this.isNot
    };
  }
}

export async function toHaveSelectedValue(received, expected) {
  try {
    if (await isSelectElement(received)) {
      const value = await received.getAttribute('value');
      return Object.is(value, expected) ?
        {
          actual: value,
          message: () => this.utils.matcherHint('.not.toHaveSelectedValue') +
          '\n\n' +
          'Expected value to not be (using Object.is):\n' +
          `  ${this.utils.printExpected(expected)}\n` +
          'Received:\n' +
          `  ${this.utils.printReceived(value)}`,
          pass: true
        }
        :
        {
          actual: value,
          message: () => this.utils.matcherHint('.toHaveSelectedValue') +
          '\n\n' +
          'Expected value to be (using Object.is):\n' +
          `  ${this.utils.printExpected(expected)}\n` +
          'Received:\n' +
          `  ${this.utils.printReceived(value)}`,
          pass: false
        };
    }
  } catch (err) {
    return {
      message: () => err.message,
      pass: this.isNot
    };
  }
}

export async function toHaveValue(received, expected) {
  try {
    if (isWebElement(received)) {
      const value = await received.getAttribute('value');
      return Object.is(value, expected) ?
        {
          actual: value,
          message: () => this.utils.matcherHint('.not.toHaveValue') +
          '\n\n' +
          'Expected value to not be (using Object.is):\n' +
          `  ${this.utils.printExpected(expected)}\n` +
          'Received:\n' +
          `  ${this.utils.printReceived(value)}`,
          pass: true
        }
        :
        {
          actual: value,
          message: () => this.utils.matcherHint('.toHaveValue') +
          '\n\n' +
          'Expected value to be (using Object.is):\n' +
          `  ${this.utils.printExpected(expected)}\n` +
          'Received:\n' +
          `  ${this.utils.printReceived(value)}`,
          pass: false
        };
    }
  } catch (err) {
    return {
      message: () => err.message,
      pass: this.isNot
    };
  }
}

export default {
  toBePresent,
  toBeChecked,
  toBeEditable,
  toHaveSelectedValue,
  toHaveValue
};
