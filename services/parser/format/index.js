const beaconTool = require('beacon-tool');
const iBeaconRegex = /ibeacon/i;
const eddystoneUidRegex = /eddystone[ -]?uid/i;
const altBeaconRegex = /altbeacon/i;

const parse = (format) => {
  if (iBeaconRegex.test(format)) {
    return beaconTool.signals.iBeacon.key;
  } else if (eddystoneUidRegex.test(format)) {
    return beaconTool.signals.eddystoneUid.key;
  } else if (altBeaconRegex.test(format)) {
    return beaconTool.signals.altBeacon.key;
  }

  throw new Error(`Unknown format: ${format}`);
};

module.exports = {
  parse
};
