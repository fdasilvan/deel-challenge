const request = require("supertest");
const app = require("../../app");

describe("getProfile", () => {
  it("should return statusCode 200 if the header has a profile", async () => {
    const headers = {
      profile_id: 5
    };

    const response = await request(app).get("/contracts").set(headers);
    expect(response.statusCode).toEqual(200);
  });
});

describe("getProfile", () => {
  it("should return statusCode 401 if the header does NOT have a profile", async () => {
    const response = await request(app).get("/contracts");
    expect(response.statusCode).toEqual(401);
  });
});

describe("getProfile", () => {
  it("should return statusCode 401 if the header has an INVALID profile", async () => {
    const headers = {
      profile_id: 9999
    };

    const response = await request(app).get("/contracts").set(headers);
    expect(response.statusCode).toEqual(401);
  });
});
