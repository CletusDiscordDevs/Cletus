const chalk = require('chalk');

class Logger {
  static debug (entity, str) {
    let tstp = new Date().toLocaleString('en-US');
    chalk.blueBright(`${tstp} DEBUG/${entity}: ${str}`);
  }

  static info (entity, str) {
    let tstp = new Date().toLocaleString('en-US');
    chalk.green(`${tstp} INFO/${entity}: ${str}`);
  }

  static warn (entity, str) {
    let tstp = new Date().toLocaleString('en-US');
    chalk.yellow(`${tstp} WARN/${entity}: ${str}`);
  }

  static error (entity, str) {
    let tstp = new Date().toLocaleString('en-US');
    chalk.redBright(`${tstp} ERROR/${entity}: ${str}`);
  }
}

module.exports = Logger;
