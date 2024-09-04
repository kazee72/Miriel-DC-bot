import { codeBlock } from "discord.js";


export function makeEmbed(categoryOfItem, item, link, embedColor, message) {
    // declare values for different data recieved from api
    let sclValues = '';
    let reqValues = '';
    let atkValues = '';
    let drpValues = '';
    let negValues = '';
    let resValues = '';
    let defValues = '';
    // basic structure of all the embeds
    let embedReturn = {
        title: item.name,
        description: item.description + '\n' + link,
        color: embedColor,
        image: {
            url: item.image
        }
    }

    // check what type of item it is to make correct api call
    switch(categoryOfItem) {
        // items category ---------------------------------------
        case("items"):
            embedReturn["fields"] = [
                { name: 'Type', value: item.type, inline: true },
                { name: 'Effect', value: item.effect, inline: true },
            ];
            return embedReturn;
                
        // weapons and shields ---------------------------------------
        case("weapons"):
        case("shields"):
            for (let i = 0; i < item.scalesWith.length; i ++) {
                sclValues += (item.scalesWith[i].name + ': ' + item.scalesWith[i].scaling + '\n');
            }
            for (let j = 0; j < item.requiredAttributes.length; j ++) {
                reqValues += (item.requiredAttributes[j].name + ': ' + item.requiredAttributes[j].amount + '\n');
            }
            for (let k = 0; k < item.attack.length; k ++) {
                if (item.attack[k].amount == 0) {
                    atkValues = atkValues
                } else {
                atkValues += (item.attack[k].name + ': ' + item.attack[k].amount + '\n');
                }
            }
            for (let l = 0; l < item.defence.length; l ++) {
                defValues += (item.defence[l].name + ': ' + item.defence[l].amount + '\n');
            }
            embedReturn["fields"] = [
                    {name: "Category", value: item.category, inline: true},
                    {name: "Weight", value: String(item.weight), inline: true},
                    {name: "Scaling", value: sclValues, inline: true},
                    {name: "Defence", value: defValues, inline: true},
                    {name: "Damage Types", value: atkValues, inline: true},
                    {name: "Requirements", value: reqValues, inline:true}
                ];
            return embedReturn;

        // talismans ---------------------------------------  
        case("talismans"):
            embedReturn["fields"] = [
                    {name: 'Effect', value: item.effect, inline: true}
                ];
            return embedReturn;
        
        // ashes of war ---------------------------------------
        case("ashes"):
            embedReturn["fields"] = [
                    {name: 'Affinity', value: item.affinity}
                ];
            return embedReturn;

        // bosses ---------------------------------------
        case("bosses"):
            for (let i = 0; i < item.drops.length; i ++) {
                drpValues += (item.drops[i] + '\n');
            }
            embedReturn["fields"] = [
                    {name: "Location", value: item.location, inline: true},
                    {name: "Drops", value: drpValues, inline: true},
                    {name: "HP", value: item.healthPoints, inline: true}
                ];
            return embedReturn;

        // armors ---------------------------------------
        case("armors"):
            for (let i = 0; i < item.dmgNegation.length; i ++) {
                negValues += (item.dmgNegation[i].name + ': ' + item.dmgNegation[i].amount + '\n');
            }
            for (let j = 0; j < item.resistance.length; j ++) {
                resValues += (item.resistance[j].name + ': ' + item.resistance[j].amount + '\n');
            }
            embedReturn["fields"] = [
                    {name: "Category", value: item.category, inline: true},
                    {name: "Negation", value: negValues, inline: true},
                    {name: "Resistance", value: resValues, inline: true}
                ];
            return embedReturn;

        // npcs ---------------------------------------
        case("npcs"):
            embedReturn["description"] = item.quote + '\n' + link;
            embedReturn["fields"] = [
                {name: "Role", value: item.role, inline: true},
                {name: "Location", value: item.location, inline: true},
            ];
            return embedReturn;

        // incantations and sorceries ---------------------------------------
        case("incantations"):
        case("sorceries"):
            for (let i = 0; i < item.requires.length; i ++) {
                reqValues += (item.requires[i].name + ': ' + item.requires[i].amount + '\n');
            } 
            embedReturn["fields"] = [
                {name: "Effect", value: item.effects, inline: false},
                {name: "Requirements", value: reqValues, inline: true},
                {name: "Cost", value: item.cost, inline: true},
                {name: "Slots", value: item.slots, inline: true}
            ];
            return embedReturn;
        
        // spirit summons ---------------------------------------
        case("spirits"):
            embedReturn["fields"] = [
                {name: "Effect", value: item.effect, inline: true},
                {name: "FP Cost", value: item.fpCost, inline: true},
                {name: "HP Cost", value: item.hpCost, inline: true}
            ];
            return embedReturn;

        // locations ---------------------------------------
        case("locations"):
            return embedReturn;
    
        // error handling ---------------------------------------
        case("error"):
            return {
                title: "Error",
                description: `The command "${message.content.split(" ")[0]}" doesnt exist.\nCheck if you typed it right or try` + codeBlock("/help"),
                color: 0x8a0c0c
            }
        
        // help ---------------------------------------
        case("help"):
            return {
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
            }

        // about ---------------------------------------
        case("about"):
            return {
                title:"About",
                description: "Welcome, I am Miriel, steward of the church of vows." +
                "\nI can provide you with information about various things from the lands between." +
                "\nIf you are not sure how i work try" +
                codeBlock("!help"),
                color: embedColor
            }
        }
    }
