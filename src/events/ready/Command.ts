import { Client, Collection, REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js"
import config from "../../../config.json"
import Commands from "../../Utils/Handler/Commands"

export default async function (client: Client<true>) {
    const rest = new REST().setToken(config.token)
    const commands: Array<RESTPostAPIApplicationCommandsJSONBody> = []
    const TestCommands: Array<RESTPostAPIApplicationCommandsJSONBody> = []
    
    for (const x of command) {
        if (x.data && typeof x.data.name === "string") {
            if (x.option?.AllowedServer) {
                TestCommands.push(x.data)
            } else {
                commands.push(x.data)
            }
        }
    }

    try {
        const data: any = await rest.put(Routes.applicationCommands(client.user.id), { body: commands })
        console.log(`Successfully reloaded ${data.length} application (/) commands.`)

        if (TestCommands.length > 0) {
            if (config.BetaServer instanceof Array) {
                for (const x of config.BetaServer) {
                    await rest
                        .put(Routes.applicationGuildCommands(client.user.id, x), { body: TestCommands })
                        .then(() =>
                            console.log(`Successfully reloaded ${TestCommands.length} application (/) commands for test.`)
                        )
                }
            }
        }
    } catch (error) {
        console.trace(error)
    }
}
