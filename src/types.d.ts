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

type Resource = {
    name: string
    url?: string
    purpose: string
    note?: string
    emoji: string
}

type PlayerData = {
    id: number
    name: string
    discordId: string
    riotId: string
    active: boolean
    rank: number
    roles: number[]
    agents: number[]
}

type Rank = {
    id: number,
    name: string,
    iconEmoji: string
}

type Role = {
    id: number,
    name: string
}

type Agent = {
    id: number,
    name: string
    role: number
}