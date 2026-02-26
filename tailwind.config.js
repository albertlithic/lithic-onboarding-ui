/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.tsx',
    './screens/*.tsx',
    './components/*.tsx',
    './layouts/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--bg-default)',
          canvas: 'var(--bg-canvas)',
          strong: 'var(--bg-strong)',
        },
        fg: {
          DEFAULT: 'var(--fg-default)',
          strong: 'var(--fg-strong)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          muted: 'var(--border-muted)',
        },
        accent: {
          DEFAULT: 'var(--accent-bg)',
          border: 'var(--accent-border)',
          fg: 'var(--accent-fg)',
          'strong-bg': 'var(--accent-strong-bg)',
          'strong-border': 'var(--accent-strong-border)',
          'strong-fg': 'var(--accent-strong-fg)',
        },
        primary: {
          DEFAULT: 'var(--primary-bg)',
          border: 'var(--primary-border)',
          fg: 'var(--primary-fg)',
        },
        secondary: {
          DEFAULT: 'var(--secondary-bg)',
          fg: 'var(--secondary-fg)',
        },
        success: {
          DEFAULT: 'var(--success-bg)',
          border: 'var(--success-border)',
        },
        input: {
          border: 'var(--input-border)',
          placeholder: 'var(--input-placeholder)',
          fg: 'var(--input-fg)',
        },
      },
      fontFamily: {
        display: ["'ABC Monument Grotesk'", 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        sm: '0 2px 4px var(--shadow)',
        md: '0 4px 8px var(--shadow)',
        lg: '0 8px 24px var(--shadow)',
      },
      spacing: {
        xxs: 'var(--spacing-xxs)',
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        xxl: 'var(--spacing-xxl)',
      },
    },
  },
  plugins: [],
};
