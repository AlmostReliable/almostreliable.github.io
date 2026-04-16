import { z } from "zod"
import fs from "fs"
import path from "path"

const schema = z.object({
    wikis: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
        })
    ),
})

const jsonString = fs.readFileSync(path.resolve(__dirname, "../", "wikis.json"), "utf-8")
const json = schema.parse(JSON.parse(jsonString))
const wikis: Map<string, WikiEntry> = new Map()

json.wikis.forEach(wiki => {
    wikis.set(wiki.id, wiki as WikiEntry)
})

export interface WikiEntry {
    id: string
    name: string
    description: string
}

export class WikiConfig {
    constructor(private wikis: Map<string, WikiEntry>) {}

    hasWiki(id: string): boolean {
        return this.wikis.has(id)
    }

    getWiki(id: string): WikiEntry {
        const wiki = this.wikis.get(id)
        if (!wiki) {
            throw new Error(`Wiki ${id} not found in wikis.json`)
        }

        return wiki
    }

    forEach(onEach: (wiki: WikiEntry) => void) {
        this.wikis.forEach(onEach)
    }
}

export default new WikiConfig(wikis)
