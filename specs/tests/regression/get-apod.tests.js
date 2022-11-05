/* eslint-disable max-len */
const { expect, assert } = require("chai");
const { unauthenticatedErrorMessage, invalidFieldCombinationMessage } = require("../../constants/apod-error-message.constants");
const { StatusCodes } = require("http-status-codes");
const { getApodRequest } = require("../../helpers/service-helper");
const validParamsTestData = require("../../../data/test-data/valid-params-test-data.json");
const invalidEdgeCaseTestData = require("../../../data/test-data/invalid-edge-case-test-data.json");
const invalidParamCombinations = require("../../../data/test-data/invalid-param-combinations-test-data.json");
const validateSchema = require("../../json-schemas/apod.json-schemas");

describe("NASA API Regression - Astronomy Picture of the Day", () => {
    describe("authenticated - GET /planetary/apod", () => {
        describe("positive cases", () => {
            // outline
            for (const element of validParamsTestData) {
                it(`response object should match the schema for: ${element.description}`, async () => {
                    const response = await getApodRequest(element.params, true);
                    const isValidApodSchema = validateSchema(response.data, element.schema);
                    expect(isValidApodSchema).to.be.true;
                });
            }
        });

        describe("negative cases", () => {
            // outline
            for (const element of invalidParamCombinations) {
                it(`should return proper status, error message in case of: ${element.description}`, async () => {
                    try {
                        await getApodRequest(element.params, true);
                        assert.fail(`Request processing did not fail with HTTP Error Code '${StatusCodes.BAD_REQUEST}' and error msg: '${invalidFieldCombinationMessage}'`);
                    } catch (ex) {
                        expect(ex.response.status).to.be.equal(StatusCodes.BAD_REQUEST);
                        expect(ex.response.data.msg).to.be.equal(invalidFieldCombinationMessage);
                    }
                });
            }
            for (const element of invalidEdgeCaseTestData) {
                it(`should return proper status, error message in case of: ${element.description}`, async () => {
                    try {
                        await getApodRequest(element.params, true);
                        assert.fail(`Request processing did not fail with HTTP Error Code '${StatusCodes.BAD_REQUEST}' and error msg: 'TODO'`);
                    } catch (ex) {
                        expect(ex.response.status).to.be.equal(StatusCodes.BAD_REQUEST);
                    }
                });
            }
        });
    });

    describe("unauthenticated - GET /planetary/apod", () => {
        describe("negative cases", () => {
            // outline
            for (const element of validParamsTestData) {
                it(`should return proper status, code, message for: ${element.description}`, async () => {
                    try {
                        await getApodRequest(element.params);
                        assert.fail(`Request processing did not fail with HTTP Error Code '${StatusCodes.FORBIDDEN}' and error msg: '${unauthenticatedErrorMessage}'`);
                    } catch (ex) {
                        expect(ex.response.status).to.be.equal(StatusCodes.FORBIDDEN);
                        expect(ex.response.data.error.code).to.equal("API_KEY_MISSING");
                        expect(ex.response.data.error.message).to.equal(unauthenticatedErrorMessage);
                    }
                });
            }
        });
    });
});
