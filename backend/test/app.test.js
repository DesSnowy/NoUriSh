const supertest = require("supertest");
const app = require("../app");

const jwtGenerator = require("../utils/jwtGenerator");
const { resetDB } = require("../database/query");

const userData = {
  email: "testEmail@test.com",
  password: "test123",
  name: "tester1",
  tele: "tester1",
  residence: "PGP",
};

const newUserData = {
  email: "testEmail@test.com",
  password: "test123",
  name: "tester1New",
  tele: "tester1New",
  residence: "PGP",
};

const orderData = {
  canteen: "frontier",
  stall: "chinese_frontier",
  foodItem: "Chicken Rice",
  price: 3.5,
  quantity: 2,
  group: 1,
};

const canteenData = {
  canteenName: "test_canteen",
  canteenImage: "test_image",
};

const stallData = {
  stallName: "test_stall",
  canteenId: 3,
};

const foodData = {
  foodName: "test_food",
  price: 5.0,
  stallId: 6,
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
      it("should return 400 with {error: all field must be filled}", async () => {
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

  describe("GET /:userEmail", () => {
    describe("given unknown useEmail", () => {
      it("should return 400 with error", async () => {
        const { statusCode, body } = await supertest(app)
          .get(`/api/user/unknownEmail`)
          .set({ authorization: `Bearer ${userToken}` });

        expect(statusCode).toBe(400);
        expect(body.error).toBe("User not found");
      });
    });

    describe("given correct email", () => {
      it("should return 200 with user detail", async () => {
        const { statusCode, body } = await supertest(app)
          .get(`/api/user/${userData.email}`)
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

  describe("PATCH /", () => {
    describe("given missing information", () => {
      it("should return 400 with error", async () => {
        const { statusCode, body } = await supertest(app)
          .patch("/api/user")
          .set({ authorization: `Bearer ${userToken}` })
          .send({});
        expect(statusCode).toBe(400);
        expect(body.error).toBe("all field must be filled!");
      });
    });

    describe("given all information", () => {
      it("should return 200 with newUserDetail", async () => {
        const { statusCode, body } = await supertest(app)
          .patch("/api/user")
          .set({ authorization: `Bearer ${userToken}` })
          .send({
            name: newUserData.name,
            tele: newUserData.tele,
            residence: newUserData.residence,
          });
        expect(statusCode).toBe(200);
        expect(body).toStrictEqual({
          email: newUserData.email,
          name: newUserData.name,
          tele: newUserData.tele,
          residence: newUserData.residence,
          isAdmin: false,
        });
      });
    });
  });
});

describe("/api/order", () => {
  describe("POST /", () => {
    describe("given missing information", () => {
      it("should return 400 with error", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/order")
          .set({ authorization: `Bearer ${userToken}` })
          .send([{}]);
        expect(statusCode).toBe(400);
        expect(body.error).toBe("all field must be filled!");
      });
    });

    describe("given correct information", () => {
      it("should return 200 with number of items added", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/order")
          .set({ authorization: `Bearer ${userToken}` })
          .send([orderData, orderData]);
        expect(statusCode).toBe(200);
        expect(body).toBe("2 item added");
      });
    });
  });

  describe("GET /", () => {
    describe("given proper authorization", () => {
      it("should return 200 with an array or orders", async () => {
        const { statusCode, body } = await supertest(app)
          .get("/api/order")
          .set({ authorization: `Bearer ${userToken}` });
        expect(statusCode).toBe(200);
        expect(body[0].id).toBeDefined();
        expect(body.length).toBe(2);
      });
    });
  });

  describe("GET /group/:groupId", () => {
    describe("given correct groupId", () => {
      it("should return the orders in that group", async () => {
        const { statusCode, body } = await supertest(app)
          .get(`/api/order/group/1`)
          .set({ authorization: `Bearer ${userToken}` });
        expect(statusCode).toBe(200);
        expect(body.length).toBe(2);
        expect(body[0].id).toBeDefined();
      });
    });
  });

  describe("PATCH /:orderId/status", () => {
    describe("given correct input", () => {
      it("should return 200 with the order", async () => {
        const { statusCode, body } = await supertest(app)
          .patch(`/api/order/1/status`)
          .set({ authorization: `Bearer ${userToken}` })
          .send({ orderStatus: "Delivered" });
        expect(statusCode).toBe(200);
        expect(body.orderStatus).toBe("Delivered");
      });
    });
  });
});

describe("/api/canteen", () => {
  describe("GET /", () => {
    describe("given normal input", () => {
      it("should return 200 with an array of canteen", async () => {
        const { statusCode, body } = await supertest(app)
          .get(`/api/canteen`)
          .set({ authorization: `Bearer ${userToken}` });

        expect(statusCode).toBe(200);
        expect(body.length).toBe(2);
        expect(body[0].activeGroups).toBe(1);
        expect(body[1].activeGroups).toBe(0);
      });
    });
  });

  describe("POST /", () => {
    describe("given missing information", () => {
      it("should return 400 with error", async () => {
        const { statusCode, body } = await supertest(app)
          .post(`/api/canteen`)
          .set({ authorization: `Bearer ${userToken}` })
          .send({});

        expect(statusCode).toBe(400);
        expect(body.error).toBe("all field must be filled!");
      });
    });

    describe("correct information", () => {
      it("should return 200 with the canteen", async () => {
        const { statusCode, body } = await supertest(app)
          .post(`/api/canteen`)
          .set({ authorization: `Bearer ${userToken}` })
          .send(canteenData);

        expect(statusCode).toBe(200);
        expect(body.canteen_name).toBe(canteenData.canteenName);
      });
    });
  });
});

describe("/api/stall", () => {
  describe("GET /:canteenId", () => {
    describe("given normal input", () => {
      it("should return 200 with an array of stall", async () => {
        const { statusCode, body } = await supertest(app)
          .get(`/api/stall/1`)
          .set({ authorization: `Bearer ${userToken}` });

        expect(statusCode).toBe(200);
        expect(body.length).toBe(2);
        expect(body[0].name).toBe("chinese_frontier");
        expect(body[1].name).toBe("korean_frontier");
      });
    });
  });

  describe("POST /", () => {
    describe("given missing information", () => {
      it("should return 400 with error", async () => {
        const { statusCode, body } = await supertest(app)
          .post(`/api/stall`)
          .set({ authorization: `Bearer ${userToken}` })
          .send({});

        expect(statusCode).toBe(400);
        expect(body.error).toBe("all field must be filled!");
      });
    });

    describe("correct information", () => {
      it("should return 200 with the stall", async () => {
        const { statusCode, body } = await supertest(app)
          .post(`/api/stall`)
          .set({ authorization: `Bearer ${userToken}` })
          .send(stallData);

        expect(statusCode).toBe(200);
        expect(body.stall_name).toBe(stallData.stallName);
        expect(body.canteen_id).toBe(3);
      });
    });
  });
});

describe("/api/food", () => {
  describe("GET /:stallId", () => {
    describe("given normal input", () => {
      it("should return 200 with an array of food item", async () => {
        const { statusCode, body } = await supertest(app)
          .get(`/api/food/1`)
          .set({ authorization: `Bearer ${userToken}` });

        expect(statusCode).toBe(200);
        expect(body.length).toBe(2);
        expect(body[0].name).toBe("Chicken Rice");
        expect(body[1].name).toBe("Chicken Noodle");
      });
    });
  });

  describe("POST /", () => {
    describe("given missing information", () => {
      it("should return 400 with error", async () => {
        const { statusCode, body } = await supertest(app)
          .post(`/api/food`)
          .set({ authorization: `Bearer ${userToken}` })
          .send({});

        expect(statusCode).toBe(400);
        expect(body.error).toBe("all field must be filled!");
      });
    });

    describe("given correct information", () => {
      it("should return 200 with the stall", async () => {
        const { statusCode, body } = await supertest(app)
          .post(`/api/food`)
          .set({ authorization: `Bearer ${userToken}` })
          .send(foodData);

        expect(statusCode).toBe(200);
        expect(body.food_name).toBe(foodData.foodName);
        expect(body.stall_id).toBe(foodData.stallId);
      });
    });
  });
});

afterAll(() => {
  resetDB();
});
