# jest-environment-selenium &middot; [![npm version](https://img.shields.io/npm/v/jest-environment-selenium.svg)](https://www.npmjs.com/package/jest-environment-selenium) [![Build Status](https://travis-ci.org/applitools/jest-environment-selenium.svg?branch=master)](https://travis-ci.org/applitools/jest-environment-selenium)  ![License](https://img.shields.io/npm/l/jest-environment-selenium.svg)  
Jest environment for running Selenium WebDriver tests

### Installation

I like using [yarn](https://github.com/yarnpkg/yarn) for installations.

```
yarn add -D jest-environment-selenium
```

But npm works too!

```
npm install --save-dev jest-environment-selenium
```

### Setup

Add this to the `package.json`:

```js
"jest": {
    "testEnvironment": "jest-environment-selenium",
    "setupTestFrameworkScriptFile": "jest-environment-selenium/dist/setup.js"
}
```

By default tests will run against a local `chromedriver`, but you can easily specify something else.


```js
"jest": {
    "testEnvironmentOptions": {
      "capabilities": {
        "browserName": "firefox"
      },
      "server": "http://localhost:4444/wd/hub",
      "proxyType": "manual",
      "proxyOptions": {
        "https": "http://127.0.0.1:3218"
      }
    }
}
```

### Jest Environment Selenium

Tests will be initialized with a `driver` according to the options (or a default chrome one)
```js
test('load wikipedia', () => {
  driver.get('https://en.wikipedia.org/wiki/Base64');
});
```

#### `cleanup`
Kills the used session and starts a new one.

```js
afterEach(async () => (cleanup()));
```

Failing to call `cleanup` will result in non "idempotent" tests, which reuse the same WebDriver session (which can lead to difficult to debug errors in your tests).

#### Caveats
Since the tests are [async](https://facebook.github.io/jest/docs/en/asynchronous.html#resolves-rejects) make sure you return a `Promise` so that `jest` won't bail early


```js
test('load wikipedia', () => {
  driver.get('https://en.wikipedia.org/wiki/Base64');
  return driver.getTitle().then(title => {expect(title).toBeDefined();});
});
```

### Matchers
Custom WebDriver matchers designed for ease of use with jest

#### expect.resolves[.not].toBePresent()
`toBePresent` checks that an element appears on a page, it expects to receive a `WebElementPromise`
```js
test('link appears in the page', () => {
  driver.get('https://en.wikipedia.org/wiki/Base64');
  return expect(driver.findElements(By.linkText("binary-to-text encoding"))).resolves.toBePresent();
});
```

#### expect.resolves[.not].toBeChecked()
`toBeChecked` checks that a checkbox is checked (many checks wow! :scream:), it expects to receive a `WebElementPromise`
```js
test('a checkbox is checked', () => {
  driver.get('somewhere');
  return expect(driver.findElements(By.css('input[type="checkbox"]'))).resolves.toBeChecked();
});
```

#### expect.resolves[.not].toBeEditable()
`toBeEditable` checks that an input is editable (enabled and not readonly), it expects to receive a `WebElementPromise`
```js
test('an input is editable', () => {
  driver.get('somewhere');
  return expect(driver.findElements(By.css('input'))).resolves.toBeEditable();
});
```

#### expect.resolves[.not].toHaveValue(value)
`toHaveValue` checks that an input value is what you expect, it expects to receive a `WebElementPromise`
```js
test('an input has the value', () => {
  driver.get('somewhere');
  return expect(driver.findElements(By.css('input'))).resolves.toHaveValue('test');
});
```

#### expect.resolves[.not].toHaveSelectedValue(value)
`toHaveValue` checks that a select value is what you expect (will fail on other inputs), it expects to receive a `WebElementPromise`
```js
test('a select has the right value', () => {
  driver.get('somewhere');
  return expect(driver.findElements(By.css('select'))).resolves.toHaveSelectedValue('test');
});
```

#### expect.resolves[.not].toHaveText(value)
`toHaveValue` checks that an element `innetText` is what you expect, it expects to receive a `WebElementPromise`
```js
test('the paragraph has the correct text', () => {
  driver.get('somewhere');
  return expect(driver.findElements(By.css('p'))).resolves.toHaveText('some nice text, maybe lorem ipsum');
});
```
