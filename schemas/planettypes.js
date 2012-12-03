/**
 * User: sfuentes
 * Date: 02.12.12
 * Time: 20:21
 */
var mongoose = require('mongoose');
var planetTypesSchema = mongoose.Schema({
    name        : 'string',
    resources   : 'array', // possible Resources / ObjectId's
    type        : 'string'
});
module.exports = planetTypesSchema;