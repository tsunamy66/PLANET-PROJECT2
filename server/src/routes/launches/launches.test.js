const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
const underScore = require('../../utils/underscore');


describe("launches API", () => {
    beforeAll(async () => {
        await mongoConnect();
    })
    afterAll(async () => {
        underScore()
        await mongoDisconnect();
    })
    describe('Test GET /launches', () => {
        test('it should respond with 200 success', async () => {
            const response = await request(app).get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
            //  expect(response.statusCode).toBe(200)
        })
    })
    describe('Test POST /launch', () => {
        const completeLaunchData = {
            "launchDate": "2030-01-01",
            "mission": "test",
            "rocket": "test",
            "target": "Kepler-442 b",
        }
        const launchDataWithoutDate = {
            "mission": "test",
            "rocket": "test",
            "target": "Kepler-442 b"
        }
        const launchDataWithInvalidDate = {
            "launchDate": "zoot",
            "mission": "test",
            "rocket": "test",
            "target": "Kepler-442 b"
        }
        test('it should respond with 201 created', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);

            const requestDate = new Date(completeLaunchData.launchDate).valueOf()
            const responseDate = new Date(response.body.launchDate).valueOf()

            expect(requestDate).toBe(responseDate)
            expect(response.body).toMatchObject(launchDataWithoutDate)
        })

        test('it should catch missing required peroperties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);
            expect(response.body).toStrictEqual({
                error: "Missing required launch property",
            })
        })
        test('it should catch invalid date', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);
            expect(response.body).toStrictEqual({
                error: "Invalid launch date",
            })

        })
    })
})
