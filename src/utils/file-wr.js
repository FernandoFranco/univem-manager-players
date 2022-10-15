const fs = require('fs');

module.exports = class FileWR {
  constructor(filePath) {
    this.filePath = filePath;

    if (!fs.existsSync(filePath)) {
      fs.appendFile(filePath, '[]', (error) => {
        console.error(error);
      });
    }
  }

  readItems(callback) {
    fs.readFile(this.filePath, (error, data) => {
      if (error) {
        return callback(error);
      }

      const list = JSON.parse(data);
      callback(null, list);
    });
  }

  additem(item, callback) {
    this.readItems((error, list) => {
      if (error) {
        return callback(error);
      }

      list.push(item);
      fs.writeFile(this.filePath, JSON.stringify(list, null, 2), callback);
    });
  }
}
