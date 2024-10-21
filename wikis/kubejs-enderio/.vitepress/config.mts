import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    srcDir: "./docs",
    title: "KubeJS EnderIO",
    themeConfig: {
        sidebar: [
            {
                text: "Intro",
                items: [{ text: "Introduction", link: "/" }],
            },
        ],
    },
})
