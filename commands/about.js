import { SlashCommandBuilder } from 'discord.js';
import { codeBlock } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Welcome, I am Miriel, steward of the church of vows.'),
    async execute(interaction) {
        await interaction.reply({ embeds: [{
            title:"About",
            description: "Welcome, I am Miriel, steward of the church of vows." +
            "\nI can provide you with information about various things from the lands between." +
            "\nIf you are not sure how i work try" +
            codeBlock("/help"),
            color: 0x4ef542
        }]});
    },
};