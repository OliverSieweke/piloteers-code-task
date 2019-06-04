"use strict";

module.exports = { formatPromise };

/**
 * Formats the promise result.
 *
 * @param {Promise} promise
 * @return {Promise<Array>} * Resolves to [null, result] on original promise resolution.
 *
 *                          * Resolves to [err, null] on original promise rejection.
 */
async function formatPromise(promise) {
    try {
        const result = await promise;
        return [null, result];
    } catch (err) {
        return [err, null];
    }
}
