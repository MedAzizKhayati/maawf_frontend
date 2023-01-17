/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primaryBg: "#282A37",
        secondaryBg: "#3E4151",
        teritiaryBg: "#35384B",
        primaryBlue: "#49A2E2",
        fadedBlue: "#49A2E242",
        fadedGray: "#949494",
        notification: {
          background: "#F33D3D",
          text: "#3A0E0E",
        },
      },
      animation: {
        "scale": "scale-in-center 2s ease-in-out infinite",
      },
      keyframes: {
        "scale-in-center": {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(0.5)",
            opacity: "0.5",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        }
      }
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    require("@tailwindcss/line-clamp"),
  ],
};
