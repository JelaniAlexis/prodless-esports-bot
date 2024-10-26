import { SlashCommandBuilder } from "discord.js";
import { ClientCommand } from "../types";

const command: ClientCommand = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong.'),
    execute: (interaction) => {
        interaction.reply("hi");
    },  
}

export default command