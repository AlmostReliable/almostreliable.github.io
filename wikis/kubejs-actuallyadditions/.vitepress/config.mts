import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    srcDir: "./docs",
    title: "KubeJS Actually Additions",
    themeConfig: {
        sidebar: [
            {
                text: "Intro",
                items: [{ text: "Introduction", link: "/" }],
            },
        ],
    },
})
