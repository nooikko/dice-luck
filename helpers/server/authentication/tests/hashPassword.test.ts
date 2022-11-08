import { describe, test } from '@jest/globals';

import { hashPassword } from '../hashPassword';

describe('Validate password hashes correctly', () => {
  test('Sample Password 1', async () => {
    await hashPassword('NoWiFi4you');
  });

  test('Sample Password 2', async () => {
    await hashPassword('$p3onyycat');
  });

  test('Sample Password 3', async () => {
    await hashPassword('YouarenotAllowed2Use');
  });

  test('Sample Password 4', async () => {
    await hashPassword('!Lov3MyPianoPony');
  });

  test('Sample Password 5', async () => {
    await hashPassword('accessdenied4u');
  });

  test('Sample Password 6', async () => {
    await hashPassword('');
  });
});
