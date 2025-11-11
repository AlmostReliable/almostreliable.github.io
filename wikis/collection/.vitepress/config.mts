import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    srcDir: "./docs",
    title: "Collection",
    base: "/collection/",
    themeConfig: {
        sidebar: [
            {
                text: "Cheat Sheets",
                items: [
                    { text: "Gradle", link: "cheatsheets/gradle" },
                    { text: "Modding", link: "cheatsheets/modding" },
                ],
            },
            {
                text: "rlnt Blog",
                items: [{ text: "#1 Entity GUI Rendering", link: "rlnt-blog/entity-gui-rendering" }],
            },
        ],
    },
})
