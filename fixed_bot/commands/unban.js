const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user by ID.')
    .addStringOption(opt => opt.setName('userid').setDescription('User ID to unban').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const id = interaction.options.getString('userid');
    try {
      await interaction.guild.bans.remove(id);
      await interaction.reply({ content: `Unbanned user ID ${id}.` });
    } catch (err) {
      await interaction.reply({ content: `Failed to unban ID ${id}. Make sure the ID is correct and I have permission.`, ephemeral: true });
    }
  }
};
