import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { reactNative } from 'vitest-native';

// Vitest is used for tests only; the app itself is bundled by Metro (Expo).
export default defineConfig({
  resolve: {
    // Mirror the "@/*" path alias from tsconfig.json
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  test: {
    exclude: ['node_modules/**', 'android/**', 'ios/**', '.expo/**'],
    projects: [
      {
        // Plain TypeScript logic, runs in Node without React Native.
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['**/*.test.ts'],
        },
      },
      {
        // React Native components, rendered with React Native Testing Library
        // on real React Native JS (native modules mocked by vitest-native).
        extends: true,
        plugins: [reactNative()],
        test: {
          name: 'native',
          include: ['**/*.test.tsx'],
          setupFiles: ['./test/setup-native.ts'],
        },
      },
    ],
  },
});
