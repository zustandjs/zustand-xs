import { expect, test } from 'vitest';
import { xs } from 'zustand-xs';

test('should export functions', () => {
  expect(xs).toBeDefined();
});
