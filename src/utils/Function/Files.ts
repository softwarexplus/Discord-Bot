import fs from "node:fs"
import path from "node:path"

export default function Files(directory: string, foldersOnly: boolean = false): Array<string> {
    const fileNames: Array<string> = []
    const files = fs.readdirSync(directory, { withFileTypes: true })

    for (const file of files) {
        const filePath = path.join(directory, file.name)

        if (foldersOnly) {
            if (file.isDirectory()) {
                fileNames.push(filePath)
            }
        } else {
            if (file.isFile()) {
                fileNames.push(filePath)
            }
        }
    }
    return fileNames
}
