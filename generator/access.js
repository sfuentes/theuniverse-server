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
app.get('/data', function (req, res) {

    var region = req.param('region');

    regionsModel.find({ pos : {x : parseInt(region.x,10), y: parseInt(region.y,10)}}, function (err, region) {
        //.forEach(function (systemid) {
            systemModel.find({region : region[0]._id}, function (err,system ) {
                console.log(system)
                res.send(JSON.stringify({sys : system}));
            });
        //});
    });


});

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {

});

app.listen(3000);