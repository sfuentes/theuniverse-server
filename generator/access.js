/**
 * User: sfuentes
 * Date: 27.11.12
 * Time: 19:14
 */
var mongoose = require('mongoose');
var express = require('express');
var db = mongoose.createConnection('localhost', 'theuniverse');

var app = express();

var regionsSchema = mongoose.Schema({
    pos : { x : 'number', y : 'number'},
    name : 'string',
    region : {
        layout : 'array',
        systems : 'number',
        coll : 'number'
    }
});
var systemSchema = mongoose.Schema({
    name : 'string',
    pos : { x : 'number', y : 'number', z : 'number' },
    sun : {
        id : 'number',
        color : "string"
    },
    planets : [],
    region : 'string' // for LookUp Conv
});

var regionsModel = db.model('regions', regionsSchema);
var systemModel = db.model('systems', systemSchema);
var systems = [];

regionsModel.find({ pos : { x : 2, y : 2 }}, function (err, region) {
    console.log(region.pos);
    region[0].region.layout.forEach(function (systemid) {
        systemModel.find({_id : systemid}, function (err, system) {
            systems.push(system);
        });
    });
});
app.get('/data', function (req, res) {

    res.send(JSON.stringify({ sys : systems}));
});

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {

});

app.listen(3000);