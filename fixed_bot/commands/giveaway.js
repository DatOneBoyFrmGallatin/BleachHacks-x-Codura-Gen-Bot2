const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Create a simple giveaway announcement (reaction-based).')
    .addIntegerOption(opt => opt.setName('duration').setDescription('Duration in minutes (informational only)').setRequired(false))
    .addStringOption(opt => opt.setName('prize').setDescription('Prize description').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const prize = interaction.options.getString('prize');
    const duration = interaction.options.getInteger('duration') || 0;
    const embed = new EmbedBuilder()
      .setTitle('Giveaway!')
      .setDescription(`Prize: ${prize}\nDuration (informational): ${duration} minute(s)\nReact with 🎉 to enter!`)
      .setTimestamp();
    const msg = await interaction.channel.send({ embeds: [embed] });
    try { await msg.react('🎉'); } catch(e) { /* ignore react errors */ }
    await interaction.reply({ content: 'Giveaway posted!', ephemeral: true });
  }
};
