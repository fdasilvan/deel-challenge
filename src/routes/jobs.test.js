const request = require("supertest");
const app = require("../app");

describe("Jobs Router - getUnpaidJobs", () => {
  it("Should not bring jobs for contracts that are terminated.", async () => {
    // User 5 has only a terminated contract which shouldn't be fetched.
    const headers = {
      profile_id: 5
    };

    const response = await request(app).get("/jobs/unpaid").set(headers);

    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(jsonObj.length).toEqual(0);
  });

  it("Should not bring jobs that are already paid.", async () => {
    // User 3 has only a contract that is already paid.
    const headers = {
      profile_id: 3
    };

    const response = await request(app).get("/jobs/unpaid").set(headers);

    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(jsonObj.length).toEqual(0);
  });

  it("Should only bring contracts in which the logged user is either a client or a contractor", async () => {
    // User 6 has 2 unpaid contracts, with job IDs 2 and 3
    const headers = {
      profile_id: 6
    };

    const response = await request(app).get("/jobs/unpaid").set(headers);

    const jsonObj = JSON.parse(response.text);
    const isValid =
      jsonObj.filter((o) => o.id === 2 || o.id === 3).length === 2;

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(isValid).toEqual(true);
  });
});

describe("Jobs Router - payJob", () => {
  it("Should not allow a paid job to be paid again.", async () => {
    // Job 6 is already paid, so it shouldn't allow it to be paid
    const headers = {
      profile_id: 4
    };

    const response = await request(app).post("/jobs/6/pay").set(headers);
    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    expect(jsonObj).toEqual(
      "This job is already paid. You can't pay for the same job again."
    );
  });

  it("Should not allow a job to be paid for a different client.", async () => {
    // Job 2 has the client as user 1, so anything different shouldn't be allowed
    const headers = {
      profile_id: 6
    };

    const response = await request(app).post("/jobs/2/pay").set(headers);
    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    expect(jsonObj).toEqual("This job is can only be paid by the client.");
  });

  it("Should not allow a job to be paid for an invalid user.", async () => {
    const headers = {
      profile_id: 1111
    };

    const response = await request(app).post("/jobs/2/pay").set(headers);
    expect(response.statusCode).toEqual(401);
  });

  it("Should not allow a job to be paid if the client doesn't have enough balance.", async () => {
    const headers = {
      profile_id: 4
    };

    const response = await request(app).post("/jobs/5/pay").set(headers);
    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    expect(jsonObj).toEqual("It wasn't possible to make the transfer.");
  });

  it("Should allow the payment if all the necessary conditions are met.", async () => {
    // Job 3 is in progress, has client 2 (who has enought balance)
    const headers = {
      profile_id: 2
    };

    const response = await request(app).post("/jobs/3/pay").set(headers);
    const jsonObj = JSON.parse(response.text);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(jsonObj).toEqual("Payment sucessful!");
  });
});
