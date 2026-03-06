import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    srcDir: "./docs",
    title: "Energy Meter",
    base: "/energymeter/",
    themeConfig: {
        sidebar: [
            {
                text: "Introduction",
                items: [
                    { text: "Getting Started", link: "/" },
                    { text: "What's New", link: "/whats_new" },
                ],
            },
            {
                text: "Usage",
                items: [
                    { text: "Basics", link: "/basics" },
                    { text: "Interface", link: "/interface" },
                ],
            },
        ],
    },
})
