import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    wikiId: "almostunified",
    srcDir: "./docs",
    themeConfig: {
        sidebar: [
            {
                text: "Introduction",
                items: [
                    { text: "Getting Started", link: "/" },
                    { text: "What's New", link: "/whats_new" },
                    { text: "Terminology", link: "/terminology" },
                    { text: "FAQ", link: "/faq" },
                ],
            },
            {
                text: "Features",
                items: [
                    { text: "How It Works", link: "/features/how_it_works" },
                    { text: "Loot Unification", link: "/features/loot" },
                    { text: "World Generation", link: "/features/world_gen" },
                    { text: "Debugging & Logs", link: "/features/debugging" },
                ],
            },
            {
                text: "Configuration",
                items: [
                    { text: "Overview", link: "/config/" },
                    { text: "Startup", link: "/config/startup" },
                    { text: "Unification", link: "/config/unification" },
                    { text: "Placeholders", link: "/config/placeholders" },
                    { text: "Tags", link: "/config/tags" },
                    { text: "Duplicates", link: "/config/duplicates" },
                    { text: "Debug", link: "/config/debug" },
                ],
            },
            {
                text: "Integration",
                items: [
                    { text: "Recipe Viewers", link: "/integration/recipe_viewers" },
                    { text: "KubeJS", link: "/integration/kubejs" },
                    { text: "Mod Compatibility", link: "/integration/mod_compat" },
                ],
            },
            {
                text: "Developers",
                items: [
                    { text: "Getting Started", link: "/api/" },
                    { text: "Runtime & Lookups", link: "/api/lookup" },
                    { text: "Plugins", link: "/api/plugins" },
                    { text: "Recipe Unifiers", link: "/api/recipe_unifiers" },
                    { text: "Custom Ingredient Unifiers", link: "/api/ingredient_unifiers" },
                ],
            },
            {
                text: "Add-ons",
                items: [{ text: "Immersive Engineering", link: "/addons/immersive_engineering" }],
            },
        ],
    },
})
