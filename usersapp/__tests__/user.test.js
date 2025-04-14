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
  }, 20000)
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
    console.log('RESULT>>', result)

    const res = await request(app)
      .get('/api/users/user3')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.username).toBe('user3')
    expect(res.body.data.email).toBe('user3@aueb.gr')
  })
})