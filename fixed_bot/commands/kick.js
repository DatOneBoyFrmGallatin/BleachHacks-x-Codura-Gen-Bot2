const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server.')
    .addUserOption(opt => opt.setName('target').setDescription('User to kick').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for kick'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(target.id);
    if (!member) return interaction.reply({ content: 'User not found in this guild.', ephemeral: true });
    if (!member.kickable) return interaction.reply({ content: 'I cannot kick that user (missing permissions or role hierarchy).', ephemeral: true });
    await member.kick(reason);
    await interaction.reply({ content: `Kicked ${target.tag} — Reason: ${reason}` });
  }
};
