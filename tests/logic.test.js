import { getUserInfo, fetchAllUsersData } from "../logic.js";
import assert from "node:assert";
import nock from "nock";
import test from "node:test";

const API_BASE = "https://www.codewars.com";

nock.disableNetConnect();

nock(API_BASE)
  .get("/api/v1/users/M-Abdoon")
  .reply(200, {
    username: "M-Abdoon",
    ranks: {
      overall: { rank: -4, name: "4 kyu", color: "blue", score: 500 },
      languages: {
        javascript: { rank: -4, name: "4 kyu", color: "blue", score: 300 },
      },
    },
    clan: "ClanA",
  });

nock(API_BASE).get("/api/v1/users/userDoesntExist").reply(404);

nock(API_BASE)
  .get("/api/v1/users/user2")
  .reply(200, {
    username: "user2",
    ranks: {
      overall: { rank: -3, name: "3 kyu", color: "green", score: 600 },
      languages: {
        python: { rank: -3, name: "3 kyu", color: "green", score: 400 },
      },
    },
    clan: "ClanB",
  });

nock(API_BASE)
  .get("/api/v1/users/networkError")
  .replyWithError("Network error");

test("getUserInfo - valid user", async () => {
  const result = await getUserInfo("M-Abdoon");
  assert.strictEqual(result.data.username, "M-Abdoon");
});

test("getUserInfo - user not found", async () => {
  const result = await getUserInfo("userDoesntExist");
  assert.strictEqual(result.notFound, true);
  assert.strictEqual(result.username, "userDoesntExist");
});

test("getUserInfo - network error", async () => {
  const result = await getUserInfo("networkError");
  assert.strictEqual(result.error, true);
  assert.strictEqual(result.message, "Network error");
  assert.strictEqual(result.username, "networkError");
});
