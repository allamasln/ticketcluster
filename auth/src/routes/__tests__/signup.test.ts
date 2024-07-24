import { it, expect, describe } from 'bun:test';
import { signupRequest } from '../../test/utils';
import { config } from '../../config';

const { password } = config.validation;

describe('User Signup', () => {
  it('returns 201 on successful signup', async () => {
    await signupRequest('test@test.com', 'password').expect(201);
  });

  it('returns 400 for invalid email', async () => {
    await signupRequest('invalid-email', 'password').expect(400);
  });

  it('returns 400 for invalid password length', async () => {
    await signupRequest('test@test.com', 'p'.repeat(password.minLength - 1)).expect(400);
    await signupRequest('test@test.com', 'p'.repeat(password.maxLength + 1)).expect(400);
  });

  it('returns 400 for missing email or password', async () => {
    await signupRequest('test@test.com', '').expect(400);
    await signupRequest('', 'password').expect(400);
  });

  it('returns 400 for duplicate email', async () => {
    await signupRequest('test@test.com', 'password').expect(201);
    await signupRequest('test@test.com', 'password').expect(400);
  });

  it('sets a cookie after successful signup', async () => {
    const response = await signupRequest('test@test.com', 'password');
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
