import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) - should return access token', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('access_token');
      });
  });

  it('/auth/refresh-token (POST) - should refresh token', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    return request(app.getHttpServer())
      .post('/auth/refresh-token')
      .send({ refreshToken: loginResponse.body.refresh_token })
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('access_token');
      });
  });

  it('/auth/logout (POST) - should log out user', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    return request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${loginResponse.body.access_token}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ message: 'Sesión cerrada correctamente' });
      });
  });

  it('/auth/request-password-reset (POST) - should request password reset', async () => {
    return request(app.getHttpServer())
      .post('/auth/request-password-reset')
      .send({ email: 'test@example.com' })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ message: 'Correo de recuperación enviado' });
      });
  });

  it('/auth/reset-password (POST) - should reset password', async () => {
    return request(app.getHttpServer())
      .post('/auth/reset-password?token=testtoken')
      .send({ newPassword: 'newPassword123' })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ message: 'Contraseña restablecida correctamente' });
      });
  });
});