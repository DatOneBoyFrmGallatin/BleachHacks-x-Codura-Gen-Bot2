const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removetimeout')
    .setDescription('Remove timeout from a member.')
    .addUserOption(opt => opt.setName('target').setDescription('User to remove timeout from').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const member = interaction.guild.members.cache.get(target.id);
    if (!member) return interaction.reply({ content: 'User not found in this guild.', ephemeral: true });
    try {
      await member.timeout(null);
      await interaction.reply({ content: `Removed timeout from ${target.tag}.` });
    } catch (err) {
      await interaction.reply({ content: 'Failed to remove timeout. Check permissions and hierarchy.', ephemeral: true });
    }
  }
};
