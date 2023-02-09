const request = require("supertest");
const app = require("../app");

describe("Contracts Router - getContracts", () => {
  it("Should only bring his own contracts, either as client or contractor", async () => {
    const headers = {
      profile_id: 6
    };

    const response = await request(app).get("/contracts").set(headers);

    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(jsonObj.length).toEqual(3);
  });

  it("Should NOT be able to access contracts other users", async () => {
    const headers = {
      profile_id: 5
    };

    const response = await request(app).get("/contracts").set(headers);

    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(jsonObj.length).toEqual(0);
  });

  it("Should NOT bring terminated contracts", async () => {
    const headers = {
      profile_id: 1
    };

    const response = await request(app).get("/contracts").set(headers);

    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
    // By default, client 1 has 2 contracts: 1 ongoing and 1 terminated
    expect(jsonObj.length).toEqual(1);
  });
});

describe("Contracts Router - getContractById", () => {
  it("Should allow owners to access a specific contract", async () => {
    const headers = {
      profile_id: 5
    };

    const response = await request(app).get("/contracts/1").set(headers);
    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(jsonObj.id).toEqual(1);
    expect(jsonObj.ContractorId).toEqual(5);
    expect(jsonObj.ClientId).toEqual(1);
  });

  it("Should NOT allow non-owners to access a specific contract", async () => {
    const headers = {
      profile_id: 6
    };

    const response = await request(app).get("/contracts/1").set(headers);

    expect(response.statusCode).toEqual(404);
  });

  it("Should return an error when searching for an invalid contract", async () => {
    const headers = {
      profile_id: 6
    };

    const response = await request(app).get("/contracts/11111111").set(headers);

    expect(response.statusCode).toEqual(404);
  });

  it("Should return an error when searching for an invalid user", async () => {
    const headers = {
      profile_id: 9999999
    };

    const response = await request(app).get("/contracts/1").set(headers);

    expect(response.statusCode).toEqual(401);
  });
});
