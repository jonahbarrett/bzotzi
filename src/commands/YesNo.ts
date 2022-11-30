import {
    ApplicationCommandType,
    bold,
    ChatInputCommandInteraction,
    Client,
} from 'discord.js'
import { Command } from '../Command'

export const YesNo: Command = {
    name: 'yes_no',
    description: 'Says yes or no',
    type: ApplicationCommandType.ChatInput,
    run: async (_client: Client, interaction: ChatInputCommandInteraction) => {
        const yes = Math.random() > 0.5

        await interaction.followUp({
            ephemeral: false,
            content: yes
                ? `Hmm, I say ${bold('yes')}`
                : `Uhh, I don't think so.`,
        })
    },
}
