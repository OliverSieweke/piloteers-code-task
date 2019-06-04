"use strict";

module.exports = { getLocationDetails };

const path = require("path");
const { readFile } = require("./fs-promise.js");
const { formatPromise } = require("./format-promise.js");

const { calculateDistanceToOffice } = require("./calculate-distance.js");

/**
 * Retrieves a location's details, including the calculated distance to the office.
 *
 * @async
 * @param   {string}    name            Location name (should not include a .json extension)
 * @return  {{latitude: number, longitude: number, additionalData: any, distanceToOffice: number}[]}
 *                                      The distance to the office is given in kilometers
 */
async function getLocationDetails(name) {
    const absolutePath = path.join(__dirname, "../locations", `${name}.json`);

    const [err, file] = await formatPromise(readFile(absolutePath));

    if (err) {
        console.error(`Could not retrieve location ${name} from ${absolutePath}:\n${err.stack}`);
        throw err;
    }

    let location;
    try {
        location = JSON.parse(file);
    } catch (err) {
        console.error(`Location ${name} at ${absolutePath} could not be parsed:\n${err.stack}`);
        throw err;
    }

    location.name = name;

    if (!location.hasOwnProperty("latitude") || !location.hasOwnProperty("longitude")) {
        console.error(`Complete coordinates are not available for location ${name} at ${absolutePath} could not calculate distance to office`);
    } else {
        const { latitude, longitude } = location;
        location.distanceToOffice = calculateDistanceToOffice(latitude, longitude);
    }

    return location;
}
