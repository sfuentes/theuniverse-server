/**
 * User: sfuentes
 * Date: 29.11.12
 * Time: 21:40
 */

// Size Reference Sun = 1392684 km 1 Unit :) / Earth 12756,2 = 0,109 Units
var mongoose = require('mongoose');
var suntypes = mongoose.Schema({
    "id" : 'number',
    "name" : "string",
    "prop" : 'Number',
    "multiple" : 'number',
    "color" : "string",
    "sizes" : 'array'
});
module.exports = suntypes;