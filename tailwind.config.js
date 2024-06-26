export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari and Opera */
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },

        /* Hide scrollbar for IE, Edge and Firefox */
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],

  daisyui: {
    themes: [
      {
        emerald: {
          primary: "#2bb17d",
          "primary-focus": "#2fc189",
          "primary-content": "#F2F3F4",

          secondary: "#0e2a47",
          "secondary-focus": "#1F618D",
          "secondary-content": "#F2F3F4",

          accent: "#915efd", // Updated accent color
          "accent-focus": "#7d3ebd", // Updated accent focus color
          "accent-content": "#f9fafb",

          neutral: "#333c4d",
          "neutral-focus": "#1f242e",
          "neutral-content": "#f9fafb",

          "base-100": "#F2F3F4",
          "base-200": "#f9fafb",
          "base-300": "#f0f0f0",
          "base-content": "#333c4d",

          info: "#1c92f2",
          success: "#58d68d",
          warning: "#f4d03f",
          error: "#E74C3C",

          "--rounded-box": "1rem",
          "--rounded-btn": ".5rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": "0",
          "--animation-input": "0",

          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
};
