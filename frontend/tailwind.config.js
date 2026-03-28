/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
                mono: ['"Fira Code"', 'monospace'],
            },
            colors: {
                primary: {
                    50: '#ECFDF5',
                    100: '#D1FAE5',
                    200: '#A7F3D0',
                    300: '#6EE7B7',
                    400: '#34D399',
                    500: '#10B981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065F46',
                    900: '#064E3B',
                },
                accent: {
                    400: '#FACC15',
                    500: '#EAB308',
                    600: '#CA8A04',
                    700: '#A16207',
                },
                dark: {
                    900: '#0f172a',
                    800: '#1e293b',
                    700: '#334155',
                }
            },
            boxShadow: {
                'soft-emerald': '0 20px 40px -15px rgba(16, 185, 129, 0.15)',
                'float': '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
                'glow': '0 0 20px rgba(16, 185, 129, 0.2)',
            },
            animation: {
                blob: "blob 7s infinite",
                shimmer: "shimmer 2s infinite linear",
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
                shimmer: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                }
            },
        },
    },
    plugins: [],
}
