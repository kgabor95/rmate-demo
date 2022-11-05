const axios = require("axios");
const url = require("url");
const {HOST, APOD_PATH, API_KEY} = require("../data/constants/constants");

const createUrl = (path, query) => [HOST, path].join("/") + (query ? `?${query}` : query);

/**
 * Create get request for Apod
 *
 * @param  {String} payload request parameters
 * @param  {boolean} isAuthenticatedSession true if API key is provided
 * @return response of the Apod API
 */
async function getApodRequest(payload, isAuthenticatedSession) {
    const params = new url.URLSearchParams(payload);
    if (isAuthenticatedSession === true) {
        if (API_KEY) {
            params.append("api_key", API_KEY);
        } else {
            console.error("NASA_API_KEY Secret is missing!");
        }
    }
    const requestUrl = createUrl(APOD_PATH, params);
    const res = await axios.get(requestUrl);

    return res;
}

module.exports = {
    getApodRequest,
};
