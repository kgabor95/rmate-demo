/* eslint-disable max-len */
const { expect, assert } = require("chai");
const { unauthenticatedErrorMessage, invalidFieldCombinationMessage } = require("../../specs/constants/apod-error-message.constants");
const { StatusCodes } = require("http-status-codes");
const { getApodRequest } = require("../../specs/helper/service-helper");
const validParamsTestData = require("../../data/test-data/valid-params-test-data.json");
const invalidEdgeCaseTestData = require("../../data/test-data/invalid-edge-case-test-data.json");
const invalidParamCombinations = require("../../data/test-data/invalid-param-combinations-test-data.json");
const validateSchema = require("../../specs/json-schemas/apod.json-schemas");

describe("NASA API Regression - Astronomy Picture of the Day", () => {
    describe("authenticated - GET /planetary/apod", () => {
        describe("positive cases", () => {
            // outline
            for (let i = 0; i < validParamsTestData.length; i++) {
                it(`response object should match the schema for: ${validParamsTestData[i].description}`, async () => {
                    const response = await getApodRequest(validParamsTestData[i].params, true);
                    const isValidApodSchema = validateSchema(response.data, validParamsTestData[i].schema);
                    expect(isValidApodSchema).to.be.true;
                });
            }
        });

        describe("negative cases", () => {
            // outline
            for (let i = 0; i < invalidParamCombinations.length; i++) {
                it(`should return proper status, error message in case of: ${invalidParamCombinations[i].description}`, async () => {
                    try {
                        await getApodRequest(invalidParamCombinations[i].params, true);
                        assert.fail(`Request processing did not fail with HTTP Error Code '${StatusCodes.BAD_REQUEST}' and error msg: '${invalidFieldCombinationMessage}'`);
                    } catch (ex) {
                        // console.debug("Error message: ", ex.response.data);
                        expect(ex.response.status).to.be.equal(StatusCodes.BAD_REQUEST);
                        expect(ex.response.data.msg).to.be.equal(invalidFieldCombinationMessage);
                    }
                });
            }
            for (let i = 0; i < invalidEdgeCaseTestData.length; i++) {
                it(`should return proper status, error message in case of: ${invalidEdgeCaseTestData[i].description}`, async () => {
                    try {
                        await getApodRequest(invalidEdgeCaseTestData[i].params, true);
                        assert.fail(`Request processing did not fail with HTTP Error Code '${StatusCodes.BAD_REQUEST}' and error msg: 'TODO'`);
                    } catch (ex) {
                        // console.debug("Error message: ", ex.response.data);
                        expect(ex.response.status).to.be.equal(StatusCodes.BAD_REQUEST);
                    }
                });
            }
        });
    });

    describe("unauthenticated - GET /planetary/apod", () => {
        describe("negative cases", () => {
            // outline
            for (let i = 0; i < validParamsTestData.length; i++) {
                it(`should return proper status, code, message for: ${validParamsTestData[i].description}`, async () => {
                    try {
                        await getApodRequest(validParamsTestData[i].params);
                        assert.fail(`Request processing did not fail with HTTP Error Code '${StatusCodes.FORBIDDEN}' and error msg: '${unauthenticatedErrorMessage}'`);
                    } catch (ex) {
                        // console.debug("Error message: ", ex.response.data);
                        expect(ex.response.status).to.be.equal(StatusCodes.FORBIDDEN);
                        expect(ex.response.data.error.code).to.equal("API_KEY_MISSING");
                        expect(ex.response.data.error.message).to.equal(unauthenticatedErrorMessage);
                    }
                });
            }
        });
    });
});
