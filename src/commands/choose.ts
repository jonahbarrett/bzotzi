import SlashCommand, { SlashCommandOptions } from "../structures/Command";
import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types";
import { RandInt } from "../utils/helpers";

export default class Choose extends SlashCommand {
    constructor() {
        let test: SlashCommandOptions = {requiredPermissions: []}
        super('choose', 'Chooses between several options, or gives a yes or no.', test);
    }

    async exec(interaction: CommandInteraction) {
        await interaction.deferReply();
        const option = interaction.options.getString('single_option', false);
        const list_arg = interaction.options.getString('list_of_options', false);
        let list: string[] = [];
        let answer: string = '';

        if(list_arg != null) {
            list = list_arg.split("|");
            list.forEach(x => x.trim());
        }else if(option != null) {
            answer = RandInt(0, 1) == 0 ? 'Yes' : 'No';
        }

        if(list_arg != null && option != null) {
            list.push(option.trim());
        }

        if(list.length > 0) {
            answer = list[RandInt(0, list.length)];
        }

        interaction.editReply({content: `Hmm, I think: ${answer}`}).catch(console.error);
    }

    build(client: Client<boolean>): SlashCommandBuilder | RESTPostAPIApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption(option => option.setRequired(false).setName('single_option').setDescription('The bot will respond with a yes or no.'))
        .addStringOption(option => option.setRequired(false).setName('list_of_options').setDescription('Enter a list of items separated by a "|" and the bot will choose one of them.'))
        .toJSON();
    }
}