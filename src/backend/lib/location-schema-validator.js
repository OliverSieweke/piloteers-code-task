"use strict";

module.exports = { validateLocation };

const path = require("path");
const { readFile } = require("./fs-promise.js");
const { formatPromise } = require("./format-promise.js");

const locationSchema = require("../location.schema.json");
const Ajv = require("ajv");
const ajv = new Ajv();

/**
 * Validates location JSON documents according to the schema location.schema.json.
 *
 * @param   {string}    filename        With .json extension
 * @return  {Promise<boolean|Error>}    Returns a boolean indicating the validity or an error object if the location could not be found or parsed.
 */
async function validateLocation(filename) {
    const absolutePath = path.join(__dirname, `../locations/${filename}`);

    const [err, data] = await formatPromise(readFile(absolutePath));

    if (err) {
        console.error(`validateLocation: Error in reading file ${absolutePath}:\n${err.stack}`);
        throw err;
    }

    let jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (err) {
        console.error(`validateLocation: Error in parsing file ${absolutePath}:\n${err.stack}`);
        return new Error("data should be valid JSON");
    }

    const valid = ajv.validate(locationSchema, jsonData);

    return valid || new Error(ajv.errorsText());
}
