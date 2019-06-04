"use strict";

const { access, readdir, readFile, unlink } = require("fs");

module.exports = {
    access: accessPromisified,
    readdir: readdirPromisified,
    readFile: readFilePromisified,
    unlink: unlinkPromisified,
};

/**
 * Promisified version of fs.access.
 *
 * @async
 * @param   {string}    path
 * @param   {number}    [mode]
 */
function accessPromisified(path, mode) {
    return new Promise((resolve, reject) => {
        access(
            path,
            mode,
            (err, result) => (err ? reject(err) : resolve(result)),
        );
    });
}

/**
 * Promisified version of fs.readdir.
 *
 * @async
 * @param   {string}    path
 * @param   {object}    [options]
 */
function readdirPromisified(path, options = {}) {
    return new Promise((resolve, reject) => {
        readdir(
            path,
            options,
            (err, result) => (err ? reject(err) : resolve(result)),
        );
    });
}

/**
 * Promisified version of fs.readFile.
 *
 * @async
 * @param   {string}    path
 * @param   {object}    [options]
 */
function readFilePromisified(path, options = {}) {
    return new Promise((resolve, reject) => {
        readFile(
            path,
            options,
            (err, result) => (err ? reject(err) : resolve(result)),
        );
    });
}

/**
 * Promisified version of fs.unlink.
 *
 * @async
 * @param   {string}    path
 */
function unlinkPromisified(path) {
    return new Promise((resolve, reject) => {
        unlink(
            path,
            (err, result) => (err ? reject(err) : resolve(result)),
        );
    });
}
