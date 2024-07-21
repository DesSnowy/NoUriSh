const supertest = require("supertest");
const app = require("./app");

const jwtGenerator = require("./utils/jwtGenerator");
const { resetDB } = require("./database/query");

const userData = {
  email: "testEmail@test.com",
  password: "test123",
  name: "tester1",
  tele: "tester1",
  residence: "PGP",
};
const userToken = jwtGenerator(userData.email);

describe("given unknown routes", () => {
  it("should return a 404", async () => {
    await supertest(app).get("/undefined-links").expect(404);
  });
});

describe("/api/user", () => {
  describe("POST /signup", () => {
    describe("given all filled information", () => {
      it("should return 200 with {email, token}", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/user/signup")
          .send(userData);
        expect(statusCode).toBe(200);
        expect(body.email).toBe(userData.email);
        expect(body.token).toBeDefined();
      });
    });
    describe("given missing information", () => {
      it("should return 404 with {error: all field must be filled}", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/user/signup")
          .send({});
        expect(statusCode).toBe(400);
        expect(body.error).toBe("all field must be filled!");
      });
    });
  });

  describe("POST /login", () => {
    describe("given all correct information", () => {
      it("should return 200 with {email, token)", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/user/login")
          .send({ email: userData.email, password: userData.password });
        expect(statusCode).toBe(200);
        expect(body.email).toBe(userData.email);
        expect(body.token).toBeDefined();
      });
    });

    describe("given wrong email", () => {
      it("should return 400 with error", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/user/login")
          .send({ email: "unknownEmail", password: userData.password });
        expect(statusCode).toBe(400);
        expect(body.error).toBe("email does not exist!");
      });
    });

    describe("given wrong password", () => {
      it("should return 400 with error", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/user/login")
          .send({ email: userData.email, password: "wrongPassword" });
        expect(statusCode).toBe(400);
        expect(body.error).toBe("incorrect password!");
      });
    });

    describe("given missing information", () => {
      it("should return 400 with error", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/user/login")
          .send({});
        expect(statusCode).toBe(400);
        expect(body.error).toBe("all field must be filled!");
      });
    });
  });

  describe("GET /", () => {
    describe("given missing authorization", () => {
      it("should return 400 with error", async () => {
        const { statusCode, body } = await supertest(app).get("/api/user");
        expect(statusCode).toBe(400);
        expect(body.error).toBe("Authorisation required");
      });
    });

    describe("given wrong authorization request", () => {
      it("should return 400 with error", async () => {
        const { statusCode, body } = await supertest(app)
          .get("/api/user")
          .set({ authorization: `wrongAuthorization` });
        expect(statusCode).toBe(400);
        expect(body.error).toBe("Request is not authorised");
      });
    });
    describe("given valid authorization", () => {
      it("should return the current user detail", async () => {
        const { statusCode, body } = await supertest(app)
          .get("/api/user")
          .set({ authorization: `Bearer ${userToken}` });
        expect(statusCode).toBe(200);
        expect(body).toStrictEqual({
          email: userData.email,
          name: userData.name,
          tele: userData.tele,
          residence: userData.residence,
          isAdmin: false,
        });
      });
    });
  });
});

afterAll(() => {
  resetDB();
});
