# Fixed Discord.js v14 Slash Command Bot


What's included:
- index.js (ready to run)
- deploy-commands.js (registers slash commands globally)
- commands/ (10 fixed commands)
- .env.example
- package.json

## Setup
1. Copy `.env.example` to `.env` and fill DISCORD_TOKEN and CLIENT_ID
2. Run `npm install`
3. Run `npm run deploy` to register the slash commands with Discord
4. Start the bot: `npm start`

## Notes
- Deploying commands may take a few seconds to propagate globally.
- You can change `Routes.applicationCommands(process.env.CLIENT_ID)` to `Routes.applicationGuildCommands(process.env.CLIENT_ID, 'GUILD_ID')` for guild-scoped testing (faster updates).
