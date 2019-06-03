"use strict";

const path = require("path");
const express = require("express");
const app = express();
const { port } = require("./configs.json");

app.use(express.static(path.join(__dirname, "../public")));

app.use((req, res) => {
    res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => { /* eslint-disable-line no-unused-vars */ // Function signature required for Express Error Handling.
    console.error(`Express Error:\n${err.stack}`);
    res.status(500).send("Something broke!");
});

app.listen(port, () => console.log(`Server listening on port ${port} in ${process.env.NODE_ENV} mode !`));
