import { getCommands } from "./utils";
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import "dotenv/config"

if (process.argv.length == 2) throw new Error("No arguments passed in command line");

if (!process.argv[2]) throw new Error("Missing 'scope' argument in command line");
const scope = process.argv[2]

if (scope == "guild" && !process.argv[3]) throw new Error("Missing 'guildId' argument in command line");
const guildId = process.argv[3]


if (scope === "guild" || scope === "global") {
    const commandsToPush: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
    const commands = getCommands();
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        if (!command.data.name) throw new SyntaxError(`Command at index ${i - 1} is missing a name.`);
        if (!command.data.description) throw new SyntaxError(`Command '${command.data.name}' is missing a description.`);
        commandsToPush.push(command.data.toJSON());
    }

    const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

    if (scope == "guild") {
        rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID as string, guildId), { body: [] })
        .then(() => console.log('Successfully deleted guild commands.'))
        .catch(console.error);
    
        rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID as string, guildId),
            { body: commandsToPush },
        ).then(() => console.log("Successfully refreshed guild commands."))
        .catch(console.error);
    }
    
    if (scope == "global") {
        rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID as string), { body: [] })
        .then(() => console.log('Successfully deleted all application commands.'))
        .catch(console.error);

        rest.put(
            Routes.applicationCommands(process.env.DISCORD_CLIENT_ID as string),
            { body: commandsToPush },
        ).then(() => console.log("Successfully refreshed all application commands."))
        .catch(console.error);
    }
}
else {
    throw new Error("Invalid value assigned to 'scope' argument, choice between 'guild' and 'global'");
}

