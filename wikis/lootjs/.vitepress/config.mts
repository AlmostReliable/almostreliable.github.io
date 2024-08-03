import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    srcDir: "./docs",
    title: "LootJS",
    themeConfig: {
        sidebar: [
            {
                text: "Introduction",
                items: [
                    { text: "Getting Started", link: "/" },
                    { text: "Event difference", link: "/difference" },
                ],
            },
            {
                text: "Loot Tables",
                items: [
                    { text: "Event Overview", link: "/loot-tables/event" },
                    { text: "Modify your first loot table", link: "/loot-tables/modify-loot-table" },
                    { text: "Create your first loot table", link: "/loot-tables/create-loot-table" },
                ],
            },
            {
                text: "Loot Modifiers",
                items: [{ text: "Event Overview", link: "/loot-modifiers/event" }],
            },
            {
                text: "API",
                items: [
                    { text: "ItemFilter", link: "/api/item-filter" },
                    { text: "LootTable", link: "/api/loot-table" },
                    { text: "LootPool", link: "/api/loot-pool" },
                    { text: "LootEntry", link: "/api/loot-entry" },
                    { text: "LootEntryTransformer", link: "/api/loot-entries-transformer" },
                    { text: "LootConditions", link: "/api/loot-condition" },
                    { text: "LootFunctions", link: "/api/loot-function" },
                    { text: "LootModifier", link: "/api/loot-modifier" },
                    { text: "LootContext", link: "/api/loot-context" },
                    { text: "NumberProvider", link: "/api/number-provider" },
                    { text: "Range", link: "/api/range" },
                ],
            },
        ],
    },
})
