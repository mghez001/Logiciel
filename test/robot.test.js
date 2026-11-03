import { test } from "node:test";
import assert from "node:assert";
import { parse } from "./robot.js";

test("une commande invalide retourne undefined", () => {
  assert.deepEqual(parse("0X456"), [undefined]);
});

test("0X123 donne moveForward", () => {
  assert.deepEqual(parse("0X123"), ["moveForward"]);
});