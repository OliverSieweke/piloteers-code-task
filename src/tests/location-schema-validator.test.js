"use strict";

const { validateLocation } = require("../backend/lib/location-schema-validator.js");

test("Valid location is valid", async () => {
    const validity = await validateLocation("../../tests/test-locations/valid-location.json");
    expect(validity).toBe(true);
});

test("Location with missing latitude is invalid", async () => {
    const validity = await validateLocation("../../tests/test-locations/missing-latitude.json");
    expect(validity).toBeInstanceOf(Error);
});

test("Location with missing longitude is invalid", async () => {
    const validity = await validateLocation("../../tests/test-locations/missing-longitude.json");
    expect(validity).toBeInstanceOf(Error);
});

test("Location with invalid latitude is invalid", async () => {
    const validity = await validateLocation("../../tests/test-locations/invalid-latitude.json");
    expect(validity).toBeInstanceOf(Error);
});

test("Location with invalid longitude is invalid", async () => {
    const validity = await validateLocation("../../tests/test-locations/invalid-longitude.json");
    expect(validity).toBeInstanceOf(Error);
});

test("Non-existent location throws error", async () => {
    try {
        await validateLocation("../../tests/test-locations/non-existent-location.json");
    } catch (err) {
        expect(err.constructor.name).toBe("Error"); // Is not the same instance as the global Error object
    }
});

test("Invalid JSON throws error", async () => {
    try {
        await validateLocation("../../tests/test-locations/invalid-json.json");
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
    }
});
