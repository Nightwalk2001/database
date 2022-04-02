const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.tsx",
    ],
    theme: {
        extend: {
            spacing: {
                "1/10": "10%",
                "9/10": "90%",
                "1/12": "8.3%",
                "11/12": "91.7%",
                "1/20": "5%",
                "1.25": "0.3125rem"
            },
            animation: {
                "spin-slow": "spin 5s linear infinite",
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
                ff: ["FF Mark"],
                mono: ["Fira Code VF", ...defaultTheme.fontFamily.mono],
                source: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
                "ubuntu-mono": ["Ubuntu Mono", ...defaultTheme.fontFamily.mono],
                system: defaultTheme.fontFamily.sans,
                flow: "Flow",
            },
        },
    },
    plugins: [],
}
