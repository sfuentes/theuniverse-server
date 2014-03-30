/**
 * User: sfuentes
 * Date: 26.11.12
 * Time: 18:02
 *
 * (8191,8191) Galaxy Regions
 * (32,32,32) Region Solarsystem Spots
 */
var WeightedList = require('./js-weighted-list.js'),
    name         = require('./getName.js'),
    mongoose     = require('mongoose'),
    signals      = require('signals');


// Config for now
var galaxySize = { x : 16, y : 16 }; // Fixed size
var amountRegion = { min : 100, max : 500 }; // Range
var sizeRegion = { x : 1, y : 31 }; // Fixed size no borderlining

// Schemas
var solarsystemtypesSchema  = require('../schemas/solarsystemtypes.js');
var solarsystemsSchema      = require('../schemas/solarsystem.js');
var regionsSchema           = require('../schemas/regions.js');
var suntypesSchema          = require('../schemas/sunTypes.js');

var planetsSchema           = require('../schemas/planet.js');
var orbitsSchema            = require('../schemas/orbit.js');

var planettypesSchema       = require('../schemas/planettypes.js');


Generator = {

    init : function () {

        console.log('init');

        this.db = mongoose.createConnection('localhost', 'theuniverse');

        // Globals
        this.data = {};
        this.data.types = {
            sun     : [],
            system  : []
        }

        this.systemcount = 0;

        // Messages
        this.signals = {
            suntypes : {
                loaded : new signals.Signal()
            },
            systemtypes : {
                loaded : new signals.Signal()
            }
        }

        // Models
        this.models = {};
        this.models.regions = this.db.model('regions', regionsSchema);
        this.models.systems = this.db.model('systems', solarsystemsSchema);
        this.models.planets = this.db.model('planets', planetsSchema);
        this.models.orbits  = this.db.model('orbits', orbitsSchema);

        this.models.types = {};
        this.models.types.system = this.db.model('systemtypes', solarsystemtypesSchema);
        this.models.types.sun    = this.db.model('startypes', suntypesSchema);
        this.models.types.planet = this.db.model('planettypes', planettypesSchema);


        // Bind Event Listener
        this.signals.suntypes.loaded.add(this.next);
        this.signals.systemtypes.loaded.add(this.next);

        this.getSuns();
        this.getSystemTypes();
    },
    next : function (context) {

        console.log('next', context.data.types.sun, context.data.types.system);

        if (context.data.types.sun.length > 0 && context.data.types.system.length > 0) {
            if (!context.generation) {
                context.generateGalaxy();
                context.generation = 'started';
            }
        }

    },
    getSuns : function () {

        var that = this;

        this.models.types.sun.find(function (err, suns) {

            //console.log(suns);

            that.data.types.sun = suns;

            that.signals.suntypes.loaded.dispatch(that);
        })
    },
    getSystemTypes : function () {
        var that = this;

        this.models.types.system.find(function (err, systemtypes) {

            that.data.types.system = systemtypes;

            that.signals.systemtypes.loaded.dispatch(that);
        })
    },
    generateRegion : function (rid) {
        var systems = [],
            solarSystemCount = this.getRandomInt(amountRegion.min, amountRegion.max),
            coll = 0;

        while (solarSystemCount--) {

            var newsystem = this.solarSystem();


            for (var i = 0; i < systems.length; i++) {
                var current = systems[i];
                if (newsystem.name === current.name) {
                    newsystem.name = this.getName();
                }
                if (newsystem.pos === current.pos) {
                    newsystem.pos = this.getRandomRegionPos();
                }

            }

            var proto = {
                name : newsystem.name,
                sun  : newsystem.sun,
                pos  : newsystem.pos,
                solarsystem : {
                    planets : [],
                    orbits : []
                },
                region : rid
            }

            var sys = new this.models.systems(proto);
            console.log(sys);
            sys.save(function (err) {
                if (err) // ...
                    console.log('möööp');
            });

        }
        return { layout : systems, systems : systems.length, collisionen : coll};
    },
    getRandomRegionPos : function () {

        return {  x : this.getRandomInt(sizeRegion.x, sizeRegion.y), y : this.getRandomInt(sizeRegion.x, sizeRegion.y), z : this.getRandomInt(sizeRegion.x, sizeRegion.y) }

    },

    getName : function () {
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
    },
    getRandomInt : function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomSize : function(sizes){

        var min = sizes[0], max = sizes[1];

        return this.getRandomInt(min,max);
    },
    getStar : function () {
        var len = this.data.types.sun.length, _star = {}, _size = 0;

        _star = this.data.types.sun[this.getRandomInt(0, (len-1))];

        _size = this.getRandomSize(_star.sizes);

        return { id : _star.id, size : _size, color : _star.color };
    },
    getSystemType : function(){
        var len = this.data.types.system.length;
        return this.data.types.system[this.getRandomInt(0, (len-1))];
    },
    getPlanetCount : function(orbits){
        return this.getRandomInt(0,orbits);
    },
    getOrbits : function(systemtype){
        return this.getRandomInt(systemtype.orbits[0],systemtype.orbits[1]);
    },
    createPlanet : function(system,orbitid){

        var planet = new this.models.planets({
            name : system.name + '',
            orbit : orbitid ,// Object ID -> Orbit
            pos : 0,// 360/12 Positions starting at 12 o'clock
            objects : {
                moonorbits : [], // possible 20 Orbits  max // [2,5,9,10,14,18] leads to 1st Orbit empty or to be filled with something else
                satelites : []
            },
            resources : [{ id : '50bbab8463ae781f20723822', name : 'Gold', amount : 55000 }] // { id : , name : , amount : }
           });

        planet.save(function(err){});

        return planet;
    },
    // 20 orbits per SolarSystem
    createOrbit : function( system ){
        var orbit = new this.models.orbit({ place : 0, systemid : systemid});

        orbit.save(function(err){});

        return orbit;
    },
    solarSystem : function () {

        var starname    = this.getName(),
            star        = this.getStar() ,
            pos         = this.getRandomRegionPos(),
            systemtype  = this.getSystemType(),
            orbits      = 0,
            planets     = 0,
            system      = {};

        orbits      = this.getOrbits(systemtype);

        planets     =  this.getRandomInt(0,orbits);

        system = {
            name : starname,
            pos : pos,
            sun : star,
            planets : planets,
            orbits : orbits
        };

        return system;
    },
    generateGalaxy : function () {

        for (var x = 0; x < galaxySize.x; x++) {

            for (var i = 0; i < galaxySize.y; i++) {

                var reg = { name : name.getRandomName(3, 7), pos : { x : x, y : i } };

                var region = new this.models.regions(reg);

                region.region = this.generateRegion(region._id);

                region.save(function (err) {
                    if (err) // ...
                        console.log('möööp');
                });
            }
        }
        console.log('done');
    }
}

generator = Object.create(Generator);
generator.init();