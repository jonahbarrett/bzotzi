import { ApplicationCommandType, Client, CommandInteraction } from 'discord.js'
import { Command } from '../Command'

export const Hello: Command = {
    name: 'hello',
    description: 'Returns a greeting',
    type: ApplicationCommandType.ChatInput,
    run: (_client: Client, interaction: CommandInteraction) => {
        const content = 'Hello there!'

        void interaction.followUp({
            ephemeral: true,
            content,
        })
    },
}
