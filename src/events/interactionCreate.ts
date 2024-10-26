import { ActionRowBuilder, ChannelSelectMenuBuilder, MentionableSelectMenuBuilder, TextChannel } from "discord.js";
import { ClientEvent } from "../types";
import { getInteractionTypes } from "../utils";

const event: ClientEvent<"interactionCreate"> = {
    title: "interactionCreate",
    listener: (interaction) => {
        const interactionTypes = getInteractionTypes();
        
        for (let i = 0; i < interactionTypes.length; i++) {
            const interactionType = interactionTypes[i];
            console.log(interactionType)
            if (interactionType.condition(interaction)) {
                interactionType.callback(interaction);
                break;
            }
        }
    },
    once: false
}

export default event