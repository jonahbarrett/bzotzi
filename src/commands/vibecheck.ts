import SlashCommand, { SlashCommandOptions } from "../structures/Command";
import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types";

export default class Vibecheck extends SlashCommand {
    constructor() {
        let test: SlashCommandOptions = {requiredPermissions: []}
        super('vibecheck', 'Checks your vibe', test);
    }

    async exec(interaction: CommandInteraction) {
        await interaction.deferReply();
        const user = interaction.options.getUser('target');

        const name = user != null ? user : 'You';
        const passed = Math.random() < 0.5;

        interaction.editReply({content: `${name} ${passed ? 'passed' : 'failed'} the vibecheck!`}).catch(console.error);
    }

    build(client: Client<boolean>): SlashCommandBuilder | RESTPostAPIApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
        .setName(this.name)
        .setDescription(this.description)
        .addUserOption(option => option.setName('target').setDescription('Select a user'))
        .toJSON();
    }
}