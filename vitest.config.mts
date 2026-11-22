import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Vitest is used for tests only; the app itself is bundled by Metro (Expo).
// These tests cover plain TypeScript logic and run in Node, without React Native.
export default defineConfig({
  resolve: {
    // Mirror the "@/*" path alias from tsconfig.json
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules/**', 'android/**', 'ios/**', '.expo/**'],
  },
});
