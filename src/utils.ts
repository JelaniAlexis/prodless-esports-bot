import { ClientEvents, Collection } from "discord.js";
import { ClientCommand, ClientEvent, ClientInteraction } from "./types";
import { readdirSync } from 'fs';
import { join } from 'path';

export const getCommands = (): ClientCommand[] => {
    const commandsPath = join(__dirname, 'commands');
    const commandFiles = readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));
    const commands = commandFiles.map(fileName => require(join(commandsPath, fileName))['default']);
    return commands;
};

export const getEvents = (): ClientEvent<keyof ClientEvents>[] => {
    const eventsPath = join(__dirname, 'events');
    const eventFiles = readdirSync(eventsPath).filter((file: string) => file.endsWith('.ts'));
    const events = eventFiles.map(fileName => require(join(eventsPath, fileName))['default']);
    return events;
};

export const getInteractionTypes = (): ClientInteraction[] => {
    const interactionsPath = join(__dirname, 'interactionTypes');
    const interactionFiles = readdirSync(interactionsPath).filter((file: string) => file.endsWith('.ts'));
    const interactions = interactionFiles.map(fileName => require(join(interactionsPath, fileName))['default']);
    return interactions;
};

export const globalCommands: Collection<string, ClientCommand> = new Collection();