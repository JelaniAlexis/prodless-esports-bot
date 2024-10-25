import { SlashCommandBuilder } from "discord.js";
import { ClientCommand } from "../types";

const command: ClientCommand = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong.'),
    execute: (message, args) => {
        message.reply("hi");
    },  
}

export default command