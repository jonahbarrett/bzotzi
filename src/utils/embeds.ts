import Discord from 'discord.js';

export const primaryEmbed = (title="", description="") => 
    new Discord.MessageEmbed({ color: "#548CFF", title, description })

export const errorEmbed = (title="", description="") => 
    new Discord.MessageEmbed({ color: "#F14A16", title, description })