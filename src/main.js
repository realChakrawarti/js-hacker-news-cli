#!/usr/bin/env node

import {Cli, Builtins} from 'clipanion';
import { readPackageJson } from './utils/helpers.js'; 
import Frontpage from './commands/Frontpage.js';
import Ask from './commands/ask.js';

const packageJson = await readPackageJson()

const [node, app, ...args] = process.argv;
 
const cli = new Cli({
    binaryLabel: packageJson.name,
    binaryName: `${node} ${app}`,
    binaryVersion: packageJson.version,
    enableCapture: true // converts console.* -> this.context.stdout.write
})

// App commands

cli.register(Frontpage)
cli.register(Ask)

// Built-ins

cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);
cli.register(Builtins.DefinitionsCommand);

cli.runExit(args);