// https://vitepress.dev/guide/custom-theme
import { h } from "vue"
import { useRoute, useRouter, type Theme } from "vitepress"
import DefaultTheme from "vitepress/theme"
import "./default-style.css"
import "./style.css"

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app, router, siteData }) {},
} satisfies Theme
