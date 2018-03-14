var fs = require('fs');
var path = require('path');
const HAP = require('hap-nodejs');
const pkgHap = require('./node_modules/hap-nodejs/package.json');
var accessoryLoader = require('./node_modules/hap-nodejs/lib/AccessoryLoader');
const pkg = require('./package.json'); 
const log = require('yalm'); 

log.setLevel('verbose'); 
log(pkg.name + ' ' + pkg.version + ' starting'); 
log.info('using hap-nodejs version', pkgHap.version);

const {uuid, Bridge, Accessory, Service, Characteristic} = HAP;
const bridgeName = 'Nat Siri Bridge'

HAP.init()
var bridge = new Bridge(bridgeName, uuid.generate(bridgeName));

// Load up all accessories in the /accessories folder
var dir = path.join(__dirname, "accessories");
var accessories = accessoryLoader.loadDirectory(dir);
// Add them all to the bridge
accessories.forEach(function(accessory) {
    bridge.addBridgedAccessory(accessory);
});

// Listen for bridge identification event
bridge.on('identify', function(paired, callback) {
  console.log("Node Bridge identify");
  callback(); // success
});

// Publish the Bridge on the local network.
bridge.publish({
    username: "CC:22:3D:E3:CE:F6",
    port: 51826,
    pincode: "031-45-154",
    category: Accessory.Categories.BRIDGE
});

