import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    srcDir: "./docs",
    title: "Summoning Rituals",
    base: "/summoningrituals/",
    themeConfig: {
        sidebar: [
            {
                text: "Intro",
                items: [
                    { text: "Introduction", link: "/" },
                    { text: "Example", link: "/example" },
                ],
            },
        ],
    },
})
