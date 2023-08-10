#!/usr/bin/env node

const {Cli, Builtins} = require('clipanion');
const {version, name} = require("../package.json")

const [node, app, ...args] = process.argv;
 
const cli = new Cli({
    binaryLabel: name,
    binaryName: `${node} ${app}`,
    binaryVersion: version,
})

cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);
cli.register(Builtins.DefinitionsCommand);

cli.runExit(args);