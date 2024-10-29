import { ChatInputCommandInteraction } from "discord.js";
import { ClientEvent } from "../types";
import { getFolderDefaults } from "../fileParser";

const event: ClientEvent<"interactionCreate"> = {
    title: "interactionCreate",
    listener: (interaction) => {
        const interactionTypes = getFolderDefaults('interactionTypes');
        
        for (let i = 0; i < interactionTypes.length; i++) {
            const interactionType = interactionTypes[i];
            if (interactionType.condition(interaction)) {
                interactionType.callback(interaction as ChatInputCommandInteraction);
                break;
            }
        }
    },
    once: false
}

export default event