const supertest = require('supertest');
const url = 'http://localhost:4000';


describe("Testing the All Products API without Authentication", () => {

	it("It should give response status as 401 and message for authentication", async () => {

        const response = await supertest(url).get('/api/listAllProducts');
		expect(response.status).toBe(403);
		expect(response.body.message).toBe('Please sign-in and get auth-token to acess APIS');

	});

});

describe("Testing the All Products API with Authentication", () => {
 let authtoken ;
    beforeAll(async () => {
        const result = await supertest(url).post('/api/login').send({
            USER_NAME: "arpit12",
            PASSWORD : "admin123"
          });
     authtoken = result.body["auth-token"];

      });
      it("It should give response status as 200 and Product length as 8 (only 8 products are in DB)", async () => {
        const response = await supertest(url).get('/api/listAllProducts').set("authorization", authtoken);
		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(8);

    });
});

