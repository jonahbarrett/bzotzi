# Bzotzi

## Introduction

A simple bot made with [Discord.js](https://discord.js.org/#/) in Typescript.
Referenced [ItzDerock's template](https://github.com/ItzDerock/discord.js-typescript-bot-core) for the initial structure, but will be straying away from it as the bot develops.

This bot is a rewrite of a previous bot made in Python and now uses Discord's new slash commands. The plan is to add more advanced and universally usable commands instead of commands specific to my server.

## Environment Variables

Create two files `.env.prod` and `.env.dev` using the `template.env`.

The `env.dev` file is used by the dev docker setups so that you can use a separate token while testing your bot without worrying about conflicts with the production version. If you are not using a test token during development then you can use a copy of your `.env` file as the `docker-compose.yml` file will fail without a `.env.dev` file.

`clientId` and `guildId` are not used at the moment.

## Running the Bot

There are three configurations for running the bot. I will update this section with more information on how to use each section in the future.

1. Production
   * docker-compose.prod.yml - Runs without hot reloading and uses the `.env` file for variables.
2. Dev Server
   * docker-compose.yml - Runs with hot reloading and uses the `.env.dev` file for variables.
3. Devcontainer
   * Run as a dev container through VSCode, then connect and do development through there.
