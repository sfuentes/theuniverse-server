/**
 * User: sfuentes
 * Date: 29.11.12
 * Time: 21:20
 */
var mongoose = require('mongoose');
var regionsSchema = mongoose.Schema({
    pos : { x : 'number', y : 'number'},
    name : 'string',
    region : {
        layout : 'array',
        systems : 'number',
        coll : 'number'
    }
});
module.exports = regionsSchema;