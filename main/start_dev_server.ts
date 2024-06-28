import fs from "fs"
import express from "express"
import path from "path"
import WikiConfig, { WikiEntry } from "./WikiConfig"

const DIST_DIR = path.join(__dirname, "../dist")
if(!fs.existsSync(DIST_DIR)) throw new Error("Wiki dist directory not found")

const app = express()
app.use(express.static(DIST_DIR))

app.use((req, res, next) => {
    const urlPath = path.posix.normalize(req.path).replace(/^\//, "")
    const wikiName = (urlPath.split("/")[0] ?? "").toLowerCase()

    if (!WikiConfig.hasWiki(wikiName)) {
        return res.status(404).send("Wiki not found")
    }

    next()
})

const port = 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
