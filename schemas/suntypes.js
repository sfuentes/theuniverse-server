/**
 * User: sfuentes
 * Date: 29.11.12
 * Time: 21:40
 */
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