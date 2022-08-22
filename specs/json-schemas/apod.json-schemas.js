/* eslint-disable no-magic-numbers */
/* eslint-disable camelcase */
const ajvInstance = require("./ajv-instance");
const todayDate = new Date().toISOString().slice(0, 10);

const apodItemSchema = {
    type: "object",
    properties: {
        date: {
            type: "string",
            format: "date",
            formatExclusiveMaximum: `${todayDate}`,
        },
        explanation: {
            type: "string",
        },
        hdurl: {
            type: "string",
            format: "url",
        },
        media_type: {
            type: "string",
        },
        service_version: {
            type: "string",
        },
        title: {
            type: "string",
        },
        url: {
            type: "string",
            format: "url",
        },
    },
    required: ["date", "explanation", "hdurl", "media_type", "service_version", "title", "url"],
};

const apodSchema = {
    type: "array",
    items: apodItemSchema,
};

module.exports = ajvInstance.compile(apodSchema);
