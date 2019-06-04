# Piloteers Code Task

This is a coding task done for Piloteers aiming at providing an external endpoint for users to upload json files with
 location descriptions as well as an internal API to retrieve information about the uploaded locations.

## Getting Started

Please execute the following commands:

```bash
$ git clone git@github.com:OliverSieweke/piloteers-code-task.git
$ cd piloteers-code-task
$ npm install
$ npm run start
```
A server should be running and listening on  `localhost:7080`.

You can now upload locations through the interface by navigating to `localhost:7080` with the browser (alternatively you
 may use another tool of your choice to send a JSON file as form-data under the `location` key with a POST request to the `/location` 
path).
 
**NB**: You may change the port in the `configs.json` file.

To use the internal API methods you may require the exposed methods wherever needed. E.g:

```js
const { getLocationList } = require("./src/backend/lib/get-location-list.js")
getLocationList().then(locationList => {/* [...] */})
                 .catch(err => {/* [...] */})
```
```js
const { getLocationDetails } = require("./src/backend/lib/get-location-details.js")
getLocationDetails("paris").then(parisDetails => {/* [...] */})
                           .catch(err => {/* [...] */})
```

## Documentation

### External API

The External API documentation was written using [Swagger](https://swagger.io/) and can be found [here](https://app.swaggerhub.com/apis-docs/Oliver-Sieweke/piloteers-code-task/1.0.0).

### Internal API

You can find the project's documentation [here](http://htmlpreview.github.io/?https://github.com/OliverSieweke/piloteers-code-task/blob/master/docs/index.html). (Depending on your browser configurations, you may encounter issues viewing the 
documentation properly through the github html preview - in that case you may prefer to directly open the `/docs/index` file on your local machine)

The project's documentation uses [JSDoc](http://usejsdoc.org/index.html) syntax and is generated with [documentation.js](https://documentation.js.org/).

## Testing

Tests are implemented using the [JEST](https://jestjs.io/) framework and can be run with one of the following:

```bash
$ npm run test
```
```bash
$ npm run test:coverage
```

The tests include unit and integration tests and cover over 90% of the code.
