import { z } from "zod"
import fs from "fs"
import path from "path"

const schema = z.object({
    wikis: z.array(
        z.object({
            name: z.string(),
        })
    ),
})

const jsonString = fs.readFileSync(path.resolve(__dirname, "../", "wikis.json"), "utf-8")
const json = schema.parse(JSON.parse(jsonString))
const wikis: Map<string, WikiEntry> = new Map()

json.wikis.forEach((wiki) => {
    wikis.set(wiki.name, wiki as WikiEntry)
})

export interface WikiEntry {
    name: string
}

export class WikiConfig {
    constructor(private wikis: Map<string, WikiEntry>) {}

    hasWiki(name: string): boolean {
        return this.wikis.has(name)
    }

    forEach(onEach: (wiki: WikiEntry) => void) {
        this.wikis.forEach(onEach)
    }
}

export default new WikiConfig(wikis)
