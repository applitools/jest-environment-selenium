import { toBePresent, toBeChecked, toBeEditable, toHaveSelectedValue, toHaveValue } from '../matchers';
import WebElement from '../__mocks__/WebElement';

describe('toBePresent', () => {
  it('should match a single element', async () => {
    expect((await toBePresent(new WebElement())).pass).toBeTruthy();
  });
  it('should match an array with elements', async () => {
    expect((await toBePresent([new WebElement()])).pass).toBeTruthy();
  });
  it('should not match undefined', async () => {
    expect((await toBePresent.apply({isNot: false}, [undefined])).message()).toContain('Expected to receive WebElement');
  });
  it('should not match an empty array', async () => {
    expect((await toBePresent.apply({isNot: false}, [[]])).message()).toContain('Expected to receive WebElement');
  });
  it('should not match a different type', async () => {
    expect((await toBePresent.apply({isNot: false}, [5])).message()).toContain('Expected to receive WebElement');
  });
});

describe('toBeChecked', () => {
  it('should match a checked element', async () => {
    const e = new WebElement();
    e.selected = true;
    expect((await toBeChecked(e)).pass).toBeTruthy();
  });
  it('should not match an unchecked element', async () => {
    const e = new WebElement();
    expect((await toBeChecked(e)).pass).toBeFalsy();
  });
});

describe('toBeEditable', () => {
  it('should match a non-readonly, enable element', async () => {
    const e = new WebElement();
    expect((await toBeEditable(e)).pass).toBeTruthy();
  });
  it('should not match a readonly element', async () => {
    const e = new WebElement();
    e.readonly = true;
    expect((await toBeEditable(e)).pass).toBeFalsy();
  });
  it('should not match a disabled element', async () => {
    const e = new WebElement();
    e.enabled = false;
    expect((await toBeEditable(e)).pass).toBeFalsy();
  });
});

describe('toHaveSelectedValue', () => {
  it('should match a select element value', async () => {
    const e = new WebElement('select');
    e.value = 'test';
    expect((await toHaveSelectedValue(e, e.value)).pass).toBeTruthy();
  });
  it('should not match a select element with a different value', async () => {
    const e = new WebElement('select');
    e.value = 'test';
    expect((await toHaveSelectedValue(e, 'diff')).pass).toBeFalsy();
  });
  it('should not match a different element', async () => {
    const e = new WebElement('button');
    expect((await toHaveSelectedValue.apply({isNot: false}, [e, 'something'])).message()).toContain('Expected to receive Select type WebElement');
  });
});

describe('toHaveValue', () => {
  it('should match a select element value', async () => {
    const e = new WebElement('input');
    e.value = 'test';
    expect((await toHaveValue(e, e.value)).pass).toBeTruthy();
  });
  it('should not match a select element with a different value', async () => {
    const e = new WebElement('input');
    e.value = 'test';
    expect((await toHaveValue(e, 'diff')).pass).toBeFalsy();
  });
});
