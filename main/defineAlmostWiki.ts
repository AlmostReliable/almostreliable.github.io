import { DefaultTheme, UserConfig } from "vitepress"

function getBaseThemeConfig(title: string): DefaultTheme.Config {
    return {
        editLink: {
            pattern: `https://github.com/AlmostReliable/almostreliable.github.io/edit/main/wikis/${title}/docs/:path`
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
    }
}

export function defineConfig(config: UserConfig<DefaultTheme.Config>): UserConfig<DefaultTheme.Config> {
    if (!config.title) {
        throw new Error("Docs title not found")
    }

    const wikiTitle = config.title

    config.srcDir = "./docs"
    config.base = config.base ?? `/${wikiTitle.toLocaleLowerCase()}/`
    config.description = `Documentation for ${wikiTitle}`
    config.title = `${wikiTitle} - AlmostReliable`

    const baseThemeConfig = getBaseThemeConfig(config.base)
    config.themeConfig = Object.assign(config.themeConfig || {}, baseThemeConfig)

    return config
}
