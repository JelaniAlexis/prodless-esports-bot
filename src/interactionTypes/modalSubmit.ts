import { ModalSubmitInteraction } from "discord.js";
import { ClientInteraction } from "../types";

const clientInteraction: ClientInteraction = {
    condition: (interaction: ModalSubmitInteraction) => interaction.isModalSubmit(),
    callback: (interaction: ModalSubmitInteraction) => {
        console.log('modeal')
    }
}

export default clientInteraction