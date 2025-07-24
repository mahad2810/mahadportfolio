/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",

        // Glassmorphism color palette
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          medium: "rgba(255, 255, 255, 0.2)",
          dark: "rgba(0, 0, 0, 0.1)",
          darker: "rgba(0, 0, 0, 0.2)",
        },

        // Light theme colors
        light: {
          primary: "#f8fafc",
          secondary: "#64748b",
          tertiary: "#e2e8f0",
          accent: "#3b82f6",
        },

        // Accent colors for glassmorphism
        accent: {
          purple: "#8b5cf6",
          blue: "#3b82f6",
          pink: "#ec4899",
          cyan: "#06b6d4",
        }
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-light": "0 8px 32px 0 rgba(255, 255, 255, 0.1)",
        "glass-inset": "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
        "glass-gradient-dark": "linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05))",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
