import path from "node:path"
import getAllFiles from "../Function/Files"
import { Client } from "discord.js"

export default function EventsHandler(client: Client) {
    const eventFolders = getAllFiles(path.join(__dirname, "..", "..", "events"), true)
    try {
        for (const eventFolder of eventFolders) {
            let eventFiles = getAllFiles(eventFolder)
            eventFiles = eventFiles.sort()
            const eventName = eventFolder.replace(/\\/g, "/").split("/").pop() ?? ""
            client.on(eventName, async (...arg) => {
                try {
                    for (const eventFile of eventFiles) {
                        const eventFunction = require(eventFile)
                        await eventFunction.default(...arg, client)
                    }
                } catch (error) {
                    console.trace(error)
                }
            })
        }
    } catch (error) {
        console.trace(error)
    }
}
