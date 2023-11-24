import { ChatInputCommandInteraction } from "discord.js"
import { uptime } from "coolcake"

export const data = {
    name: "ping",
    description: "Pong",
    dm_permission: false
}

export async function run(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const reply = await interaction.fetchReply()
    const ping = reply.createdTimestamp - interaction.createdTimestamp
    interaction.followUp({
        embeds: [
            {
                color: 0x5865f2,
                description: `Client: ${ping}ms \nWebsocket: ${interaction.client.ws.ping}ms \nUptime: ${uptime()}`
            }
        ]
    })
}
