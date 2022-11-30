import { generateRandomNumber } from '@helpers/tools'
import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    bold,
    ChatInputCommandInteraction,
    Client,
} from 'discord.js'
import { Command } from '../Command'

export const ChooseMulti: Command = {
    name: 'choose_multi',
    description: 'Chooses one of many options',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'option_list',
            description: 'List of comma separated options',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: (_client: Client, interaction: ChatInputCommandInteraction): void => {
        const choices = interaction.options.getString('option_list')

        if (choices == null) {
            void interaction.followUp({
                ephemeral: true,
                content: 'There seems to be an error...',
            })
            return
        }

        const choice_list = choices.split(',')

        if (choice_list.length == 0) {
            void interaction.followUp({
                ephemeral: true,
                content: 'You need to enter at least one option',
            })
            return
        }

        const random_index = generateRandomNumber(0, choice_list.length - 1)

        void interaction.followUp({
            ephemeral: false,
            content: `I choose: ${bold(choice_list[random_index].trim())}!`,
        })
    },
}
