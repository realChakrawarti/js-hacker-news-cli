#!/usr/bin/env node

// const {Command, Option, runExit} = require('clipanion');
 
// runExit(class HelloCommand extends Command {
//   name = Option.String();
 
//   async execute() {
//     this.context.stdout.write(`Hello ${this.name}!\n`);
//   }
// });

import {Cli, Command, Option, Builtins} from 'clipanion';
 
class HelloCommand extends Command {
  static paths = [
    [`my-command`],
  ];
 
  static usage = Command.Usage({
    category: `My category`,
    description: `A small description of the command.`,
    details: `
      A longer description of the command with some \`markdown code\`.
      
      Multiple paragraphs are allowed. Clipanion will take care of both reindenting the content and wrapping the paragraphs as needed.
    `,
    examples: [[
      `A basic example`,
      `$0 my-command`,
    ], [
      `A second example`,
      `$0 my-command --with-parameter`,
    ]],
  });
 
  p = Option.Boolean(`--with-parameter`);
 
  async execute() {
    this.context.stdout.write(
      this.p ? `Called with parameter` : `Called without parameter`
    );
  }
}

const [node, app, ...args] = process.argv;
 
const cli = new Cli({
    binaryLabel: `My Application`,
    binaryName: `${node} ${app}`,
    binaryVersion: `1.0.0`,
})

class HelloCommand2 extends Command {
  name = Option.String();
 
  async execute() {
    this.context.stdout.write(`Hello ${this.name}!\n`);
  }
};
 
cli.register(HelloCommand);
cli.register(HelloCommand2);

cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);
cli.register(Builtins.DefinitionsCommand);

cli.runExit(args);