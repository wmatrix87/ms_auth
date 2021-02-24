import request from 'supertest';
import { app } from '../../app';

it('clears the cookies after sign out', async () => {
  process.env.JWT_KEY = 'test';
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(200);
});