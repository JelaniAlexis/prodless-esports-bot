import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Agent, ClientCommand, PlayerData, Rank, Role } from "../types";
import { getDataJSON } from "../fileParser";

const command: ClientCommand = {
    data: new SlashCommandBuilder()
    .setName('players')
    .setDescription("Displays the team's players' stats."),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const LISTEN_TIME = 120_000; // Time in milliseconds in which the command is able to listen for collector interactions

        const playerData: PlayerData[] = getDataJSON('players');
        const ranks:      Rank[]       = getDataJSON('ranks');
        const roles:      Role[]       = getDataJSON('roles');
        const agents:     Agent[]      = getDataJSON('agents');

        let currentIndex = 0;

        const updateCurrentPlayer = (currentIndex: number) => {
            const currentPlayerData = playerData[currentIndex];
            const currentPlayerRank = ranks[currentPlayerData.rank];
            const currentPlayerRoles: string[] = [];
            const currentPlayerAgents: string[] = [];

            for (let i = 0; i < currentPlayerData.roles.length; i++) {
                const roleToPush = roles.find(role => currentPlayerData.roles[i] == role.id);
                if (roleToPush) currentPlayerRoles.push(roleToPush.name);
            }
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

        try {
            const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: LISTEN_TIME });

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