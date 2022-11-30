import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    Client,
} from 'discord.js'
import { Command } from '../Command'

export const VibeCheck: Command = {
    name: 'vibecheck',
    description: 'Do you pass the vibecheck?',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'target',
            description: 'Optionally vibecheck someone else',
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],
    run: async (_client: Client, interaction: ChatInputCommandInteraction) => {
        const user = interaction.options.getUser('target', false)
        let content = ''
        const passes = Math.random() > 0.5

        // Vibecheck the other user
        if (user != null) {
            content = `${user.toString()} ${
                passes ? 'passed' : 'failed'
            } the vibecheck!`
        } else {
            content = `You ${passes ? 'passed' : 'failed'} the vibecheck!`
        }

        await interaction.followUp({
            ephemeral: false,
            content,
        })
    },
}
