import { Client, ClientEvents, Collection } from "discord.js";
import { getCommands, getEvents, globalCommands } from "./utils";
import 'dotenv/config';

console.time("Startup");

const client = new Client({intents: []});

const commands = getCommands();

for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    // @ts-ignore
    globalCommands.set(command.data.name, command);
}

// Events
const events = getEvents();

for (let j = 0; j < events.length; j++) {
    const event = events[j];
    if (event.once) client.once(event.title, (...args: ClientEvents[typeof event.title]) => event.listener(...args));
    else client.on(event.title, (...args: ClientEvents[typeof event.title]) => event.listener(...args));
};

// Log in
client.login(process.env.DISCORD_TOKEN as string).then(() => console.timeEnd("Startup"));