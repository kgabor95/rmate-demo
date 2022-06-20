"use strict";
const { expect } = require("chai");
const { init } = require("../helper/auth");

let service;
before(async () => {
    service = await init();
});

describe("Api\Method DESC", () => {
    it("should return a response", async () => {
        const response = await service.get("/planetary/apod?api_key=DEMO_KEY");

        console.log("GET [planetary/apod] response: \n", response);
        expect(response.data).to.not.be.undefined;
    });
});
