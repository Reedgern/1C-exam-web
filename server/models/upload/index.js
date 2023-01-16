const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const dataJSONFilePath = path.join(
  'server',
  'models',
  'upload',
  'data.json',
);
const adapter = new FileSync(dataJSONFilePath);
const database = low(adapter);

// Set some defaults
// database
//   .defaults({
//     image: {
//         id: '1'
//     },
//   })
//   .write();

module.exports.uploadModel = database;
