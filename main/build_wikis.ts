import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import WikiConfig, { WikiEntry } from "./WikiConfig"

const ROOT_DIR = path.resolve(__dirname, "../")
const DIST_DIR = path.join(ROOT_DIR, "dist")
const WIKIS_DIR = path.join(ROOT_DIR, "wikis")
const LANDING_DIR = path.join(ROOT_DIR, "main", "landing-page")
const LANDING_TEMPLATE_PATH = path.join(LANDING_DIR, "index.template.html")
const LANDING_CSS_PATH = path.join(LANDING_DIR, "landing.css")
const LANDING_OUTPUT_HTML_PATH = path.join(DIST_DIR, "index.html")
const LANDING_OUTPUT_CSS_PATH = path.join(DIST_DIR, "landing.css")

function run() {
    cleanDist()
    buildWikis()
    buildLandingPage()
}
run()

function cleanDist() {
    console.log("Start cleaning wiki dist directory...")
    if (fs.existsSync(DIST_DIR)) {
        fs.rmSync(DIST_DIR, { recursive: true })
    }

    fs.mkdirSync(DIST_DIR, { recursive: true })
}

function buildWikis() {
    console.log("Start building wikis...")
    WikiConfig.forEach(wiki => {
        try {
            buildWiki(wiki)
        } catch (e) {
            console.error(e)
        }
    })
}

function buildWiki(wiki: WikiEntry) {
    console.log(`Start building ${wiki.id}...`)
    const wikiPath = path.join(WIKIS_DIR, wiki.id)
    if (!fs.existsSync(wikiPath)) {
        throw new Error(`Wiki ${wiki.id} not found`)
    }

    runBuild(wiki)

    const wikiDist = path.join(wikiPath, ".vitepress", "dist")
    const targetDist = path.join(DIST_DIR, wiki.id)
    moveWikiToDist(wikiDist, targetDist)
}

function runBuild(wiki: WikiEntry) {
    execSync(`npm run build wikis/${wiki.id}`, { cwd: ROOT_DIR, stdio: "inherit" })
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

function buildLandingPage() {
    console.log("Building landing page...")
    const htmlTemplate = fs.readFileSync(LANDING_TEMPLATE_PATH, "utf-8")
    const wikiCards = renderWikiCards()
    const html = htmlTemplate.replace("{{WIKI_CARDS}}", wikiCards)

    fs.writeFileSync(LANDING_OUTPUT_HTML_PATH, html, "utf-8")
    fs.copyFileSync(LANDING_CSS_PATH, LANDING_OUTPUT_CSS_PATH)
    console.log("Landing page built.")
}

function renderWikiCards(): string {
    const cards: string[] = []
    WikiConfig.forEach(wiki => {
        cards.push(renderWikiCard(wiki))
    })

    return cards.join("\n            ")
}

function renderWikiCard(wiki: WikiEntry): string {
    const wikiId = escapeHtml(wiki.id)
    const wikiName = escapeHtml(wiki.name)
    const wikiDescription = escapeHtml(wiki.description)

    return `<a class="wiki-card" href="/${wikiId}/"><span class="wiki-card__title">${wikiName}</span><span class="wiki-card__description">${wikiDescription}</span></a>`
}

function escapeHtml(text: string): string {
    return text.replace(/[&<>"']/g, match => {
        const map: Record<string, string> = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        }

        return map[match]
    })
}
