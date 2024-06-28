import { defineConfig } from "../../../main/defineAlmostWiki";

export default defineConfig({
    srcDir: "./docs",
    title: "MoreJS",
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
