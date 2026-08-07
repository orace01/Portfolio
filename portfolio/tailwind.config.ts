import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#050515',
          deep: '#03030c',
          panel: '#0a0a1f',
        },
        cyan: {
          neon: '#00f3ff',
        },
        magenta: {
          neon: '#ff007f',
        },
        neon: {
          green: '#39ff14',
          purple: '#8b2fff',
          blue: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 10px rgba(0,243,255,0.75), 0 0 34px rgba(0,243,255,0.5), 0 0 64px rgba(0,243,255,0.25)',
        'glow-magenta': '0 0 10px rgba(255,0,127,0.75), 0 0 34px rgba(255,0,127,0.5), 0 0 64px rgba(255,0,127,0.25)',
        'glow-green': '0 0 10px rgba(57,255,20,0.75), 0 0 34px rgba(57,255,20,0.5), 0 0 64px rgba(57,255,20,0.25)',
        'glow-purple': '0 0 10px rgba(139,47,255,0.75), 0 0 34px rgba(139,47,255,0.5), 0 0 64px rgba(139,47,255,0.25)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at 50% 20%, rgba(139,47,255,0.4), transparent 60%)',
      },
      animation: {
        flicker: 'flicker 3.5s infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
} satisfies Config
