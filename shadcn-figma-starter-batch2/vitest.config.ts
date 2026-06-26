import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // Measure the testable source only. Story files, RSC screens under app/,
      // Storybook scaffolding, and config are not exercised by story tests.
      include: ['components/**', 'hooks/**', 'lib/**'],
      exclude: [
        '**/*.stories.*',
        '**/*.test.*',
        '**/*.config.*',
        '.storybook/**',
        'app/**',
        '**/node_modules/**',
        // Generated / pure-data modules: no testable logic, only data tables.
        '**/*.generated.ts',
        'lib/component-docs.ts',
        'lib/component-list.ts',
        'lib/nav.ts',
        // Docs-site presentation layer (renders the catalog/token data) — the
        // website that displays the library, not the shipped library itself.
        // Same category as app/. Story-tested coverage does not apply.
        'components/docs/**',
        // App-shell glue, not a catalog component: a one-line passthrough around
        // next-themes' provider, mounted only in app/layout.tsx (which is also
        // excluded). The Storybook preview uses its own ThemeWrapper, so nothing
        // in the test surface renders this file. Same category as app/.
        'components/theme-provider.tsx',
        // Stock shadcn components NOT in the Figma kit's 55-component catalog
        // (see lib/component-list.ts). They are intentionally story-less, so
        // they are outside the design-system coverage surface.
        'components/ui/form.tsx',
        'components/ui/resizable.tsx',
      ],
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          fileParallelism: false,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
      {
        // Node unit tests for pure-logic modules (lib/hooks helpers) that no story
        // exercises. IMPORTANT: these run ONLY in this project, so a coverage run
        // scoped to --project storybook (e.g. the Storybook Vitest panel) cannot
        // see lib/ or hooks/ and will show them at 0%. Always read coverage from
        // `npm run test:coverage` (both projects) — never a storybook-only run.
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['lib/**/*.test.ts', 'hooks/**/*.test.ts'],
        },
      },
    ],
  },
});
