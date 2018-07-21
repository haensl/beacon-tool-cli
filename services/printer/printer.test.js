const expect = require('chai').expect;
const printer = require('./');

describe('printer', () => {
  describe('print()', () => {
    let out;

    describe('console', () => {
      describe('object with string property', () => {
        beforeEach(() => {
          out = printer.print({
            foo: 'bar'
          });
        });

        it('separates key from value with colon', () => {
          expect(out).to.equal('foo: bar');
        });
      });

      describe('object with array property', () => {
        beforeEach(() => {
          out = printer.print({
            foo: ['b', 'a', 'r']
          });
        });

        it('prints the array values', () => {
          expect(out).to.equal('foo: [b, a, r]');
        });
      });

      describe('object with number property', () => {
        beforeEach(() => {
          out = printer.print({
            foo: 3.14
          });
        });

        it('prints the number', () => {
          expect(out).to.equal('foo: 3.14');
        });
      });

      describe('nested object', () => {
        beforeEach(() => {
          out = printer.print({
            foo: {
              bar: 3.14,
              foo: 'bar'
            }
          });
        });

        it('indents the nested properties with two spaces', () => {
          expect(out).to.equal('foo:\n  bar: 3.14\n  foo: bar');
        });
      });
    });

    describe('json', () => {
      describe('object with string property', () => {
        beforeEach(() => {
          out = printer.print({
            foo: 'bar'
          }, printer.formats.json);
        });

        it('separates key from value with colon', () => {
          expect(out).to.equal('{\n  "foo": "bar"\n}');
        });
      });

      describe('object with array property', () => {
        beforeEach(() => {
          out = printer.print({
            foo: ['b', 'a', 'r']
          }, printer.formats.json);
        });

        it('prints the array values', () => {
          expect(out).to.equal('{\n  "foo": [\n    "b",\n    "a",\n    "r"\n  ]\n}');
        });
      });

      describe('object with number property', () => {
        beforeEach(() => {
          out = printer.print({
            foo: 3.14
          }, printer.formats.json);
        });

        it('prints the number', () => {
          expect(out).to.equal('{\n  "foo": 3.14\n}');
        });
      });

      describe('nested object', () => {
        beforeEach(() => {
          out = printer.print({
            foo: {
              bar: 3.14,
              foo: 'bar'
            }
          }, printer.formats.json);
        });

        it('indents the nested properties with two spaces', () => {
          expect(out).to.equal('{\n  "foo": {\n    "bar": 3.14,\n    "foo": "bar"\n  }\n}');
        });
      });
    });

    describe('Unknown format', () => {
      it('throws', () => {
        expect(() => printer.print({
          foo: 'bar'
        }, 'foo')).to.throw;
      });
    });

    describe('Non object', () => {
      it('throws', () => {
        expect(() => printer.print(42)).to.throw;
      });
    });
  });
});
