const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");
const { getApodRequest } = require("../../helper/service-helper");
const validTestData = require("../../../data/test-data/valid-params-test-data.json");

describe("NASA API Health - Astronomy Picture of the Day", () => {
    describe("authenticated - GET /planetary/apod", () => {
        describe("positive cases", () => {
            // outline
            for (const element of validTestData) {
                it(`should return proper status code for: ${element.description}`, async () => {
                    const response = await getApodRequest(element.params, true);
                    expect(response.status).to.be.equal(StatusCodes.OK);
                });
            }
        });
    });
});
