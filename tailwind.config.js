export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#154360",
        "primary-light": "#1A5276",
        "primary-dark": "#0E2A47",
        secondary: "#1E8449",
        "secondary-light": "#239B56",
        "secondary-dark": "#186A3B",
        tertiary: "#F39C12",
        "tertiary-light": "#F5B041",
        "tertiary-dark": "#D68910",
        accent: "#7D3C98",
        "accent-light": "#8E44AD",
        "accent-dark": "#6C3483",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
