const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Issues a warning to a member (no persistence).')
    .addUserOption(opt => opt.setName('target').setDescription('User to warn').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for warning'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    await interaction.reply({ content: `${target.tag} has been warned. Reason: ${reason}` });
  }
};
