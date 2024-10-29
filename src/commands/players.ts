import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, CollectorFilter, ComponentType, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Agent, ClientCommand, PlayerData, Rank, Role } from "../types";
import { join } from "path";
import { readFileSync } from "fs";

const command: ClientCommand = {
    data: new SlashCommandBuilder()
    .setName('players')
    .setDescription("Displays the team's players' stats."),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const dataFolder = join(__dirname, "../data");
        
        const playerDataPath = `${dataFolder}/players.json`;
        const playerDataFile = readFileSync(playerDataPath, "utf-8");
        const playerData: PlayerData[] = JSON.parse(playerDataFile);
        
        const ranksPath = `${dataFolder}/ranks.json`;
        const ranksFile = readFileSync(ranksPath, "utf-8");
        const ranks: Rank[] = JSON.parse(ranksFile);
        
        const rolesPath = `${dataFolder}/roles.json`;
        const rolesFile = readFileSync(rolesPath, "utf-8");
        const roles: Role[] = JSON.parse(rolesFile);

        const agentsPath = `${dataFolder}/agents.json`;
        const agentsFile = readFileSync(agentsPath, "utf-8");
        const agents: Agent[] = JSON.parse(agentsFile);

        let currentIndex = 0;

        const updateCurrentPlayer = (currentIndex: number) => {
            const currentPlayerData = playerData[currentIndex];
            const currentPlayerRank = ranks[currentPlayerData.rank];
            const currentPlayerRoles: string[] = [];

            for (let i = 0; i < currentPlayerData.roles.length; i++) {
                const roleToPush = roles.find(role => currentPlayerData.roles[i] == role.id);
                if (roleToPush) currentPlayerRoles.push(roleToPush.name);
            }
            const currentPlayerAgents: string[] = [];
            for (let i = 0; i < currentPlayerData.agents.length; i++) {
                const agentToPush = agents.find(agent => currentPlayerData.agents[i] == agent.id);
                if (agentToPush) currentPlayerAgents.push(agentToPush.name);
            }

            const currentPlayer = {
                id: currentPlayerData.id,
                name: currentPlayerData.name,
                discordId: currentPlayerData.discordId,
                riotId: currentPlayerData.riotId,
                active: currentPlayerData.active,
                rank: currentPlayerRank,
                roles: currentPlayerRoles,
                agents: currentPlayerAgents
            }

            return currentPlayer
        }

        const assembleMessage = (noButtons?: boolean) => {
            const currentPlayer = updateCurrentPlayer(currentIndex);

            const embed = new EmbedBuilder()
            .setTitle("Prodless Esports - Players")
            .setColor("#8f2fcf")
            .setDescription(
                `${currentPlayer.rank.iconEmoji} **${currentPlayer.name} - ${currentPlayer.riotId}**\n` +
                `**Role(s):** ${currentPlayer.roles.toString().replace(",", ", ")}\n` +
                `**Agent(s):** ${currentPlayer.agents.toString().replace(",", ", ")}`
            )
            .setFooter({
                text: `Result ${currentIndex + 1} of ${playerData.length}`
            })

            if (noButtons) {
                return { embeds: [ embed ] }
            }

            const previousButton = new ButtonBuilder()
            .setCustomId('players_prev')
            .setLabel('◀️ Previous')
            .setStyle(ButtonStyle.Secondary);

            const nextButton = new ButtonBuilder()
            .setCustomId('players_next')
            .setLabel('Next ▶️')
            .setStyle(ButtonStyle.Secondary);

            const actionRow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(previousButton, nextButton);

            return { embeds: [ embed ], components: [ actionRow ] }
        }

        const response = await interaction.reply(assembleMessage());

        const time = 120_000;

        try {
            const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time });

            collector.on('collect', async i => {
                if (i.user.id !== interaction.user.id) return;
                if (i.customId == "players_prev") {
                    currentIndex = currentIndex <= 0 ? playerData.length - 1 : currentIndex - 1;
                    i.update(assembleMessage());
                }
                else if (i.customId == "players_next") {
                    currentIndex = currentIndex >= playerData.length - 1 ? 0 : currentIndex + 1;
                    i.update(assembleMessage());
                }
            });
        } catch (error) {
            console.error(`[${new Date(Date.now()).toUTCString()}] Error reacting to component interaction.`)
        }
    },  
}

export default command