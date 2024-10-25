import { ClientEvents, Message, SlashCommandBuilder } from "discord.js"

type ClientEvent<K extends keyof ClientEvents> = {
    title: K
    once: boolean
    listener: (...args: ClientEvents[K]) => void
}

type ClientCommand = {
    data: SlashCommandBuilder
    execute: (message: Message, args: string[]) => void
}