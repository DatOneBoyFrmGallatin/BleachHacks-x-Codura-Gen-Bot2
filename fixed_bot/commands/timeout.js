const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Apply timeout to a member (minutes).')
    .addUserOption(opt => opt.setName('target').setDescription('User to timeout').setRequired(true))
    .addIntegerOption(opt => opt.setName('minutes').setDescription('Length in minutes (1-20160)').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for timeout'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const minutes = interaction.options.getInteger('minutes');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(target.id);
    if (!member) return interaction.reply({ content: 'User not found in this guild.', ephemeral: true });
    const ms = minutes * 60 * 1000;
    if (minutes < 1 || minutes > 20160) return interaction.reply({ content: 'Minutes must be between 1 and 20160 (14 days).', ephemeral: true });
    try {
      await member.timeout(ms, reason);
      await interaction.reply({ content: `Timed out ${target.tag} for ${minutes} minute(s). Reason: ${reason}` });
    } catch (err) {
      await interaction.reply({ content: 'Failed to timeout user. Check permissions and hierarchy.', ephemeral: true });
    }
  }
};
