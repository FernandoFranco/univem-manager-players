module.exports = class Validator {
  constructor() {
    this.errors = {};
  }

  add(key, message) {
    if (!this.errors[key]) {
      this.errors[key] = [];
    }

    this.errors[key].push(message);
  }

  haveAnError() {
    return Object.keys(this.errors).length > 0;
  }
}
