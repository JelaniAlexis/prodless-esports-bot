import { ChatInputCommandInteraction } from "discord.js";
import { ClientInteraction } from "../types";
import { globalCommands } from "../utils";

const clientInteraction: ClientInteraction = {
    condition: (interaction: ChatInputCommandInteraction) => interaction.isChatInputCommand(),
    callback: (interaction: ChatInputCommandInteraction) => {
        const command = globalCommands.get(interaction.commandName)
        if (!command) return console.error(`[${new Date(Date.now()).toUTCString()}] Couldn't find command ${interaction.commandName}`)
        command.execute(interaction)
    }
}


export default clientInteraction