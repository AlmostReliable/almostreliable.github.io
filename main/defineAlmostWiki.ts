import { DefaultTheme, UserConfig } from "vitepress"

function getBaseThemeConfig(): DefaultTheme.Config {
    return {
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

    config.srcDir = "./docs"
    config.base = config.base ?? `/${config.title.toLocaleLowerCase()}/`
    config.description = `Documentation for ${config.title}`
    config.title = `${config.title} - AlmostReliable`

    const baseThemeConfig = getBaseThemeConfig();
    config.themeConfig = Object.assign(config.themeConfig || {}, baseThemeConfig);

    return config
}
