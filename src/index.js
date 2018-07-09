import NodeEnvironment from 'jest-environment-node';
import webdriver from 'selenium-webdriver';

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
  const driver = new webdriver.Builder().withCapabilities(configuration.capabilities);

  if (configuration.server) driver.usingServer(configuration.server);

  return driver.build();
}

module.exports = WebdriverEnvironment;
