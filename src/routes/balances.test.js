const request = require("supertest");
const app = require("../app");

describe("Balances Router - depositFunds", () => {
  it("Should not allow deposits for an invalid user.", async () => {
    const headers = {
      profile_id: 111
    };

    const response = await request(app)
      .post("/balances/deposit/111")
      .set(headers);
    expect(response.statusCode).toEqual(401);
  });

  it("Should not allow deposits for a different user.", async () => {
    const headers = {
      profile_id: 1
    };

    const body = {
      depositAmount: 1000
    };

    const response = await request(app)
      .post("/balances/deposit/2")
      .send(body)
      .set(headers);
    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(400);
    expect(jsonObj).toEqual(
      "It's not possible to deposit money to a different account."
    );
  });

  it("Should not allow deposits with a negative amount.", async () => {
    const headers = {
      profile_id: 1
    };

    const body = {
      depositAmount: -1000
    };

    const response = await request(app)
      .post("/balances/deposit/1")
      .send(body)
      .set(headers);
    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(400);
    expect(jsonObj).toEqual(
      "It's not possible to deposit a non-positive amount."
    );
  });

  it("Should not allow deposits more than 25% of the total amount of open jobs.", async () => {
    // Client 4 has only 1 job to be paid ($200), so we should allow a depoist higher than 50
    const headers = {
      profile_id: 4
    };

    const body = {
      depositAmount: 51
    };

    const response = await request(app)
      .post("/balances/deposit/4")
      .set(headers)
      .send(body);
    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(400);
    expect(jsonObj).toEqual(
      "It was not possible to make a deposit. The amount exceeds the 25% limit over active jobs."
    );
  });
});
