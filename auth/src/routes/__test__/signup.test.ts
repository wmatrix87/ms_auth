import request from 'supertest';
import { app } from '../../app';

it('should return 201 status on signup', async () => {
  process.env.JWT_KEY = 'test';
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);
});

it('should return 400 with invalid email', async () => {
  process.env.JWT_KEY = 'test';
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "test",
      password: "password"
    })
    .expect(400);
});

it('should return 400 with invalid password', async () => {
  process.env.JWT_KEY = 'test';
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "q"
    })
    .expect(400);
});

it('should return 400 with missing email password', async () => {
  process.env.JWT_KEY = 'test';
  return request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400);
});

it('duplicates disallow', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(400);
});

it('sets cookies', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});