const HAP = require('hap-nodejs');
const Helpers = require('./Helpers');
const configStore = require('./Configstore');

const {uuid, Bridge, Accessory} = HAP;
const pkg = require('./package.json');
const program = require('commander');
const pkgHap = require(__dirname + '/node_modules/hap-nodejs/package.json');

const fs = require('fs');
const log = require('yalm');

let ACCESSORIES_PATH = configStore.get('ACCESSORIES_PATH');

let bridgeName = 'Default Siri Bridge';
let username = 'C1:22:3D:E3:CE:F6';
let pincode = '031-45-154';

/*
 * Config Section
 */

log.setLevel('verbose');

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
  log.info(`ACCESSORIES_PATH has been set to ${ACCESSORIES_PATH}`);
}
else {
  if (!ACCESSORIES_PATH) {
    log.error(`you must call cmmc-hapjs --init first`);
    process.exit(1);
  }

  if (program.bridgeName) {
    bridgeName = program.args.join(' ');
  }

  if (!fs.existsSync(ACCESSORIES_PATH)) {
    log.error(`${ACCESSORIES_PATH} not found.`);
    process.exit(1);
  }
  startBridge();
}

function startBridge() {
  const accessoriesDir = ACCESSORIES_PATH;
  HAP.init(ACCESSORIES_PATH + '/persist');

  log(`${pkg.name} v${pkg.version} is starting (${pkgHap.name} v${pkgHap.version})`);
  log(`bridgeName=${bridgeName}`);
  log(`pinCode=${pincode}, username=${username}`);

  const bridge = new Bridge(bridgeName, uuid.generate(bridgeName));
  const accessories = Helpers.loadDirectory(accessoriesDir);
  accessories.forEach(accessory => {
    log.info(`> ${accessory.displayName} has been loaded`);
    bridge.addBridgedAccessory(accessory);
  });

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

}