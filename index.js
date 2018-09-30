const path = require('path');
const HAP = require('hap-nodejs');
const {uuid, Bridge, Accessory} = HAP;
const pkg = require('./package.json');
const log = require('yalm');
const fetch = require('node-fetch');
const program = require('commander');
const configStore = require('./Configstore');
const fs = require('fs');

const pkgHap = require(__dirname + '/node_modules/hap-nodejs/package.json');
const accessoryLoader = require(__dirname + '/node_modules/hap-nodejs/lib/AccessoryLoader');

let ACCESSORIES_PATH = configStore.get('ACCESSORIES_PATH');

let username = 'C1:22:3D:E3:CE:F6';
let pincode = '031-45-154';

/*
 * Config Section
 */

program.name(pkg.name).
    usage('[options]').
    version(pkg.version).
    option('-i, --init', 'Initialize accessories ').
    option('-b, --bridgeName', 'Bridge Name');
program.parse(process.argv);

if (program.init) {
  log.info(`initializing`);
  const accessoriesPath = `${process.cwd()}`;
  configStore.set('ACCESSORIES_PATH', accessoriesPath);
  ACCESSORIES_PATH = accessoriesPath;
}

if (!ACCESSORIES_PATH) {
  log.error(`cmmc-hapjs --init must be called first.`);
  process.exit(1);
}

let bridgeName = 'Default Siri Bridge';
if (program.bridgeName) {
  bridgeName = program.args.join(' ');
}

if (!fs.existsSync(ACCESSORIES_PATH)) {
  log.error(`${ACCESSORIES_PATH} not found.`);
  process.exit(1);
}

console.log(bridgeName);
const accessoriesDir = ACCESSORIES_PATH;

log.setLevel('verbose');
log(`${pkg.name} ${pkg.version} is starting.`);
log(`bridgeName=${bridgeName}, pinCode=${pincode}, username=${username}`);
log.info(`using ${pkgHap.name} version ${pkgHap.version}`);

HAP.init(ACCESSORIES_PATH + '/persist');
const bridge = new Bridge(bridgeName, uuid.generate(bridgeName));
const accessories = accessoryLoader.loadDirectory(accessoriesDir);
accessories.forEach(accessory => bridge.addBridgedAccessory(accessory));



bridge.on('identify', (paired, callback) => {
  console.log(`[${bridgeName} Node Bridge identify`);
  callback(); // success
});

// Publish the Bridge on the local network.
bridge.publish({
  username: username,
  port: 51826,
  pincode: pincode,
  category: Accessory.Categories.BRIDGE,
});

