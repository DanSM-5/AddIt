// Setup for the "native" Vitest project (React Native component tests).
import * as rntlMatchers from '@testing-library/react-native/matchers';
import type { JestNativeMatchers } from '@testing-library/react-native/dist/matchers/types';
import { expect } from 'vitest';

// React Native Testing Library matchers (toHaveStyle, toBeDisabled,
// toBeOnTheScreen, ...) are only registered automatically under Jest.
expect.extend(rntlMatchers);

declare module 'vitest' {
  // Type parameters must match Vitest's own declaration of Matchers.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type
  interface Matchers<R extends void | Promise<void> = void | Promise<void>, T = unknown>
    extends JestNativeMatchers<R> {}
}
