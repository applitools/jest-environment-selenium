import { toBePresent } from '../matchers';
import WebElement from '../__mocks__/WebElement';

describe('toBePresent', () => {
  it('should match a single element', () => {
    expect(toBePresent(new WebElement()).pass).toBeTruthy();
  });
  it('should match an array with elements', () => {
    expect(toBePresent([new WebElement()]).pass).toBeTruthy();
  });
  it('should not match undefined', () => {
    expect(toBePresent(undefined).pass).toBeFalsy();
  });
  it('should not match an empty array', () => {
    expect(toBePresent([]).pass).toBeFalsy();
  });
});
