import { REST, Routes } from 'discord.js';
import "dotenv/config"

if (process.argv.length == 2) throw new Error("No arguments passed in command line");

if (!process.argv[2]) throw new Error("Missing 'scope' argument in command line");
const scope = process.argv[2];

if (scope == "guild" && !process.argv[3]) throw new Error("Missing 'guildId' argument in command line");
const guildId = process.argv[3];

const commandId = scope == "guild" ? process.argv[4] : scope == "global" ? process.argv[3] : null;

const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

if (scope == "guild") {
    if (commandId == null) {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID as string, guildId), { body: [] })
        .then(() => console.log('Successfully deleted guild commands.'))
        .catch(console.error);
    } else {
        rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID as string, guildId, commandId))
        .then(() => console.log('Successfully deleted guild command.'))
        .catch(console.error);
    }
}
else if (scope == "global") {
    if (commandId == null) {
        rest.put(Routes.applicationCommands(process.env.CLIENT_ID as string), { body: [] })
        .then(() => console.log('Successfully deleted all application commands.'))
        .catch(console.error);
    } else {
        rest.delete(Routes.applicationCommand(process.env.CLIENT_ID as string, commandId))
        .then(() => console.log('Successfully deleted application command'))
        .catch(console.error);
    }
}
else throw new Error("Invalid value assigned to 'scope' argument, choice between 'guild' and 'global'");