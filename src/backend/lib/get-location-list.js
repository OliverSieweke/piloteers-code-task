"use strict";

module.exports = { getLocationList };

const path = require("path");
const { readdir } = require("./fs-promise.js");
const { formatPromise } = require("./format-promise.js");


/**
 * Retrieves the list of all locations.
 *
 * @async
 * @param   {number}    sort = 1        Sort order. By default the locations are sorted in ascending alphabetical order. Set to -1 to sort in descending order.
 * @return  {Array}                     Array of alphabetically sorted locations
 */
async function getLocationList(sort = 1) {
    const absolutePath = path.join(__dirname, "../locations");
    const [err, fileList] = await formatPromise(readdir(absolutePath));

    if (err) {
        console.error(`Error in retrieving location list from directory ${absolutePath}:\n${err.stack}`);
        throw err;
    }

    const locationList = fileList.map(file => file.replace(/.json$/u, ""))
                                 .sort((a, b) => (a > b ? 1 : -1)*sort);
    return locationList;
}
