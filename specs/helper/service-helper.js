const axios = require("axios");
const url = require("url");
const apiKey = process.env.NASA_API_KEY;

async function getApodRequest(payload, authenticated) {
    const params = new url.URLSearchParams(payload);
    if (authenticated === true) {
        params.append("api_key", apiKey);
    }
    console.log("Request: ", `https://api.nasa.gov/planetary/apod?${params}`);
    const res = await axios.get(`https://api.nasa.gov/planetary/apod?${params}`);

    const data = res.data;
    console.log("Response: ", data);

    return res;
}

module.exports = {
    getApodRequest,
};
