import { isWebElement, isSelectElement } from '../utils';
import WebElement from '../__mocks__/WebElement';
import WebElementPromise from '../__mocks__/WebElementPromise';
import BlahWebElement from '../__mocks__/BlahWebElement';
import BlahWebElementPromise from '../__mocks__/BlahWebElementPromise';

describe('isWebElement', () => {
  it('should match a WebElement', () => {
    expect(isWebElement(new WebElement())).toBeTruthy();
  });
  it('should match a WebElementPromise', () => {
    expect(isWebElement(new WebElementPromise())).toBeTruthy();
  });
  it('should match a WebElement', () => {
    expect(isWebElement(new BlahWebElement())).toBeTruthy();
  });
  it('should match a WebElementPromise', () => {
    expect(isWebElement(new BlahWebElementPromise())).toBeTruthy();
  });
  it('should fail for undefined', () => {
    expect(() => (isWebElement())).toThrow();
  });
  it('should throw for different type', () => {
    expect(() => (isWebElement(5))).toThrow();
    expect(() => (isWebElement(new Date()))).toThrow();
  });
});

describe('isSelectElement', () => {
  it('should match a select element', async () => {
    expect(await isSelectElement(new WebElement('select'))).toBeTruthy();
  });
  it('should not match a different element', async () => {
    expect(isSelectElement(new WebElement('button'))).rejects.toBeDefined();
  });
});
