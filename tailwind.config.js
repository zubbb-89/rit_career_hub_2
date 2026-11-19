/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/client/**/*.{tsx,ts,jsx,js}', './index.html'],
  theme: {
    extend: {
      colors: {
        rit: {
          navy: '#0c2340',
          navyDark: '#071526',
          navyLight: '#163861',
          amber: '#b45309',
          amberLight: '#d97706',
          canvas: '#fcfcfd',
          surface: '#ffffff',
          subtle: '#f8fafc',
          border: '#e2e8f0',
          borderStrong: '#cbd5e1',
          heading: '#0f172a',
          body: '#334155',
          muted: '#64748b',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      transitionTimingFunction: {
        entrance: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '350': '350ms',
      },
      borderRadius: {
        xs: '2px',
        sm: '3px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
      },
    },
  },
  plugins: [],
};
