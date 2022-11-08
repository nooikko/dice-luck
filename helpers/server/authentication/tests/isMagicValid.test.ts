import { describe, expect, test } from '@jest/globals';

import { isMagicValid } from '../isMagicValid';

describe('Validate magic token datetime check', () => {
  test('Check current DateTime', () => {
    const result = isMagicValid(new Date());
    expect(result).toBe(true);
  });
});
