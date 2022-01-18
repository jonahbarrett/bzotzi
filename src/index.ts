import  { Client, Collection, Intents } from "discord.js";
import fs from 'fs';
import Event from './structures/Event';
import Command from './structures/Command';
import path from "path/posix";
import { env, exit } from "process";

export const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const eventsLoading = (async function loadEvents(dir=path.resolve(__dirname, "./events")) {
    const files = await fs.promises.readdir(dir);
    for (const file of files) {
        const fileDesc = fs.statSync(`${dir}/${file}`);

        if (fileDesc.isDirectory()) {
            await loadEvents(`${dir}/${file}`);
            continue;
        }

        const imported = await import(`${dir}/${file}`);
        const event: Event = new imported.default();
        event.register(client);
    }
})();

export const commands = new Collection<string, Command>();
const cmdsLoading = (async function loadCommands(dir=path.resolve(__dirname, './commands')) {
	const files = fs.readdirSync(dir);
	for(const file of files) {
		const fileDesc = fs.statSync(`${dir}/${file}`);

		if(fileDesc.isDirectory()) {
			await loadCommands(`${dir}/${file}`);
			continue;
		}

		const loadedCommand = await import(`${dir}/${file}`);
		const command: Command = new loadedCommand.default();

		commands.set(command.name, command);
	}
})();

Promise.all([eventsLoading, cmdsLoading]).then(() => {
	client.login(env.token);
});
