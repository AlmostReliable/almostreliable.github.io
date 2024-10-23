import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    srcDir: "./docs",
    title: "KubeJS ActuallyAdditions",
    base: "/kubejs-actuallyadditions/",
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
