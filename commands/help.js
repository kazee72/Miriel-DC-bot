import { SlashCommandBuilder } from 'discord.js';
import { codeBlock } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Are you perhaps in search of instructions? In that case, I will share all I know.'),
    async execute(interaction) {
        await interaction.reply({ embeds: [{
            title: "Help", 
            description: "Are you perhaps in search of instructions? In that case, I will share all I know. \nHere is a list of all my commands:" +
            codeBlock("\n!weapon") +
            codeBlock("\n!item") +
            codeBlock("\n!talisman") +
            codeBlock("\n!ash") +
            codeBlock("\n!boss") +
            codeBlock("\n!armor") +
            codeBlock("\n!shield") +
            codeBlock("\n!npc") +
            codeBlock("\n!incantation") +
            codeBlock("\n!sorcery") +
            codeBlock("\n!spirit"),
            color: 0x4ef542
        }]});
    },
};