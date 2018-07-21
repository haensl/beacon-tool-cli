const expect = require('chai').expect;
const signals = require('beacon-tool').signals;
const formatParser = require('./');

describe('Format parser', () => {
  describe('parse()', () => {
    let format;

    describe('iBeacon', () => {
      beforeEach(() => {
        format = formatParser.parse('iBeacon');
      });

      it('recognizes iBeacon', () => {
        expect(format).to.equal(signals.iBeacon.key);
      });
    });

    describe('ibeacon', () => {
      beforeEach(() => {
        format = formatParser.parse('iBeacon');
      });

      it('recognizes iBeacon', () => {
        expect(format).to.equal(signals.iBeacon.key);
      });
    });

    describe('eddystoneUid', () => {
      beforeEach(() => {
        format = formatParser.parse('eddystoneUid');
      });

      it('recognizes eddystoneUid', () => {
        expect(format).to.equal(signals.eddystoneUid.key);
      });
    });

    describe('eddystoneUID', () => {
      beforeEach(() => {
        format = formatParser.parse('eddystoneUID');
      });

      it('recognizes eddystoneUid', () => {
        expect(format).to.equal(signals.eddystoneUid.key);
      });
    });

    describe('eddystone UID', () => {
      beforeEach(() => {
        format = formatParser.parse('eddystone UID');
      });

      it('recognizes eddystoneUid', () => {
        expect(format).to.equal(signals.eddystoneUid.key);
      });
    });

    describe('eddystone uid', () => {
      beforeEach(() => {
        format = formatParser.parse('eddystone uid');
      });

      it('recognizes eddystoneUid', () => {
        expect(format).to.equal(signals.eddystoneUid.key);
      });
    });

    describe('eddystone-uid', () => {
      beforeEach(() => {
        format = formatParser.parse('eddystone-uid');
      });

      it('recognizes eddystoneUid', () => {
        expect(format).to.equal(signals.eddystoneUid.key);
      });
    });

    describe('eddystone-UID', () => {
      beforeEach(() => {
        format = formatParser.parse('eddystone-UID');
      });

      it('recognizes eddystoneUid', () => {
        expect(format).to.equal(signals.eddystoneUid.key);
      });
    });

    describe('altBeacon', () => {
      beforeEach(() => {
        format = formatParser.parse('altBeacon');
      });

      it('recognizes altBeacon', () => {
        expect(format).to.equal(signals.altBeacon.key);
      });
    });

    describe('altbeacon', () => {
      beforeEach(() => {
        format = formatParser.parse('altbeacon');
      });

      it('recognizes altBeacon', () => {
        expect(format).to.equal(signals.altBeacon.key);
      });
    });

    describe('unknown', () => {
      it('throws', () => {
        expect(() => formatParser.parse('foo')).to.throw;
      });
    });
  });
});
