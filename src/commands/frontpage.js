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