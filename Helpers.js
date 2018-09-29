const fs = require('fs');
const path = require('path');

function loadDirectory(dir) {
  // exported accessory objects loaded from this dir
  var accessories = [];

  fs.readdirSync(dir).forEach(function(file) {
    // "Accessories" are modules that export a single accessory.
    if (file.split('_').pop() === 'accessory.js') {
      // console.log(file);
      // console.log('Parsing accessory: %s', file);
      // console.log(path.join(dir, file));
      var loadedAccessory = require(path.join(dir, file)).accessory;
      accessories.push(loadedAccessory);
    }
  });
  // be object-literal JSON-style accessories)
  return accessories.map(function(accessory) {
    if (accessory === null || accessory === undefined) { //check if accessory is not empty
      console.log('Invalid accessory!');
      return false;
    } else {
      // force correct accessories
      return accessory;
    }
  }).filter(function(accessory) { return accessory ? true : false; });
}

module.exports = {
  loadDirectory,
};
