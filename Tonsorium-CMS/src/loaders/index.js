const expressLoader =  require('./express');
const localFunctionLoader =  require('./locals');
const { containerSetup } = require("@container");

let init = async (app) => {
  containerSetup(app);
  expressLoader.init(app);
  localFunctionLoader.init(app);
};

module.exports = { init };