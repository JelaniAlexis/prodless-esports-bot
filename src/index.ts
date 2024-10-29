import { Client, ClientEvents } from "discord.js";
import { getFolderDefaults, globalCommands } from "./fileParser";
import 'dotenv/config';
import { ClientCommand, ClientEvent } from "./types";

console.time("Startup");

const client = new Client({intents: []});

const commands: ClientCommand[] = getFolderDefaults('commands');
const events: ClientEvent<keyof ClientEvents>[] = getFolderDefaults('events');

for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    globalCommands.set(command.data.name, command);
}
for (let j = 0; j < events.length; j++) {
    const event = events[j];
    if (event.once) client.once(event.title, (...args: ClientEvents[typeof event.title]) => event.listener(...args));
    else client.on(event.title, (...args: ClientEvents[typeof event.title]) => event.listener(...args));
};

client.login(process.env.DISCORD_TOKEN as string).then(() => console.timeEnd("Startup"));