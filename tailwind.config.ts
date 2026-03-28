/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'space': {
                    900: '#020817',
                    800: '#0a1628',
                    700: '#111d35',
                    600: '#162544',
                    500: '#1e3a5f',
                },
                'nebula': {
                    blue: '#1e40af',
                    purple: '#7c3aed',
                    cyan: '#06b6d4',
                },
                'thrust': {
                    orange: '#f97316',
                    yellow: '#fbbf24',
                    red: '#ef4444',
                },
                'moon': {
                    silver: '#d1d5db',
                    gray: '#9ca3af',
                    light: '#f3f4f6',
                },
                'hud': {
                    green: '#22c55e',
                    blue: '#3b82f6',
                    amber: '#f59e0b',
                },
            },
            fontFamily: {
                'space': ['Orbitron', 'monospace'],
                'body': ['Inter', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'twinkle': 'twinkle 3s ease-in-out infinite',
                'thrust': 'thrust 0.3s ease-in-out infinite',
                'shake': 'shake 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
                'rocket-move': 'rocketMove 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                twinkle: {
                    '0%, 100%': { opacity: '0.3' },
                    '50%': { opacity: '1' },
                },
                thrust: {
                    '0%, 100%': { opacity: '0.8', transform: 'scaleY(1)' },
                    '50%': { opacity: '1', transform: 'scaleY(1.2)' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-5px)' },
                    '75%': { transform: 'translateX(5px)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                rocketMove: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '25%': { transform: 'translateY(-3px) rotate(0.5deg)' },
                    '75%': { transform: 'translateY(3px) rotate(-0.5deg)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
