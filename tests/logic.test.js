import { getUserInfo, fetchAllUsersData } from "../logic.js";
import assert from "node:assert";
import nock from "nock";
import test from "node:test";

const API_BASE = "https://www.codewars.com";

nock(API_BASE)
  .persist()
  .get("/api/v1/users/M-Abdoon")
  .reply(200, {
    username: "M-Abdoon",
    ranks: {
      overall: { rank: -6, name: "7 kyu", color: "red", score: 600 },
      languages: {
        python: { rank: -3, name: "3 kyu", color: "red", score: 400 },
      },
    },
    clan: "CodeYourFuture",
  });

nock(API_BASE)
  .persist()
  .get("/api/v1/users/networkError")
  .replyWithError("Network error");

nock(API_BASE).persist().get("/api/v1/users/userDoesntExist").reply(404);

test("getUserInfo - valid user is fetched correctly", async () => {
  const result = await getUserInfo("M-Abdoon");
  assert.strictEqual(result.data.username, "M-Abdoon");
});

test("getUserInfo - fetching a user that does not exist should show an error message", async () => {
  const result = await getUserInfo("userDoesntExist");
  assert.strictEqual(result.notFound, true);
  assert.strictEqual(result.username, "userDoesntExist");
});

test("getUserInfo - when the response is 404, an error message should be shown", async () => {
  const result = await getUserInfo("networkError");
  assert.strictEqual(result.error, true);
  assert.strictEqual(result.message, "Network error");
  assert.strictEqual(result.username, "networkError");
});

test("fetchAllUsersData - check function fetches multi users with correct information", async () => {
  const result = await fetchAllUsersData(
    "networkError, M-Abdoon, userDoesntExist",
  );

  assert.strictEqual(result.length, 3);
  assert.strictEqual(result[0].error, true);
  assert.strictEqual(result[0].message, "Network error");
  assert.strictEqual(result[0].username, "networkError");

  assert.strictEqual(result[1].data.username, "M-Abdoon");
  assert.strictEqual(result[1].data.ranks.overall.name, "7 kyu");
  assert.strictEqual(result[1].data.clan, "CodeYourFuture");

  assert.strictEqual(result[2].notFound, true);
  assert.strictEqual(result[2].username, "userDoesntExist");
});
