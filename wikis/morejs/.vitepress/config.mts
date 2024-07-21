import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    srcDir: "./docs",
    title: "MoreJS",
    themeConfig: {
        sidebar: [
            {
                text: "Intro",
                items: [{ text: "Event Overview", link: "/" }],
            },
            {
                text: "Villager Trades",
                items: [
                    { text: "Understanding trades", link: "/trades" },
                    { text: "Add trades", link: "/trades/add.md" },
                    { text: "Remove trades", link: "/trades/remove.md" },
                ],
            },
        ],
    },
})
