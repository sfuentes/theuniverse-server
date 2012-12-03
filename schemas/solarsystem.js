var mongoose = require('mongoose');
var systemSchema = mongoose.Schema({
    name : 'string',
    region : 'string', // for LookUp Conv
    pos : { x : 'number', y : 'number', z : 'number' },
    sun : {
        id : 'number'
    },
    solarsytem : {
        planets : 'array', // ID's
        orbits : 'array'
    }
});
module.exports = systemSchema;