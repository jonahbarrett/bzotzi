import SlashCommand, { SlashCommandOptions } from "../structures/Command";
import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types";
import { RandInt } from "../utils/helpers";

export default class Roll extends SlashCommand {
    constructor() {
        let test: SlashCommandOptions = {requiredPermissions: []}
        super('roll', 'Rolls a random number.', test);
    }

    async exec(interaction: CommandInteraction) {
        await interaction.deferReply();
        const low = interaction.options.getInteger('low', false) ?? 1;
        const high = interaction.options.getInteger('high', false) ?? 100;

        interaction.editReply({content: `${RandInt(low, high)} (${low}-${high})`}).catch(console.error);
    }

    build(client: Client<boolean>): SlashCommandBuilder | RESTPostAPIApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
        .setName(this.name)
        .setDescription(this.description)
        .addIntegerOption(option => option.setRequired(false).setName('low').setDescription('Low end of the range.'))
        .addIntegerOption(option => option.setRequired(false).setName('high').setDescription('High end of the range.'))
        .toJSON();
    }
}