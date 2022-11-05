/* eslint-disable camelcase */
const ajvInstance = require("./ajv-instance");
const todayDate = new Date().toISOString().split("T")[0];

const apodItemSchema = {
    type: "object",
    properties: {
        copyright: {
            type: "string",
        },
        date: {
            type: "string",
            format: "date",
            formatMaximum: `${todayDate}`,
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

const apodArraySchema = {
    type: "array",
    items: apodItemSchema,
};

const schemas = {
    apodItemSchema,
    apodArraySchema,
};

/**
 * Schema validation
 *
 * @param  {string} data Response message to validate
 * @param  {string} schema Expected schema of the response
 * @returns {boolean} Schema is valid or not
 */
function validateSchema(data, schema) {
    const validate = ajvInstance.compile(schemas[schema]);
    const valid = validate(data);
    if (!valid) {
        console.error(validate.errors);
        return false;
    }
    return true;
}

module.exports = validateSchema;
