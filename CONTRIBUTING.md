# Contributing
Thanks a lot for being interested in contributing to this open-source project!

**TABLE OF CONTENTS**
- [Notes](#notes)
- [Ways to contribute](#ways-to-contribute)
- [Forks](#forks)
- [I can't figure it out!](#i-cant-figure-it-out)

# Notes
- Code contributions must match the current code style to prevent confusion. [ESLint](https://eslint.org/) should be able to help you with checking.
- Pull requests must point to the [dev](https://github.com/CorruptX/beycord/tree/dev) branch instead of the [master](https://github.com/CorruptX/beycord/tree/master) branch.
- Be sure to check the [dev](https://github.com/CorruptX/beycord/tree/dev) branch and [open pull requests](https://github.com/CorruptX/beycord/pulls?q=is%3Apr+is%3Aopen+) before working on a feature. Someone might already been working on it so you should probably help them improve it instead.
- Do not put unnecessary comments in your code such as `// EpicGamer coded this part yeaaaaah`. The contributor section will credit you, so you don't need to mess up the code with these comments.
- If you're planning to add a new feature, please discuss it with other contributors on the [Discord server](https://discord.gg/8FJKAMDSv9) first to make sure you know what you're doing and maybe get a few helpful suggestions.

# Ways to contribute
- **Contributing code** You can help patch bugs and maybe even create an entirely new feature! You can merge your changes with the [parent repository](https://github.com/CorruptX/beycord) using [pull requests](https://github.com/CorruptX/beycord/compare).
- **Contributing ideas** Got an idea for a new feature or changes? Submit it at the [Issues](https://github.com/CorruptX/beycord/issues/new) section! We would like to hear your suggestion.
- **Bug hunting** If you found a bug in the code, we would appreciate it if you could report it at the [Issues](https://github.com/CorruptX/beycord/issues/new) section so we can patch it as soon as possible.

# Forks
We always welcome forks (copies) of the bot to be made as long as it abides by our [license](https://github.com/CorruptX/beycord/blob/dev/LICENSE). Below are a few things that you need to know when forking Beycord:
- Get a separate name and profile picture for your bot to avoid confusion with the main bot.
- You need to create your own [MongoDB](https://www.mongodb.com/) database to work with your forked bot.
- Be sure to store all your important stuff (bot tokens, MongoDB login URIs, etc.) in an [.env](https://www.freecodecamp.org/news/heres-how-you-can-actually-use-node-environment-variables-8fdf98f53a0a/) file and access it in your code using `process.env.NAME`. DO NOT type them directly in your code as people can just steal it to perform malicious actions. Our [.gitignore](https://github.com/CorruptX/beycord/blob/dev/.gitignore) makes sure that .env files do not accidentally get uploaded along with a Git commit.
- Do not try to impersonate the main bot or any other fork with your fork. Get original and you might even have a chance to get a channel dedicated to your fork in our [Discord server](https://discord.gg/8FJKAMDSv9).
- To avoid your bot's data polluting the game logs of the main bot, create your own [Discord webhooks](https://discord.com/developers/docs/resources/webhook) to capture them.

That's it, have fun forking! If you feel like making your own fork is a bit too complex, you can try contributing to the main project or other forks of Beycord instead as it will help us a lot too.

# I can't figure it out!
Don't worry, we got your back. Come join us at the [Discord server](https://discord.gg/ZvQ6F6QSUB)! There, you can ask questions about your code or any other relevant information.
  
  
  
Thanks for reading!