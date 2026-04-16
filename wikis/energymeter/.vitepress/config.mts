import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    wikiId: "energymeter",
    srcDir: "./docs",
    themeConfig: {
        sidebar: [
            {
                text: "Introduction",
                items: [
                    { text: "Getting Started", link: "/" },
                    { text: "What's New", link: "/whats_new" },
                ],
            },
            {
                text: "Usage",
                items: [
                    { text: "Basics", link: "/basics" },
                    { text: "Interface", link: "/interface" },
                ],
            },
        ],
    },
})
