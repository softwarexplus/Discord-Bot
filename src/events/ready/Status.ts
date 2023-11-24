import { ActivityType, Client } from "discord.js"

export default async function (client: Client<true>) {
    client.user.setPresence({
        status: "idle",
        activities: [
            {
                name: "cool",
                type: ActivityType.Listening
            }
        ]
    })
}
