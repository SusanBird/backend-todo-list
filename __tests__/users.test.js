const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  email: 'test@example.com',
  password: '123456',
};

describe('users', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
  });
});

it('signs in an existing user', async () => {
  await UserService.create(mockUser);
  const { email, password } = mockUser;
  const res = await request(app)
    .post('/api/v1/users/sessions')
    .send({ email, password });
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ message: 'Signed in successfully!' });
});


afterAll(() => {
  pool.end();
});
