import request from 'supertest';
import { APP_URL, TESTER_EMAIL, TESTER_PASSWORD } from '../utils/constants';

describe('Course Module', () => {
  const app = APP_URL;
  const userEmail = TESTER_EMAIL;
  const userPassword = TESTER_PASSWORD;

  describe('Logged in user', () => {
    let userApiToken;

    beforeAll(async () => {
      await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: userEmail, password: userPassword })
        .then(({ body }) => {
          userApiToken = body.token;
        });
    });

    it('should retrieve all courses: /api/v1/courses (GET)', async () => {
      await request(app)
        .get('/api/v1/courses')
        .auth(userApiToken, {
          type: 'bearer',
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body).toHaveProperty('data');
          expect(body).toHaveProperty('hasNextPage');
          expect(Array.isArray(body.data)).toBe(true);
          expect(typeof body.hasNextPage).toBe('boolean');

          if (body.data.length > 0) {
            const course = body.data[0];
            expect(course).toHaveProperty('description');
            expect(course).toHaveProperty('fee');
            expect(course).toHaveProperty('name');
            expect(course).toHaveProperty('id');
            expect(course).toHaveProperty('createdAt');
            expect(course).toHaveProperty('updatedAt');

            expect(typeof course.description).toBe('string');
            expect(typeof course.fee).toBe('number');
            expect(typeof course.name).toBe('string');
            expect(typeof course.id).toBe('string');
            expect(new Date(course.createdAt).toString()).not.toBe(
              'Invalid Date',
            );
            expect(new Date(course.updatedAt).toString()).not.toBe(
              'Invalid Date',
            );
          }
        });
    });
  });
});
