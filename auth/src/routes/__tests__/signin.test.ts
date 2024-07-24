import { it, expect, describe } from 'bun:test';
import { signupRequest, signinRequest } from '../../test/utils';

describe('User Signin', () => {
  it('returns 400 for non-existent email', async () => {
    await signinRequest('test@test.com', 'password').expect(400);
  });

  it('returns 400 for incorrect password', async () => {
    await signupRequest('test@test.com', 'password').expect(201);
    await signinRequest('test@test.com', 'passworda').expect(400);
  });

  it('sets a cookie after successful signin', async () => {
    await signupRequest('test@test.com', 'password').expect(201);
    const response = await signinRequest('test@test.com', 'password');
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
