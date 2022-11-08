import { validateEmailFormat } from '../validateEmailFormat';

describe('Validate email formatting', () => {
  test('0', () => {
    const result: any = validateEmailFormat('email@Google.com');
    expect(result).toBe(true);
  });

  test('1', () => {
    const result: any = validateEmailFormat('something.example.com');
    expect(result).toBe(false);
  });

  test('2', () => {
    const result: any = validateEmailFormat('user1+user2@mycompany.com');
    expect(result).toBe(true);
  });

  test('3', () => {
    const result: any = validateEmailFormat('user@host:300');
    expect(result).toBe(false);
  });

  test('4', () => {
    const result: any = validateEmailFormat('ponicode.com');
    expect(result).toBe(false);
  });

  test('5', () => {
    const result: any = validateEmailFormat('');
    expect(result).toBe(false);
  });
});
