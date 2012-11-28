/**
 * User: sfuentes
 * Date: 26.11.12
 * Time: 18:02
 *
 * (8191,8191) Galaxy Regions
 * (32,32,32) Region Solarsystem Spots
 */
var stars = require('./definitions.js');
var name = require('./getName.js');
var galaxySize = [16, 16];
var amountRegion = [ 350, 500 ];
var sunSizes = [100, 200, 300, 500, 800, 1300, 2000, 4100];

var galaxy = {};

var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'theuniverse');

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

var regionsSchema = mongoose.Schema({
    pos : { x : 'number', y : 'number'},
    name : 'string',
    region : {
        layout : 'array',
        systems : 'number',
        coll : 'number'
    }
});

var regionsModel = db.model('regions', regionsSchema);
var systemModel = db.model('systems', systemSchema);


var generateRegion = function (rid) {
    var solarsystems = [], systemids = [] , solarSystemCount = getRandomInt(amountRegion[0], amountRegion[1]), takennames = [], takenpos = [], coll = 0;

    while (solarSystemCount--) {

        var newsystem = solarSystem();

        takennames.forEach(function (name) {
            if (name === newsystem.name) {
                newsystem.name = getName();
                coll++;
            }
        });

        takenpos.forEach(function (pos) {
            if (pos === newsystem.pos) {
                console.log(pos);
                newsystem.pos = getRandomRegionPos();
                coll++;
            }
        });

        newsystem.region = rid;

        var sys = new systemModel(newsystem);

        sys.save(function (err) {
            if (err) // ...
                console.log('möööp');
        });

        takennames.push(newsystem.name);
        takenpos.push(newsystem.pos);
        systemids.push(sys._id);
    }
    return { layout : systemids, systems : systemids.length, collisionen : coll};
}

var getRandomRegionPos = function () {


    return {  x : getRandomInt(0, 16), y : getRandomInt(0, 16), z : getRandomInt(0, 16) }

}

function getName() {
    var raw = name.getRandomName(6, 16).trim(), newname;
    var sp = raw.split("_");
    if (sp.length > 1) {
        newname = sp[0] + " " + sp[1];
    } else {
        if (raw.length > 12) {
            newname = raw.slice(0, 8) + " " + raw.slice(8, 15);
        }
    }

    return newname || raw;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var getStar = function () {

    var len = stars.length;

    return stars[getRandomInt(0, len - 1)];

}
var solarSystem = function () {

    var starname = getName(), star = getStar() , pos = getRandomRegionPos();

    star.size = sunSizes[getRandomInt(0, sunSizes.length)];

    return { name : starname, pos : pos, sun : star, planets : 0 };
}



var generateGalaxy = function () {


    for (var x = 0; x < galaxySize[0]; x++) {

        for (var i = 0; i < galaxySize[1]; i++) {

            var reg = { name : name.getRandomName(3, 7), pos : { x : x, y : i } };

            var region = new regionsModel(reg);

            region.region = generateRegion(region._id);

            region.save(function (err) {
                if (err) // ...
                    console.log('möööp');
            });
        }
    }
}

var ga = generateGalaxy();
regionsModel.find({ pos : {x : 0, y: 1} }, function(e){
    console.log(e);


});
/*
var fs = require('fs');
fs.writeFile("./tmp/region_1.json", JSON.stringify(ga), function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});
*/