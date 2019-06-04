"use strict";

const path = require("path");
const { unlinkSync } = require("fs");
const FILES_TO_UNLINK = [];
const request = require("supertest");
let server;

beforeAll(() => ({ server } = require("../backend/server.js")));


test("201 on valid location", async () => {
    FILES_TO_UNLINK.push("valid-location.json");
    const response = await request(server).post("/location")
                                          .field("location", "location")
                                          .attach(
                                              "location",
                                              path.join(__dirname, "test-locations/valid-location.json"),
                                          );

    expect(response.status).toEqual(201);

});

test("400 on invalid request", async () => {
    const response = await request(server).post("/location");

    expect(response.status).toEqual(400);
});

test("409 on existing location", async () => {
    const response = await request(server).post("/location")
                                          .attach("location", path.join(__dirname, "test-locations/office.json"));

    expect(response.status).toEqual(409);
});

test("409 on non JSON file", async () => {
    FILES_TO_UNLINK.push("invalid.txt");
    const response = await request(server).post("/location")
                                          .attach("location", path.join(__dirname, "test-locations/invalid.txt"));

    expect(response.status).toEqual(415);
});
test("422 on invalid JSON format", async () => {
    FILES_TO_UNLINK.push("invalid-json.json");
    const response = await request(server).post("/location")
                                          .attach("location", path.join(__dirname, "test-locations/invalid-json.json"));

    expect(response.status).toEqual(422);
});

test("422 on invalid JSON schema", async () => {
    FILES_TO_UNLINK.push("invalid-latitude.json");
    const response = await request(server).post("/location")
                                          .field("location", "location")
                                          .attach(
                                              "location",
                                              path.join(__dirname, "test-locations/invalid-latitude.json"),
                                          );

    expect(response.status).toEqual(422);
});

afterAll(() => {
    server.close();

    for (const fileToUnlink of FILES_TO_UNLINK) {
        try {
            unlinkSync(path.join(__dirname, "../backend/locations", fileToUnlink));
        } catch (err) { /* eslint-disable-line no-unused-vars */
            // All manipulated files are added to FILES_TO_UNLINK to guarantee everything gets cleaned up,
            // some may never get saved to start with and cannot be unlinked, which is fine
        }
    }
});
