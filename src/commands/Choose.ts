import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    Client,
} from 'discord.js'
import { Command } from '../Command'

export const Choose: Command = {
    name: 'choose',
    description: 'chooses between two options',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'option_one',
            description: 'First option to choose between',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'option_two',
            description: 'Second option to choose between',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: (_client: Client, interaction: ChatInputCommandInteraction): void => {
        const opOne = interaction.options.getString('option_one') ?? ''
        const opTwo = interaction.options.getString('option_two') ?? ''
        const select_option_one = Math.random() > 0.5

        void interaction.followUp({
            ephemeral: false,
            content: `I choose: ${select_option_one ? opOne : opTwo}!`,
        })
    },
}
