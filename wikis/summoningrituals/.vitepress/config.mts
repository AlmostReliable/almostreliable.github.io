import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    wikiId: "summoningrituals",
    srcDir: "./docs",
    themeConfig: {
        sidebar: [
            {
                text: "Introduction",
                items: [
                    { text: "Getting Started", link: "/" },
                    { text: "What's New", link: "/whats_new" },
                    { text: "Usage for Players", link: "/usage_for_players" },
                    { text: "Usage for Developers", link: "/usage_for_developers" },
                    { text: "Examples", link: "/examples" },
                ],
            },
            {
                text: "Recipe",
                items: [
                    { text: "Basics", link: "/recipe/basics" },
                    { text: "Inputs", link: "/recipe/inputs" },
                    { text: "Outputs", link: "/recipe/outputs" },
                    { text: "Block Patterns", link: "/recipe/block_patterns" },
                    { text: "Conditions", link: "/recipe/conditions" },
                ],
            },
            {
                text: "Events",
                items: [
                    { text: "Event Overview", link: "/event/overview" },
                    { text: "Summoning Start", link: "/event/start" },
                    { text: "Summoning Complete", link: "/event/complete" },
                    { text: "Ritual Renderer Registration", link: "/event/renderer" },
                ],
            },
            {
                text: "Bindings",
                items: [
                    { text: "Summoning Item", link: "/binding/item" },
                    { text: "Summoning Entity", link: "/binding/entity" },
                    { text: "Summoning Time", link: "/binding/time" },
                ],
            },
        ],
    },
})
