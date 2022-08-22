const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");
const { getApodRequest } = require("../../specs/helper/service-helper");
const validTestData = require("../../data/test-data/valid-params-test-data.json");

describe("NASA API Health - Astronomy Picture of the Day", () => {
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
    });
});
