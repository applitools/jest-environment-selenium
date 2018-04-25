import { isWebElement } from '../utils';
import WebElement from '../__mocks__/WebElement';

describe('isWebElement', () => {
  it('should match a WebElement', () => {
    expect(isWebElement(new WebElement())).toBeTruthy();
  });
  it('should fail for undefined', () => {
    expect(isWebElement()).toBeFalsy();
  });
  it('should fail for different type', () => {
    expect(isWebElement(5)).toBeFalsy();
    expect(isWebElement(new Date())).toBeFalsy();
  });
});
