const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Simple verify command to add a role to a user.')
    .addUserOption(opt => opt.setName('target').setDescription('User to verify').setRequired(true))
    .addRoleOption(opt => opt.setName('role').setDescription('Role to give').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const role = interaction.options.getRole('role');
    const member = interaction.guild.members.cache.get(target.id);
    if (!member) return interaction.reply({ content: 'User not found in this guild.', ephemeral: true });
    if (!role.editable && !interaction.guild.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
      // role.editable isn't always present; simple permission check:
      return interaction.reply({ content: 'I cannot manage that role. Check my permissions and role position.', ephemeral: true });
    }
    try {
      await member.roles.add(role);
      await interaction.reply({ content: `Added role ${role.name} to ${target.tag}.` });
    } catch (err) {
      await interaction.reply({ content: 'Failed to add role. Check permissions and hierarchy.', ephemeral: true });
    }
  }
};
