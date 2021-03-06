import { SlashCommandBuilder } from '@discordjs/builders';
import { client, commands } from '../index';
import Event from '../structures/Event';
import { discordLogger } from '../utils/logger';
import SlashCommand from '../structures/Command';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types';
import { ApplicationCommandData } from 'discord.js';

const truthyFilter = <T>(x: T | false | undefined | "" | 0): x is T => !!x;

export default class ReadyEvent extends Event {
    constructor() { super('Ready', 'ready'); };

    async exec() {
        const arg = process.argv[2];
        discordLogger.info(`🤖 Logged in as ${client?.user?.tag}!`);
        discordLogger.info(`📊 Currently in ${client?.guilds.cache.size} guilds.`);

        if(['deploy', 'register', 'edit'].includes(arg)) {
            discordLogger.debug(`Fetching application...`);
            await client.application?.commands.fetch();
            discordLogger.debug(`Fetched ${client.application?.commands.cache.size} commands.`);
        }

        if(arg === "deploy" || arg === "register") {
            const deploy = arg === "deploy";

            discordLogger.info(`${deploy ? "Deploying" : "Registering"} ${commands.size} commands...`);
            
            const commandsToDeploy = 
                !deploy ? commands.filter(c => client.application?.commands.cache.some((cmd: { name: string; }) => cmd.name === c.name) === false).values()
                : commands.values();

            client.application?.commands.cache.forEach((val, key) => {
                discordLogger.info(`${val}, ${key}`);
            });

            for(const command of commandsToDeploy) {
                discordLogger.debug(`${deploy ? "Deploying" : "Registering"} command ${command.name}...`);
                const json = buildSlashCommand(command);
                await client.application?.commands.create(json);
                discordLogger.debug(`${deploy ? "Deployed" : "Registered"} command ${command.name}.`);
            }

            discordLogger.info(`${deploy ? "Deployed" : "Registered"} ${commands.size} commands.`);
        }

        if(arg === 'edit') {
            const commandNames   = process.argv.slice(3).map(cmd => cmd.toLowerCase());
            const commandsToEdit = commandNames.map(c => commands.get(c)).filter(truthyFilter);

            if(!commandsToEdit.length) {
                discordLogger.warn(`Edit option requires at least one valid command to edit.`);
                return;
            }

            discordLogger.info(`Editing ${commandsToEdit.length} commands...`);
            discordLogger.debug(commandsToEdit.map(cmd => cmd.name).join(', '));

            const dataForCommands = commandsToEdit.map(cmd => client.application?.commands.cache.find((c: { name: string; }) => c.name === cmd.name));

            for(const command of commandsToEdit) {
                const commandData = dataForCommands.find(c => c?.name === command.name);
                if(!commandData) {
                    discordLogger.warn(`Could not find command ${command.name}, registering it instead.`);
                    await client.application?.commands.create(buildSlashCommand(command));
                    discordLogger.info(`Registered command ${command.name}.`);
                } else {
                    discordLogger.debug(`Editing command ${command.name}...`);
                    commandData.edit(buildSlashCommand(command) as ApplicationCommandData);
                    discordLogger.debug(`Edited command ${command.name}.`);
                }
            }
        }

        if(arg === 'delete') {
            const commandsToDelete = await client.application?.commands.fetch();
            commandsToDelete?.forEach(async (x) => {
                await x.delete();
            })
        }
    }
}

function buildSlashCommand(command: SlashCommand): RESTPostAPIApplicationCommandsJSONBody {
    var data = command.build(client);
    if(data instanceof SlashCommandBuilder) data = data.toJSON();
    return data;
}