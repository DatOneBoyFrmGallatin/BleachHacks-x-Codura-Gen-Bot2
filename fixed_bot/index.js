const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
require('dotenv').config();
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath)) {
  const cmd = require(`./commands/${file}`);
  if (cmd && cmd.data && cmd.data.name) client.commands.set(cmd.data.name, cmd);
  else console.warn(`[WARN] Command file ./commands/${file} is missing required "data" export.`);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return interaction.reply({ content: 'Command not found or not loaded.', ephemeral: true });
  try { await command.execute(interaction, client); }
  catch (e) { console.error(e); if (!interaction.replied) await interaction.reply({content:'Error executing command.', ephemeral:true}); }
});

client.login(process.env.DISCORD_TOKEN);
