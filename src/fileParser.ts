import { Collection } from "discord.js";
import { ClientCommand } from "./types";
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export const getFolderDefaults = (folderName: string) => {
    const folderPath = join(__dirname, folderName);
    const folderFiles = readdirSync(folderPath).filter((file: string) => file.endsWith('.ts'));
    const defaults = folderFiles.map(fileName => require(join(folderPath, fileName))['default']);
    return defaults;
}

export const getDataJSON = (fileName: string) => {
    const dataFolder = join(__dirname, "data");
    const JSONPath = `${dataFolder}/${fileName}.json`;
    const JSONFile = readFileSync(JSONPath, "utf-8");
    const JSONData: [] = JSON.parse(JSONFile);
    return JSONData;
}

export const globalCommands: Collection<string, ClientCommand> = new Collection();