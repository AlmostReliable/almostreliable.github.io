import { DefaultTheme, UserConfig } from "vitepress"

export function defineConfig(config: UserConfig<DefaultTheme.Config>): UserConfig<DefaultTheme.Config> {
    config.title = "AlmostWiki"

    if (!config.themeConfig) {
        config.themeConfig = {}
    }

    config.themeConfig.socialLinks = [
        {
            icon: "github",
            link: "https://github.com/AlmostReliable",
        },
        {
            icon: "discord",
            link: "https://discord.com/invite/ThFnwZCyYY",
        },
    ]

    config.themeConfig.search = {
        provider: "local",
        options: {
            detailedView: true,
            miniSearch: {
                searchOptions: {
                    maxFuzzy: 3,
                },
            },
        },
    }

    config.themeConfig.outline = {
        level: [2, 3],
    }

    return config
}
