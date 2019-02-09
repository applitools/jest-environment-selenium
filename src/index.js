import NodeEnvironment from 'jest-environment-node';
import webdriver from 'selenium-webdriver';
import proxy from 'selenium-webdriver/proxy';

class WebdriverEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.configuration = Object.assign(
      {
        capabilities: {
          browserName: 'chrome'
        }
      },
      config.testEnvironmentOptions
    );
    this.global.By = webdriver.By;
    this.global.until = webdriver.until;
    this.global.configuration = this.configuration;
    this.global.cleanup = async () => {
      await this.global.driver.quit();
      this.global.driver = await buildDriver(this.configuration);
    };
  }

  async setup() {
    await super.setup();
    this.global.driver = await buildDriver(this.configuration);
  }

  async teardown() {
    if (this.global.driver) {
      await this.global.driver.quit();
    }
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

async function buildDriver(configuration) {
  var chrome = require('selenium-webdriver/chrome');
  if (configuration.server){
    var service = new chrome.ServiceBuilder('/Users/p/pro/demo/node_modules/chromedriver/bin/chromedriver').build();
    chrome.setDefaultService(service);
  }
  const driver = new webdriver.Builder().withCapabilities(configuration.capabilities);

  if (configuration.server) driver.usingServer(configuration.server);
  if (configuration.proxyType) {
    let prxy;
    if (configuration.proxyType === 'socks') {
      prxy = proxy.socks(configuration.proxyOptions.socksProxy, configuration.proxyOptions.socksVersion);
    } else {
      prxy = proxy[configuration.proxyType](configuration.proxyOptions);
    }
    driver.setProxy(prxy);
  }

  return driver.build();
}

module.exports = WebdriverEnvironment;
