import { DefaultTheme, UserConfig } from "vitepress"
import WikiConfig from "./WikiConfig"

function getBaseThemeConfig(wikiId: string): DefaultTheme.Config {
    return {
        editLink: {
            pattern: `https://github.com/AlmostReliable/almostreliable.github.io/edit/main/wikis/${wikiId}/docs/:path`,
        },
        nav: [{ text: "Home", link: "/..", target: "_self" }],
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/AlmostReliable",
            },
            {
                icon: "discord",
                link: "https://discord.com/invite/ThFnwZCyYY",
            },
        ],
        search: {
            provider: "local",
            options: {
                detailedView: true,
                miniSearch: {
                    searchOptions: {
                        maxFuzzy: 2,
                    },
                },
            },
        },
        outline: {
            level: [2, 3],
        },
        lastUpdated: {
            text: "Last updated",
        },
    }
}

type AlmostWikiUserConfig = UserConfig<DefaultTheme.Config> & {
    wikiId: string
}

export function defineConfig(config: AlmostWikiUserConfig): UserConfig<DefaultTheme.Config> {
    const { wikiId, ...vitepressConfig } = config
    const wiki = WikiConfig.getWiki(wikiId)

    vitepressConfig.head = [
        [
            "script",
            {
                src: "https://umami.almostreliable.com/script.js",
                "data-website-id": "48de55c0-1bad-43f4-a4b1-122a413ccb3d",
                defer: "",
            },
        ],
    ]

    vitepressConfig.title = wiki.name
    vitepressConfig.srcDir = "./docs"
    vitepressConfig.base = vitepressConfig.base ?? `/${wiki.id}/`
    vitepressConfig.description = `Documentation for ${wiki.name}`

    const baseThemeConfig = getBaseThemeConfig(wiki.id)
    vitepressConfig.themeConfig = Object.assign(vitepressConfig.themeConfig || {}, baseThemeConfig)

    return vitepressConfig
}
