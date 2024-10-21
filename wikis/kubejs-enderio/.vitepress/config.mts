import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    srcDir: "./docs",
    title: "KubeJS EnderIO",
    themeConfig: {
        sidebar: [
            {
                text: "Introduction",
                items: [{ text: "Getting Started", link: "/" }],
            },
            {
                text: "Standard Recipes",
                items: [{ text: "Fire Crafting", link: "standard/firecrafting" }],
            },
            {
                text: "Machine Recipes",
                items: [
                    { text: "Alloy Smelter", link: "machine/alloysmelter" },
                    { text: "Enchanter", link: "machine/enchanter" },
                    { text: "Painting Machine", link: "machine/paintingmachine" },
                    { text: "Sag Mill", link: "machine/sagmill" },
                    { text: "Slice 'n Splice", link: "machine/slicensplice" },
                    { text: "Soul Binder", link: "machine/soulbinder" },
                    { text: "Tank", link: "machine/tank" },
                    { text: "Vat", link: "machine/vat" },
                ],
            },
            {
                text: "Events",
                items: [{ text: "Conduit Registration", link: "event/conduitregistry" }],
            },
            {
                text: "Bindings",
                items: [
                    { text: "Mob Category", link: "binding/mobcategory" },
                    { text: "Sag Mill Bonus", link: "binding/sagmillbonus" },
                    { text: "Sag Mill Output", link: "binding/sagmilloutput" },
                ],
            },
        ],
    },
})
