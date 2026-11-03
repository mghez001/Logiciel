import { test } from "node:test";
import assert from "node:assert";
import { parse } from "./robot.js";

test("une commande inconnue lève une erreur", () => {
  assert.throws(() => parse("0XFFF 0XABC"));
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

test("une commande compressée est dépliée", () => {
  assert.deepStrictEqual(
    parse("3*0X123"),
    ["moveForward", "moveForward", "moveForward"]
  );
});

test("mélange de commandes compressées et non compressées", () => {
  assert.deepStrictEqual(
    parse("2*0X123 0X789 2*0XABC"),
    ["moveForward", "moveForward", "moveBackward", "stop", "stop"]
  );
});

test("un nombre d'occurrences à 1 fonctionne", () => {
  assert.deepStrictEqual(parse("1*0XABC"), ["stop"]);
});

test("un nombre d'occurrences à 0 lève une erreur", () => {
  assert.throws(() => parse("0*0X123"));
});

test("une commande compressée inconnue lève une erreur", () => {
  assert.throws(() => parse("3*0XFFF"));
});