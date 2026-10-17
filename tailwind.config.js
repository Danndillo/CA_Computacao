/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', nav: '1100px', xl: '1280px' },
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        sand: 'var(--sand)',
        line: 'var(--line)',
        fg: 'var(--fg)',
        muted: 'var(--fg-muted)',
        ink: 'var(--ink)',
        'accent-text': 'var(--accent-text)',
        orange: { DEFAULT: '#F26F20', hot: '#F97627', burnt: '#E66E25' },
        night: '#020101',
        graphite: '#463E3A',
      },
      fontFamily: {
        display: ['Archivo', 'Arial Narrow', 'Arial', 'sans-serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      maxWidth: { wrap: '1200px' },
    },
  },
  plugins: [],
}
