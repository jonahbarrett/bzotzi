import * as dotenv from 'dotenv'
dotenv.config()

import { Client } from 'discord.js'
import ready from './listeners/ready'
import interactionCreate from './listeners/interactionCreate'

const { TOKEN } = process.env

console.log('Bot is starting...')

const client = new Client({
    intents: [],
})

ready(client)
interactionCreate(client)

void client.login(TOKEN)
