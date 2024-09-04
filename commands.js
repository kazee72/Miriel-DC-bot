import { REST, Routes } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';
import { config } from 'dotenv';

config();

// slash commands
const commands = [
    new SlashCommandBuilder().setName('help').setDescription('Are you perhaps in search of instructions? In that case, I will share all I know.'),
    new SlashCommandBuilder().setName('about').setDescription('Welcome, I am Miriel, steward of the church of vows.'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands('1275073438410604554'),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

// ! commands
export function commandHandler(message) {
    if (message.content.startsWith("!")) {
        // check all commands
        if (message.content.startsWith("!help")) {
            return "help";
        } else if (message.content.startsWith("!about")) {
            return "about";
        } else if (message.content.startsWith("!item")) {
            return "items";
        } else if (message.content.startsWith("!weapon")) {
            return "weapons";
        } else if (message.content.startsWith("!talisman")) {
            return "talismans";
        } else if (message.content.startsWith("!ash")) {
            return "ashes";
        } else if (message.content.startsWith("!boss")) {
            return "bosses";
        } else if (message.content.startsWith("!armor")) {
            return "armors";
        } else if (message.content.startsWith("!shield")) {
            return "shields";
        } else if (message.content.startsWith("!npc")) {
            return "npcs";
        } else if (message.content.startsWith("!incantation")) {
            return "incantations";
        } else if (message.content.startsWith("!sorcery")) {
            return "sorceries";
        } else if (message.content.startsWith("!spirit")) {
            return "spirits";
        } else if (message.content.startsWith("!location")) {
            return "locations";
        } else {
            return "error";
        }
    }
}