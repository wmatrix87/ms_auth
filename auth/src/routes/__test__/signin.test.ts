import request from 'supertest';
import { app } from '../../app';

it('fails when email does not exist is supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(400);
});

it('fails when incorrect password is supplied', async () => {
  process.env.JWT_KEY = 'test';
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      password: "password1"
    })
    .expect(400);
});

it('respond with a cookies when given valid credantials', async () => {
  process.env.JWT_KEY = 'test';
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);
  expect(response.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
});