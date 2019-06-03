"use strict";

const path = require("path");

const { port } = require("./configs.json");

const express = require("express");
const app = express();
const location = require("./location.js");


app.use(express.static(path.join(__dirname, "../public")));

app.use("/location", location);

app.use((req, res) => {
    res.status(404).send();
});

app.use((err, req, res, next) => { /* eslint-disable-line no-unused-vars */ // Function signature required for Express Error Handling.
    console.error(`${err.stack}`);
    res.status(500).send();
});

app.listen(port, () => console.log(`Server listening on port ${port} in ${process.env.NODE_ENV} mode !`));
