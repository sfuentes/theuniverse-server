/**
 * User: sfuentes
 * Date: 26.11.12
 * Time: 17:29
 */
var mongoose = require('mongoose');
var planetSchema = mongoose.Schema({
    name : 'string',
    orbit : 'ObjectId' ,// Object ID -> Orbit
    pos : 'number',// 360/12 Positions starting at 12 o'clock
    objects : {
        moonorbits : 'array', // possible 20 Orbits  max // [2,5,9,10,14,18] leads to 1st Orbit empty or to be filled with something else
        satelites : 'array'
    },
    resources : 'array' // { id : , name : , amount : }
});
module.exports = planetSchema;