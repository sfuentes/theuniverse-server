/**
 * User: sfuentes
 * Date: 01.12.12
 * Time: 15:44
 */
var mongoose = require('mongoose');
var orbitSchema = mongoose.Schema({
    place  : 'number',
    systemid : 'ObjectId'
});
module.exports = orbitSchema;