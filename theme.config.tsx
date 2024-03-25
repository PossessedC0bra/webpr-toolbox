import React from 'react'
import {DocsThemeConfig} from 'nextra-theme-docs'

const config: DocsThemeConfig = {
    logo: <span><b>WEBPR Toolbox</b></span>,
    project: {
        link: 'https://github.com/possessedc0bra/webpr-toolbox',
    },
    useNextSeoProps() {
        return {
            titleTemplate: '%s – WEBPR Toolbox',
        }
    },
    sidebar: {
        defaultMenuCollapseLevel: 1,
    },
    footer: {
        component: false,
    },
}

export default config
