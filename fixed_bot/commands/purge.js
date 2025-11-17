const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Bulk delete messages (up to 100).')
    .addIntegerOption(opt => opt.setName('amount').setDescription('Number of messages to delete (2-100)').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    if (amount < 2 || amount > 100) return interaction.reply({ content: 'Amount must be between 2 and 100.', ephemeral: true });
    const fetched = await interaction.channel.bulkDelete(amount, true);
    await interaction.reply({ content: `Deleted ${fetched.size} messages.`, ephemeral: true });
  }
};
