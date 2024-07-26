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
                text: "Events",
                items: [
                    {
                        text: "Trading",
                        items: [
                            { text: "Understanding trades", link: "/understanding-trades" },
                            { text: "Villager trades", link: "/villager-trades" },
                            { text: "Wanderer trades", link: "/wanderer-trades" },
                            { text: "Update offer", link: "update-offer" },
                        ],
                    },
                    {
                        text: "Potion brewing",
                        link: "potion-brewing",
                    }
                ],
            },
            {
                text: "Utils",
                items: [
                    {
                        text: "VillagerUtils",
                        link: "villager-utils",
                    },
                    {
                        text: "MoreUtils",
                        link: "more-utils",
                    }
                ]
            }
        ],
    },
})
