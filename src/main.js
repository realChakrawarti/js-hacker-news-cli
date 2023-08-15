#!/usr/bin/env node

import {Cli, Builtins} from 'clipanion';
import { readPackageJson } from './utils/readPackageJson.js';

const packageJson = await readPackageJson()

const [node, app, ...args] = process.argv;
 
const cli = new Cli({
    binaryLabel: packageJson.name,
    binaryName: `${node} ${app}`,
    binaryVersion: packageJson.version,
})

cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);
cli.register(Builtins.DefinitionsCommand);

cli.runExit(args);