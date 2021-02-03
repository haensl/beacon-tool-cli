# beacon-tool-cli [![CircleCI](https://circleci.com/gh/haensl/beacon-tool-cli.svg?style=svg)](https://circleci.com/gh/haensl/beacon-tool-cli)

CLI for [beacon-tool](https://github.com/haensl/beacon-tool). A collection of bluetooth beacon signal uitiliy functions.

[![NPM](https://nodei.co/npm/beacon-tool-cli.png?downloads=true)](https://nodei.co/npm/beacon-tool-cli/)

## Features

Beacon Tool enables you to generate, identify and validates various Bluetooth beaconing payloads.

## Installation

### NPM
```bash
npm i [-g] beacon-tool-cli
```

### Yarn
```bash
yarn [global] add beacon-tool-cli
```

Installing beacon-tool-cli globally, e.g. `npm i -g beacon-tool-cli`, makes the `bt` command availble in your shell.

## Usage

### Synopsis

```bash
Usage: bt <command> [options]

Commands:
  bt gen <format> [pretty]       Generate a signal payload for the given
                                       format.               [aliases: generate]
  bt val <format> <payload>      Validate if a signal payload conforms to
                                       the given format.     [aliases: validate]
  bt id <payload> [quiet]        Identify a payload.   [aliases: identify]
  bt pp <payload> [format]       Pretty print a payload.
                                                             [aliases: beautify]
  bt info <format> [formatting]  Print information regarding the given
                                       format.            [aliases: information]
  bt completion                  generate bash completion script

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]

Examples:
  bt gen ibeacon                      Generate an iBeacon UUID
  bt val eddystoneuid                 Check if
  37867a65fd3e4ed5afe2-ce2659350518         '37867a65fd3e4ed5afe2-ce2659350518'
                                            is a valid Eddystone UID
                                            namespace-instance pair.
  bt id                               Identify the format for
  37867a65fd3e4ed5afe2-ce2659350518         37867a65fd3e4ed5afe2-ce2659350518.
  bt pp                               Pretty print
  37867a65fd3e4ed5afe2ce2659350518 iBeacon  '37867a65fd3e4ed5afe2ce2659350518'
                                            in iBeacon format.
  bt info altbeacon json              Print information about AltBeacon in
                                            JSON format.
```

#### Formats

Beacon Tool tries to be smart about spelling, e.g. `Eddystone-UID`, `eddystoneuid` and `eddystone-UID` will all match Eddystone UID.

#### Payloads

Beacon Tool is not case sensitive and does not mind whether or not dashes are in the payload.

#### Further information

Enter `bt <command> help` for detailed information about about each command. E.g. `bt gen help`

## [Changelog](CHANGELOG.md)

## [License: MIT](LICENSE)
