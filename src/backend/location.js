"use strict";

const path = require("path");

const express = require("express");
const router = express.Router(); /* eslint-disable-line new-cap */
const multer = require("multer");

const { formatPromise } = require("./lib/format-promise.js");
const { access, unlink } = require("./lib/fs-promise.js");
const { validateLocation } = require("./lib/location-schema-validator.js");

module.exports = router;

// ======================================= Multer Configs ======================================= \\
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, path.join(__dirname, "/locations"));
    },
    filename(req, file, callback) {
        callback(null, file.originalname);
    },
});

async function fileFilter(req, file, callback) {
    const { mimetype, originalname } = file;

    if (mimetype !== "application/json") {
        console.error(`fileFilter: Invalid mimetype ${mimetype} for file ${originalname}`);
        req.fileValidationError = [415, new Error("file should be of type application/json")]; /* eslint-disable-line no-param-reassign */
        return callback(null, false);
    }

    const [err] = await formatPromise(access(path.join(__dirname, "locations", originalname)));
    if (!err) { // File already exists!
        const validationError = new Error(`location '${originalname.replace(/.json$/u, "")}' already exists`);
        req.fileValidationError = [409, validationError]; /* eslint-disable-line no-param-reassign */
        return callback(null, false);
    }

    return callback(null, true);
}

const upload = multer({ storage, fileFilter });


// ========================================= POST Route ========================================= \\
router.post("/", upload.single("location"), async (req, res, next) => {
// I) Handle Missing File, Invalid Format and Existing Locations -----------------------------------
    const { file, fileValidationError } = req;

    if (fileValidationError) {
        const [code, error] = fileValidationError;
        console.error(`File validation error:\n${error.stack}`);
        return res.status(code).send(error.message);
    } else if (!file) {
        console.error("Invalid request: no file was found.");
        return res.status(400).send("request should contain a JSON file");
    }

// II) Check JSON Conforms to Schema ---------------------------------------------------------------
    const { filename, path: absolutePath } = req.file;

    const [err, validationResult] = await formatPromise(validateLocation(filename));

    if (validationResult === true) {
        return res.status(201).send(validationResult.message);
    } else {
        const [unlinkingError] = await formatPromise(unlink(absolutePath));
        if (unlinkingError) {
            // TODO: there should be a way to clean up later if the unlinking failed on the first attempt.
            console.error(`Error in removing location with path ${path}:\n${unlinkingError}`);
        }

        if (validationResult instanceof Error) { // Unprocessable Entity Error
            return res.status(422).send(validationResult.message);
        } else { // Internal Server Error
            return next(err || new Error(`Unexpected validation result ${validationResult} for location ${filename}.`));
        }
    }
});
