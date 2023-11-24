import { PermissionResolvable } from "discord.js"
import path from "node:path"
import files from "../Function/Files"

const Commands: Array<command> = []
type command = {
    data: {
        name: string
        description: string
        dm_permission?: boolean
        option?: Array<object>
    }
    run: Function
}

export default function CommandData(): Array<command> {
    if (Commands.length) {
        return Commands
    } else {
        const Command = files(path.join(__dirname, "..", "..", "commands"))

        for (const Data of Command) {
            Commands.push(require(Data))
        }

        return Commands
    }
}
