import { test } from "node:test";
import assert from "node:assert";
import { parse } from "./robot.js";

test("une commande inconnue lève une erreur", () => {
  assert.throws(() => parse("0XFFF"));
});

test("une commande inconnue au milieu du flux lève une erreur", () => {
  assert.throws(() => parse("0X123 0XFFF 0XABC"));
});

test("0X123 donne moveForward", () => {
  assert.deepEqual(parse("0X123"), ["moveForward"]);
});

test("0X789 donne moveBackward", () => {
  assert.deepEqual(parse("0X789"), ["moveBackward"]);
});

test("0XABC donne stop", () => {
  assert.deepEqual(parse("0XABC"), ["stop"]);
});

test("deux commandes différentes", () => {
  assert.deepStrictEqual(parse("0X123 0XABC"), ["moveForward", "stop"]);
});

test("une même commande répétée", () => {
  assert.deepStrictEqual(
    parse("0X123 0X123"),
    ["moveForward", "moveForward"]
  );
});
