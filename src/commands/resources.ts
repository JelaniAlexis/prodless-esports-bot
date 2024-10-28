import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ClientCommand, Resource } from "../types";
import { readFileSync } from "fs";
import { join } from "path"

const command: ClientCommand = {
    data: new SlashCommandBuilder()
    .setName('resources')
    .setDescription('Creates an embed based off the saved resources.'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const resourcesPath = join(__dirname, "../data/resources.json")
        const resourcesFile = readFileSync(resourcesPath, "utf-8");
        const resources: Resource[] = JSON.parse(resourcesFile);
        const fields = [];

        for (let i = 0; i < resources.length; i++) {
            const resource = resources[i];
            const resourceLink = resource.url ? `[${resource.name}](${resource.url})` : resource.name;
            const resourceNote = resource.note ? `\n*Note: ${resource.note}*` : "";
            fields.push({
                name: `${resource.emoji} ${resource.purpose}`,
                value: `${resourceLink}${resourceNote}`
            })
        }

        const embed = new EmbedBuilder()
        .setTitle("Resources for Prodless Esports")
        .setFields(fields)
        .setColor("#8f2fcf");

        const interactionChannel = await interaction.client.channels.fetch(interaction.channelId)

        if (!interactionChannel) {
            interaction.reply({
                ephemeral: true,
                content: "No channel was found to send the embed in. Try again later."
            });
            return;
        }

        if (interactionChannel.isSendable()) {
            interactionChannel.send({
                embeds: [ embed ]
            });
            interaction.reply({
                ephemeral: true,
                content: "Resources embed created."
            });
        }
        else {
            interaction.reply({
                ephemeral: true,
                content: "Could not find resources. Try again later."
            });
        }
    },  
}

export default command