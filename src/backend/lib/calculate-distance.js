"use strict";

const EARTH_RADIUS = 6371;

module.exports = { calculateDistanceToOffice };

const { latitude: officeLatitude, longitude: officeLongitude } = require("../locations/office.json");

/**
 * Calculates the flight distance to the office in kilometers using the Haversine Formula.
 *
 * @see https://en.wikipedia.org/wiki/Haversine_formula
 *
 * @param   {number}          locationLatitude
 * @param   {number}          locationLongitude
 * @return  {number}          Distance to the office in kilometers
 */
function calculateDistanceToOffice(locationLatitude, locationLongitude) {

    const latitudeDifference = degreesToRadians(officeLatitude - locationLatitude);
    const longitudeDifference = degreesToRadians(officeLongitude - locationLongitude);

    const radiansLocationLatitude = degreesToRadians(locationLatitude);
    const radiansOfficeLatitude = degreesToRadians(officeLatitude);

    const term1 = Math.sin(latitudeDifference/2)**2;
    const term2 = Math.cos(radiansLocationLatitude)*Math.cos(radiansOfficeLatitude)*Math.sin(longitudeDifference/2)**2;

    const distance = 2*EARTH_RADIUS*Math.asin((term1 + term2)**(1/2));

    return distance;
}

function degreesToRadians(degrees) {
    return degrees*Math.PI/180;
}
