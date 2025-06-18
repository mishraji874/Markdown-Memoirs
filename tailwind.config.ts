import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Literata', 'serif'],
        code: ['Source Code Pro', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            // Base text colors (these will use light mode HSL vars by default)
            '--tw-prose-body': theme('colors.foreground'),
            '--tw-prose-headings': theme('colors.primary.DEFAULT'),
            '--tw-prose-lead': theme('colors.foreground'),
            '--tw-prose-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-bold': theme('colors.foreground'),
            '--tw-prose-counters': theme('colors.muted.foreground'),
            '--tw-prose-bullets': theme('colors.muted.foreground'),
            '--tw-prose-hr': theme('colors.border'),
            '--tw-prose-quotes': theme('colors.primary.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.accent.DEFAULT'),
            '--tw-prose-captions': theme('colors.muted.foreground'),
            '--tw-prose-th-borders': theme('colors.border'),
            '--tw-prose-td-borders': theme('colors.border'),

            // Code colors (inline and block)
            '--tw-prose-code': theme('colors.accent.DEFAULT'),      // Inline code text color
            '--tw-prose-pre-code': theme('colors.accent.foreground'),// Code block text color
            '--tw-prose-pre-bg': theme('colors.secondary.DEFAULT'),  // Code block background color

            // Explicit styling for inline code's background, padding, radius.
            // The plugin doesn't offer dedicated CSS vars for these inline code visual aspects.
            'code:not(pre > code)': {
              backgroundColor: theme('colors.muted'), 
              color: theme('colors.accent.DEFAULT'), // Ensure inline code text color is also set here if not via --tw-prose-code
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem', // sm
              fontWeight: '500', 
            },

            // --- Invert colors for dark mode ---
            // When .dark .prose-invert is active, these variables are used.
            // They correctly reference theme tokens which have their HSL values changed by globals.css .dark {}
            '--tw-prose-invert-body': theme('colors.foreground'),
            '--tw-prose-invert-headings': theme('colors.primary.DEFAULT'),
            '--tw-prose-invert-lead': theme('colors.foreground'),
            '--tw-prose-invert-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-invert-bold': theme('colors.foreground'),
            '--tw-prose-invert-counters': theme('colors.muted.foreground'),
            '--tw-prose-invert-bullets': theme('colors.muted.foreground'),
            '--tw-prose-invert-hr': theme('colors.border'),
            '--tw-prose-invert-quotes': theme('colors.primary.DEFAULT'),
            '--tw-prose-invert-quote-borders': theme('colors.accent.DEFAULT'),
            '--tw-prose-invert-captions': theme('colors.muted.foreground'),
            '--tw-prose-invert-th-borders': theme('colors.border'),
            '--tw-prose-invert-td-borders': theme('colors.border'),
            
            // Inverted code colors
            '--tw-prose-invert-code': theme('colors.accent.DEFAULT'),      // Inline code text (dark mode version of accent)
            '--tw-prose-invert-pre-code': theme('colors.accent.foreground'),// Code block text (dark mode version)
            '--tw-prose-invert-pre-bg': theme('colors.secondary.DEFAULT'),  // Code block background (dark mode version)

            // Explicit inverted styling for inline code background, etc.
            '.prose-invert code:not(pre > code)': {
              backgroundColor: theme('colors.muted'), // Uses dark mode muted
              color: theme('colors.accent.DEFAULT'), // Uses dark mode accent for text
              // padding, borderRadius, fontWeight will be inherited if not specified again
            },
          },
        },
      }),
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
