/* eslint-disable max-len */
const { expect, assert } = require("chai");
const { unauthenticatedErrorMessage, invalidFieldCombinationMessage } = require("../../specs/constants/apod-error-message.constants");
const { StatusCodes } = require("http-status-codes");
const { getApodRequest } = require("../../specs/helper/service-helper");
const validTestData = require("../../data/test-data/valid-params-test-data.json");
const invalidTestData = require("../../data/test-data/invalid-params-test-data.json");

describe("NASA API Regression - Astronomy Picture of the Day", () => {
    describe("authenticated - GET /planetary/apod", () => {
        describe("positive cases", () => {
            // outline
            for (let i = 0; i < validTestData.length; i++) {
                it(`should return proper status code for: ${validTestData[i].description}`, async () => {
                    const response = await getApodRequest(validTestData[i].params, true);
                    expect(response.status).to.be.equal(StatusCodes.OK);
                });
            }
        });
        describe("negative cases", () => {
            // outline
            for (let i = 0; i < invalidTestData.length; i++) {
                it.only(`should return proper status code for: ${invalidTestData[i].description}`, async () => {
                    try {
                        await getApodRequest(invalidTestData[i].params, true);
                        assert.fail(`Request processing did not fail with HTTP Error Code '${StatusCodes.BAD_REQUEST}' and error msg: '${invalidFieldCombinationMessage}'`);
                    } catch (ex) {
                        console.log("Error message: ", ex.response.data);
                        expect(ex.response.status).to.be.equal(StatusCodes.BAD_REQUEST);
                        expect(ex.response.data.msg).to.be.equal(invalidFieldCombinationMessage);
                    }
                });
            }
        });
    });

    describe("unauthenticated - GET /planetary/apod", () => {
        describe("negative cases", () => {
            // outline
            for (let i = 0; i < validTestData.length; i++) {
                it(`should return proper status code for: ${validTestData[i].description}`, async () => {
                    try {
                        await getApodRequest(validTestData[i].params);
                        assert.fail(`Request processing did not fail with HTTP Error Code '${StatusCodes.FORBIDDEN}' and error msg: '${unauthenticatedErrorMessage}'`);
                    } catch (ex) {
                        console.log("Error message: ", ex.response.data);
                        expect(ex.response.status).to.be.equal(StatusCodes.FORBIDDEN);
                        expect(ex.response.data.error.code).to.equal("API_KEY_MISSING");
                        expect(ex.response.data.error.message).to.equal(unauthenticatedErrorMessage);
                    }
                });
            }
        });
    });
});
