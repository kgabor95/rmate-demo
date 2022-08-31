const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const config = require("./json-schema.config.json");

const ajvInstance = new Ajv(config);
addFormats(ajvInstance);

module.exports = ajvInstance;
