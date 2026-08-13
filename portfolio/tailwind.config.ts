import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#030303',
          deep: '#000000',
          panel: '#0a0a0c',
        },
        cyan: {
          neon: '#00F0FF',
        },
        magenta: {
          neon: '#7000FF',
        },
        neon: {
          green: '#00F0FF',
          purple: '#7000FF',
          blue: '#00F0FF',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'monospace'],
      },
      animation: {
        flicker: 'flicker 3.5s infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        blink: 'blink 1s steps(1) infinite',
        'scan-sweep': 'scan-sweep 0.6s ease-out forwards',
        'flash-pulse': 'flash-pulse 0.5s ease-out forwards',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.6' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.75' },
          '97%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'scan-sweep': {
          '0%': { transform: 'translateY(-100%)', opacity: '0.9' },
          '100%': { transform: 'translateY(500%)', opacity: '0' },
        },
        'flash-pulse': {
          '0%': { opacity: '0.55' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
