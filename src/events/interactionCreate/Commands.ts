import { Interaction } from "discord.js"
import CommandData from "../../utils/Handler/Commands"

export default async function CommandHandler(interaction: Interaction) {
    if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
        try {
            const command = CommandData().find((cmd) => cmd.data.name === interaction.commandName)

            if (!command) {
                return interaction.reply({
                    embeds: [
                        {
                            color: 0x5865f2,
                            description: "Unknown Command"
                        }
                    ]
                })
            }

            command.run(interaction)
        } catch (error) {
            console.trace(error)
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "There was an error while executing this command!",
                    ephemeral: true
                })
            } else {
                await interaction.reply({
                    content: "There was an error while executing this command!",
                    ephemeral: true
                })
            }
        }
    }
}
