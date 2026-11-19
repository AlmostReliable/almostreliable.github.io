import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    wikiId: "kubejs-actuallyadditions",
    srcDir: "./docs",
    themeConfig: {
        sidebar: [
            {
                text: "Introduction",
                items: [{ text: "Getting Started", link: "/" }],
            },
            {
                text: "Machine Recipes",
                items: [
                    { text: "Atomic Reconstructor", link: "machine/atomicreconstructor" },
                    { text: "Canola Press", link: "machine/canolapress" },
                    { text: "Crusher", link: "machine/crusher" },
                    { text: "Empowerer", link: "machine/empowerer" },
                    { text: "Fermenting Barrel", link: "machine/fermentingbarrel" },
                ],
            },
            {
                text: "Misc Recipes",
                items: [
                    { text: "Coffee Ingredient", link: "misc/coffeeingredient" },
                    { text: "Color Change", link: "misc/colorchange" },
                    { text: "Liquid Fuel", link: "misc/liquidfuel" },
                    { text: "Mining Lens", link: "misc/mininglens" },
                ],
            },
            {
                text: "Events",
                items: [
                    { text: "Overview", link: "event/overview" },
                    { text: "Empower", link: "event/empower" },
                ],
            },
            {
                text: "Bindings",
                items: [
                    { text: "Crushing Result", link: "binding/crushingresult" },
                    { text: "Effect Instance", link: "binding/effectinstance" },
                    { text: "Mob Effect", link: "binding/mobeffect" },
                ],
            },
        ],
    },
})
