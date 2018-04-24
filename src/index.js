import NodeEnvironment from "jest-environment-node";
import webdriver from "selenium-webdriver";

class WebdriverEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.configuration = JSON.parse(process.env.configuration);
  }

  async setup() {
    await super.setup();
    this.global.driver = await buildDriver(this.configuration);
    this.global.By = webdriver.By;
    this.global.until = webdriver.until;
    console.log(this.global);
  }

  async teardown() {
    await this.global.driver.quit();
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
