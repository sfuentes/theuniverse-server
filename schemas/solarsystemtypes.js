var mongoose = require('mongoose');
var solarSystemTypesSchema = mongoose.Schema({
    sizes : 'array', // space taken refs to 1 so 0.1 - 0.5 means  half o the max max
    orbits : 'array', // [3,6]
    planettypes : 'array', // Startreck based Class System :)  For the sake of simplicity we only have D,H,J,K,L,M,N,T,Y
                           // System can contain [C,D,E,J,M]
    planettypemod : 'array', // exp. [0.5,0.3,0.8,0.3] ->
    name : 'string',  // to be given later on
    id : 'number'
});
module.exports = solarSystemTypesSchema;