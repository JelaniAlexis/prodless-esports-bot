import { ClientEvents, BaseInteraction, Message, SlashCommandBuilder, Collection, ModalSubmitInteraction } from "discord.js"

type ClientEvent<K extends keyof ClientEvents> = {
    title: K
    once: boolean
    listener: (...args: ClientEvents[K]) => void
}

type ClientCommand = {
    data: SlashCommandBuilder
    execute: (interaction: Interaction) => void
}

type ClientInteractionType = Interaction<CacheType>
| ChatInputCommandInteraction<CacheType>
| ModalSubmitInteraction<CacheType>

type ClientInteraction = {
    condition: (interaction: ClientInteractionType) => boolean
    callback: (interaction: ClientInteractionType) => void
}