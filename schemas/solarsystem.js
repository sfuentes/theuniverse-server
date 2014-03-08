var mongoose = require('mongoose');
var systemSchema = mongoose.Schema({
    name : 'string',
    region : 'string', // for LookUp Conv
    pos : { x : 'number', y : 'number', z : 'number' },
    sun : {
        id : 'number',
        size : 'number',
        color : 'string'
    },
    solarsytem : {
        planets : 'array', // ID's
        orbits : 'array'
    }
});

systemSchema.methods.getWithSun = function (cb) {

    return this.find({ type: this.type }, cb);
}

module.exports = systemSchema;