const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server.')
    .addUserOption(opt => opt.setName('target').setDescription('User to ban').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for ban'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(target.id);
    if (!member) return interaction.reply({ content: 'User not found in this guild.', ephemeral: true });
    if (!member.bannable) return interaction.reply({ content: 'I cannot ban that user (missing permissions or role hierarchy).', ephemeral: true });
    await member.ban({ reason });
    await interaction.reply({ content: `Banned ${target.tag} — Reason: ${reason}` });
  }
};
