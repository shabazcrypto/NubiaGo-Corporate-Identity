export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1E3A5F',
          light: '#2D5A8A',
          sand: '#F5F0E8',
          gold: '#C9A227',
        },
        ink: '#1A1A1A',
        gray: {
          700: '#404040',
          500: '#737373',
          200: '#E5E5E5',
          50: '#FAFAFA',
        },
        state: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
}
