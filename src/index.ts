import { Client, GatewayIntentBits } from "discord.js"
import Events from "./utils/Handler/Events"
import config from "../config.json"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
})

Events(client)
client.login(config.token)

process.on("unhandledRejection", (reason: Error, p: Promise<any>) => {
    console.trace(reason, p)
})

process.on("uncaughtException", (err: Error, origin: string) => {
    console.trace(err, origin)
})

process.on("uncaughtExceptionMonitor", (err: Error, origin: string) => {
    console.trace(err, origin)
})
