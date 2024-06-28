import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import WikiConfig, { WikiEntry } from "./WikiConfig"

const ROOT_DIR = path.resolve(__dirname, "../")
const DIST_DIR = path.join(ROOT_DIR, "dist")
const WIKIS_DIR = path.join(ROOT_DIR, "wikis")

function run() {
    cleanDist()
    buildWikis()
}
run()

function cleanDist() {
    console.log("Start cleaning wiki dist directory...")
    if (fs.existsSync(DIST_DIR)) {
        fs.rmSync(DIST_DIR, { recursive: true })
    }

    fs.mkdirSync(DIST_DIR)
}

function buildWikis() {
    console.log("Start building wikis...")
    WikiConfig.forEach((wiki) => {
        try {
            buildWiki(wiki)
        } catch (e) {
            console.error(e)
        }
    })
}

function buildWiki(wiki: WikiEntry) {
    console.log(`Start building ${wiki.name}...`)
    const wikiPath = path.join(WIKIS_DIR, wiki.name)
    if (!fs.existsSync(wikiPath)) {
        throw new Error(`Wiki ${wiki.name} not found`)
    }

    runBuild(wiki)

    const wikiDist = path.join(wikiPath, ".vitepress", "dist")
    const targetDist = path.join(DIST_DIR, wiki.name)
    moveWikiToDist(wikiDist, targetDist)
}

function runBuild(wiki: WikiEntry) {
    execSync(`npm run build wikis/${wiki.name}`, { cwd: ROOT_DIR, stdio: "inherit" })
}

function moveWikiToDist(wikiDist: string, targetDist: string) {
    if (fs.existsSync(targetDist)) {
        fs.rmSync(targetDist, { recursive: true })
    }

    fs.renameSync(wikiDist, targetDist)

    if (fs.existsSync(wikiDist)) {
        fs.rmSync(wikiDist, { recursive: true })
    }
}
