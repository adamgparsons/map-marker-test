const theme = {
    breakpoints: ["500px", "850px", "1170px"],
    space: [
        "0px",
        "4px",
        "8px",
        "16px",
        "24px",
        "32px",
        "64px",
        "128px",
        "256px",
        "512px",
    ],
    fontSizes: [
        "12px",
        "16px",
        "20px",
        "24px",
        "36px",
        "48px",
        "80px",
        "96px",
        "128px",
    ],
    borderWidths: [0, "1px", "2px", "4px", "8px", "16px", "32px"],
    radii: [0, "2px", "4px", "16px", "9999px", "100%"],
    lineHeights: ["1.0", "1.25", "1.5"],
    measures: ["20em", "30em", "34em"],
    typeface: "soleil, sans-serif",
    textStyles: {
        body: {
            fontSize: "18px",
            lineHeight: "24px",
            fontWeight: "400",
        },
        uiSmall: {
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: "400",
        },
    },
    colors: {
        white: "#FFFFFF",
        bgSurface: "#121212",
        bgGeneral: "#121212",
        bgNav: "#20202C",
        bgInactive: "#363641",
        bgLog: "#1A1A23",
        textInactive: "#888888",
        cta2: "#505A74"
    },
    boxShadows: {
        ui: `0px 4px 20px #20202C`
    }
}

export default theme