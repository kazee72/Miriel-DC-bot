import { apiCall } from "./api.js"
import { makeEmbed } from "./embed.js";
import { Client, GatewayIntentBits, Collection, codeBlock } from 'discord.js';
import { commandHandler } from "./commands.js";
import { configDotenv } from "dotenv";
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

configDotenv();


// make client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// get command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// log when client is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    // set activity status of bot
    client.user.setActivity('ELDEN RING', { type: 'PLAYING' });
});

// create the response and send it to discord
async function responseHandler(message, categoryOfItem, embedColor) {
    try {
        // check for non api related commands
        if (categoryOfItem == "help" || categoryOfItem == "error" || categoryOfItem == "about") {
            const embed = makeEmbed(categoryOfItem, "", "", embedColor, message);
            message.channel.send({ embeds: [embed]});
        } else {
        // get api data
        const item = await apiCall(categoryOfItem, message);
        const name = item.name;
        const nameForLink = name.replace(/ /g, "+");
        const link = `https://eldenring.wiki.fextralife.com/${nameForLink}`;
        // make and send embed
        const embed = makeEmbed(categoryOfItem, item, link, embedColor, message);
        message.channel.send({ embeds: [embed] });
        }
    } catch (error) {
        // error handling
        if(error == "TypeError: Cannot read properties of undefined (reading 'name')") {
            if (categoryOfItem == 'ashes' || categoryOfItem == 'bosses') {categoryOfItem = categoryOfItem.slice(0, -2);} 
            else if (categoryOfItem == 'sorceries') {categoryOfItem = 'sorcery'}
            else {categoryOfItem = categoryOfItem.slice(0, -1)};
            message.channel.send({embeds: [{
                title: "Error",
                description: `Looks like the ${categoryOfItem} "${message.content.slice(categoryOfItem.length + 2)}" doesnt exist in the database.\nCheck if you typed it right or try` + codeBlock("/help"),
                color: 0x8a0c0c 
                }]
            });
        }
        // for debuging
        console.error(error);
    }
}


// respond when message is sent
client.on('messageCreate', async message => {
    if (message.author.bot) return;
    const embedColor = 0x007dd1;
    let categoryOfItem = commandHandler(message);
    responseHandler(message, categoryOfItem, embedColor);
});

// slash commands
client.commands = new Collection();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    
    if (command.default && command.default.data && command.default.data.name) {
        client.commands.set(command.default.data.name, command.default);
    } else {
        console.error(`Command at ${file} is missing a required "data" property.`);
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// login to client
client.login(process.env.DISCORD_TOKEN);

