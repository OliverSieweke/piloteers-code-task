"use strict";

const { calculateDistanceToOffice } = require("../backend/lib/calculate-distance.js");

test("distance to itself is 0", () => {
    const office = require("../backend/locations/office.json");
    const { latitude, longitude } = office;

    expect(calculateDistanceToOffice(latitude, longitude)).toBe(0);
});

test("distance to Paris is 876.918", () => {
    const paris = require("../backend/locations/paris.json");
    const { latitude, longitude } = paris;

    expect(calculateDistanceToOffice(latitude, longitude)).toBe(876.918); /* eslint-disable-line no-magic-numbers */

});

test("distance to Waiheke is 17760.526km", () => {
    const waiheke = require("../backend/locations/waiheke.json");
    const { latitude, longitude } = waiheke;

    expect(calculateDistanceToOffice(latitude, longitude)).toBe(17760.526); /* eslint-disable-line no-magic-numbers */
});
