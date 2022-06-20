/* eslint-disable camelcase */
"use strict";

const axios = require("axios");
const { baseURL, timeout } = require("./config");

/**
 * Create a new instance of axios with the cusstom config.
 *
 * @returns {Promise.<AxiosInstance>}
 */
module.exports.init = async () => axios.create({
    baseURL,
    timeout,
});

