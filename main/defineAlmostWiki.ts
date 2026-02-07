import { DefaultTheme, UserConfig } from "vitepress"

function getBaseThemeConfig(title: string): DefaultTheme.Config {
    return {
        editLink: {
            pattern: `https://github.com/AlmostReliable/almostreliable.github.io/edit/main/wikis/${title}/docs/:path`,
        },
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

export function defineConfig(config: UserConfig<DefaultTheme.Config>): UserConfig<DefaultTheme.Config> {
    if (!config.title) {
        throw new Error("Docs title not found")
    }

    config.head = [
        [
            "script",
            {
                src: "https://umami.almostreliable.com/script.js",
                "data-website-id": "48de55c0-1bad-43f4-a4b1-122a413ccb3d",
                defer: "",
            },
        ],
    ]

    config.srcDir = "./docs"
    config.base = config.base ?? `/${config.title.replace(/ /g, "").toLocaleLowerCase()}/`
    config.description = `Documentation for ${config.title}`

    const baseThemeConfig = getBaseThemeConfig(config.base)
    config.themeConfig = Object.assign(config.themeConfig || {}, baseThemeConfig)

    return config
}
