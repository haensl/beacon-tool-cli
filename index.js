#!/usr/bin/env node

const yargs = require('yargs');
const beaconTool = require('beacon-tool');
const formatParser = require('./services/parser/format');
const printer = require('./services/printer');
const meta = require('./support/meta');
const pkg = require('./package');

yargs
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'gen <format> [pretty]',
    aliases: [
      'generate'
    ],
    desc: 'Generate a signal payload for the given format.',
    builder: (yargs) =>
      yargs.default('pretty', false)
        .positional('format', {
            desc: `The format to generate.\n${meta.descriptions.format}`
        })
        .positional('pretty', {
          desc: meta.descriptions.pretty
        })
    ,
    handler: (argv) => {
      try {
        const format = formatParser.parse(argv.format);
        const payload = beaconTool.generate(format, argv.pretty);
        console.info(payload);
      } catch (e) {
        console.error(e.message);
        process.exit(1);
      }
    }
  })
  .command({
    command: 'val <format> <payload>',
    aliases: [
      'validate'
    ],
    desc: 'Validate if a signal payload conforms to the given format.',
    builder: (yargs) =>
      yargs.positional('format', {
          desc: `The format to validate for.\n${meta.descriptions.format}`
        })
        .positional('payload', {
          desc: `The payload to validate.\n${meta.descriptions.payload}`
        })
    ,
    handler: (argv) => {
      try {
        const format = formatParser.parse(argv.format);
        const valid = beaconTool.validate(argv.payload, format);
        if (valid) {
          console.info('valid');
        } else {
          console.info('invalid');
          process.exit(1);
        }
      } catch (e) {
        console.error(e.message);
        process.exit(1);
      }
    }
  })
  .command({
    command: 'id <payload> [quiet]',
    aliases: [
      'identify'
    ],
    desc: 'Identify a payload.',
    builder: (yargs) =>
      yargs.default('quiet', false)
        .positional('payload', {
          desc: `The payload to identify.\n${meta.descriptions.payload}`
        })
        .positional('quiet', {
          desc: meta.descriptions.quiet
        })
    ,
    handler: (argv) => {
      try {
        const candidates = beaconTool.identify(argv.payload);
        if (!argv.quiet && candidates.length > 1) {
          console.info('Multiple matches.')
        }

        candidates.forEach((candidate) => {
          console.info(beaconTool.get(candidate).displayName);
        });
      } catch (e) {
        console.error(e.message);
        process.exit(1);
      }
    }
  })
  .command({
    command: 'pp <payload> [format]',
    aliases: [
      'beautify'
    ],
    desc: 'Pretty print a payload.',
    builder: (yargs) =>
      yargs.positional('format', {
          desc: `The payload format.\n${meta.descriptions.format}\nIf not provided Beacon Tool tries to infer the format from the payload.`
        })
        .positional('payload', {
          desc: `The payload to pretty print.\n${meta.descriptions.payload}`
        })
,
    handler: (argv) => {
      try {
        let format;
        if (argv.format) {
          format = formatParser.parse(argv.format);
        } else {
          const candidates = beaconTool.identify(argv.payload);
          if (candidates.length > 1) {
            console.error('Ambiguous payload. Can be any of');
            candidates.forEach((candidate) => {
              console.error(`\t${beaconTool.get(candidate).displayName}`);
            });
            console.error('Please specify a format and try again');
            process.exit(1);
          } else {
            format = candidates[0];
          }
        }
        const beautified = beaconTool.beautify(argv.payload, format);
        console.info(beautified);
      } catch (e) {
        console.error(e.message);
        process.exit(1);
      }
    }
  })
  .command({
    command: 'info <format> [formatting]',
    aliases: [
      'information'
    ],
    desc: 'Print information regarding the given format.',
    builder: (yargs) =>
      yargs.default('formatting', printer.formats.console)
        .positional('format', {
          desc: `The format to retrieve information for.\n${meta.descriptions.format}`
        })
        .positional('formatting', {
          desc: meta.descriptions.formatting
        })
        .choices('formatting', ['json', 'console'])
    ,
    handler: (argv) => {
      try {
        const format = formatParser.parse(argv.format);
        const info = beaconTool.get(format);
        console.info(printer.print(info, argv.formatting));
      } catch (e) {
        console.error(e);
        console.error(e.message);
        process.exit(1);
      }
    }
  })
  .example(`$0 gen ${beaconTool.signals.iBeacon.key}`, 'Generate an iBeacon UUID')
  .example(`$0 val ${beaconTool.signals.eddystoneUid.key} 37867a65fd3e4ed5afe2-ce2659350518`, 'Check if \'37867a65fd3e4ed5afe2-ce2659350518\' is a valid Eddystone UID namespace-instance pair.')
  .example('$0 id 37867a65fd3e4ed5afe2-ce2659350518', 'Identify the format for 37867a65fd3e4ed5afe2-ce2659350518.')
  .example(`$0 pp 37867a65fd3e4ed5afe2ce2659350518 ${beaconTool.signals.iBeacon.displayName}`, 'Pretty print \'37867a65fd3e4ed5afe2ce2659350518\' in iBeacon format.')
  .example(`$0 info ${beaconTool.signals.altBeacon.key} json`, `Print information about ${beaconTool.signals.altBeacon.displayName} in JSON format.`)
  .epilogue(`To get help on individual commands, type $0 <command> help. E.g. $0 gen help.\n\n${pkg.name} v${pkg.version} ${(new Date()).getFullYear()}\nCreated by ${pkg.author.name} <${pkg.author.email}>\nVisit ${pkg.homepage} for futher information.`)
  .help()
  .completion()
  .recommendCommands()
  .wrap(yargs.terminalWidth())
  .argv;

