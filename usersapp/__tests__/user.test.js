const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app')
const authService = require('../services/auth.service')
const userService = require('../services/user.services')

require('dotenv').config()

// Connecting to Mongodb
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(
      () => { console.log('Connection to Mongodb established for jest') },
      err => { console.log('Failed connect to Mongodb for jest', err) }
    )
})

// Close connection to Mongodb
afterEach(async () => {
  await mongoose.connection.close()
})

describe('Request for /api/users', () => {
  let token;
  beforeAll(() => {
    user = {
      username: "admin",
      email: "admin@aueb.gr",
      roles: ["EDITOR", "READER", "ADMIN"]
    }
    token = authService.generateAccessToken(user)
  })
  test('Get returns all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBeTruthy()
    expect(res.body.data.length).toBeGreaterThan(0);
  }, 50000);

  test('Post Creates a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        'username': 'user5',
        'password': '12345',
        'name': "user5name",
        'surname': 'user5surname',
        'email': 'user5@aueb.gr',
        'address': {
          'arrea': "area1",
          'rode': 'rode5'
        }
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();

  }, 50000),

    test('Post Creates a user that exists with same username', async () => {
      const res = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'username': 'user5',
          'password': '12345',
          'name': "name",
          'surname': 'surname',
          'email': 'email',
          'address': {
            'arrea': "area",
            'rode': 'rode'
          }
        });
      expect(res.statusCode).toBe(404);
      expect(res.body.status).not.toBeTruthy();

    }, 50000),

    test('Post Creates a user with same email', async () => {
      const res = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'username': 'user6',
          'password': '12345',
          'name': "name user6",
          'surname': 'surname test 6',
          'email': 'user5@aueb.gr',
          'address': {
            'area': 'area5',
            'road': 'road23'
          }
        });
      expect(res.statusCode).toBe(404);
      expect(res.body.status).not.toBeTruthy();
    }, 50000),

    test('Post Creates a user with empty name, surname, password', async () => {
      const res = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'username': 'user6',
          'password': '',
          'name': '',
          'surname': '',
          'email': 'user6aueb.gr',
          'address': {
            'area': 'area6',
            'road': 'road6'
          }
        });
        expect(res.statusCode).toBe(404);
        expect(res.body.status).not.toBeTruthy();
    }, 50000)
})

describe("Requests for /api/users/:username", () => {
  let token;
  beforeAll(() => {
    user = {
      username: "admin",
      email: "admin@aueb.gr",
      roles: ["EDITOR", "READER", "ADMIN"]
    }
    token = authService.generateAccessToken(user)
  })
  test("Get returns specific user", async () => {
    const result = await userService.findLastInsertedUser();
    // console.log('RESULT>>', result)

    const res = await request(app)
      .get('/api/users/user3')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.username).toBe('user3')
    expect(res.body.data.email).toBe('user3@aueb.gr')
  })
})