import { defineConfig } from "../../../main/defineAlmostWiki";

export default defineConfig({
    srcDir: "./docs",
    base: "/morejs/",
    themeConfig: {
        sidebar: [
            {
                text: "Intro",
                items: [
                    { text: "Getting Started", link: "/" },
                ],
            },
        ],
    },
})
