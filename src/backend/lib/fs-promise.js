"use strict";

const { access, readFile, unlink } = require("fs");

module.exports = {
    access: accessPromisified,
    readFile: readFilePromisified,
    unlink: unlinkPromisified,
};

function accessPromisified(path, mode) {
    return new Promise((resolve, reject) => {
        access(
            path,
            mode,
            (err, result) => (err ? reject(err) : resolve(result)),
        );
    });
}
function readFilePromisified(path, options = {}) {
    return new Promise((resolve, reject) => {
        readFile(
            path,
            options,
            (err, result) => (err ? reject(err) : resolve(result)),
        );
    });
}

function unlinkPromisified(path) {
    return new Promise((resolve, reject) => {
        unlink(
            path,
            (err, result) => (err ? reject(err) : resolve(result)),
        );
    });
}
