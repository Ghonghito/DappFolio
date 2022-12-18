module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        firago: ["glaho", "regular"],
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        violet: '#801df0',
        violetDark: '#501296',
      }),
      colors: {
        darkBackground: "#090908",
        darkCard: "#121212",
        darkText: "#A3A3A8",
        darkModal: "#0e0e0e",
        darkShadow: "#101011",
        darkHover: "#18181B",
        darkBorder: "#27272A",
        lightBackground: "#F8F9FA",
        lightText: "#3A416F",
        lightModal: "#F8F9FA",
        lightHover: "#eff6ff",
        lightBorder: "#E4E4E7",
        primary: "#5b69de",
        primaryDark: "#323b85",
        dark: "#320073",
        warning: "#EDC31A",
        info: "#1AAAED",
        error: "#ED1A1A"
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      }
    },
  },
  plugins: [],
}