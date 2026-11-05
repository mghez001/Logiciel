import { test } from "node:test";
import assert from "node:assert";
import { socialMedia } from "./socialMedia.js";

test("getPost retourne le post renvoyé par l'API", async (t) => {
  const fakePost = { userId: 1, id: 100, title: "Title", body: "Body" };
  const fetchMock = t.mock.method(globalThis, "fetch", async () => ({
    json: async () => fakePost,
  }));

  const post = await socialMedia.getPost(100);

  assert.deepStrictEqual(post, fakePost);

});