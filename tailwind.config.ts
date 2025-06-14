import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1', // Indigo-500
        secondary: '#06b6d4', // Cyan-500
        accent: '#f59e42', // Orange-400
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-geist-mono)', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 32px 0 rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl: '1.25rem',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in',
      },
    },
  },
  plugins: [],
};

export default config; 