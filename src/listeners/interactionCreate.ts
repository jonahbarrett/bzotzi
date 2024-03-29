import { Commands } from '../commands/index'
import { Client, Interaction, ChatInputCommandInteraction } from 'discord.js'

export default (client: Client): void => {
    client.on('interactionCreate', async (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            await handleSlashCommand(client, interaction)
        }
    })
}

const handleSlashCommand = async (
    client: Client,
    interaction: ChatInputCommandInteraction
): Promise<void> => {
    const slashCommand = Commands.find(
        (c) => c.name === interaction.commandName
    )

    if (!slashCommand) {
        void interaction.followUp({ content: 'An error has occurred...' })
        return
    }

    await interaction.deferReply()

    await slashCommand.run(client, interaction)
}
