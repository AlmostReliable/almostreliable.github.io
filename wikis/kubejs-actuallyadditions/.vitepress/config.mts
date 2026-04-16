import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    wikiId: "kubejs-actuallyadditions",
    srcDir: "./docs",
    themeConfig: {
        sidebar: [
            {
                text: "Intro",
                items: [
                    { text: "Introduction", link: "/" },
                    { text: "Examples", link: "/examples" },
                ],
            },
        ],
    },
})
