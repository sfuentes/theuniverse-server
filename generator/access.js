/**
 * User: sfuentes
 * Date: 27.11.12
 * Time: 19:14
 */
var mongoose = require('mongoose');
var express = require('express');
var opts = { user : 'theuniverse', pass : 'abc'};
var db = mongoose.createConnection('oceanic.mongohq.com','app23625694', 10020 ,opts);
var port = process.env.PORT || 3000;

var app = express();

var solarsystemtypesSchema = require('../schemas/solarsystemtypes.js');
var solarsystemsSchema = require('../schemas/solarsystem.js');
var regionsSchema = require('../schemas/regions.js');
var suntypesSchema = require('../schemas/suntypes.js');

var regionsModel = db.model('regions', regionsSchema);
var systemModel = db.model('systems', solarsystemsSchema);
var sunModel = db.model('startypes', suntypesSchema);

var systems = [];
app.get('/data', function (req, res) {

    var region = req.param('region');

    regionsModel.find({ pos : {x : parseInt(region.x, 10), y : parseInt(region.y, 10)}}, function (err, region) {
        systemModel.find({region : region[0]._id}, function (err, system) {
            console.log(system);
            res.send(JSON.stringify({sys : system}));
        });

    });
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {

});

app.listen(port);