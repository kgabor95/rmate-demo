const axios = require("axios");
const url = require("url");
const apiKey = process.env.NASA_API_KEY;

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
        if (apiKey) {
            params.append("api_key", apiKey);
        } else {
            console.error("NASA_API_KEY Secret is missing!");
        }
    }
    // console.debug("Request: ", `https://api.nasa.gov/planetary/apod?${params}`);
    const res = await axios.get(`https://api.nasa.gov/planetary/apod?${params}`);

    return res;
}

module.exports = {
    getApodRequest,
};
