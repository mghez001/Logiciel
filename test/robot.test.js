import { test } from "node:test";
import assert from "node:assert";
import { parse } from "./robot.js";

const FORWARD = { name: "moveForward" };
const BACKWARD = { name: "moveBackward" };
const STOP = { name: "stop" };

test("0X123 donne moveForward", () => {
  assert.deepStrictEqual(parse("0X123"), [FORWARD]);
});

test("0X789 donne moveBackward", () => {
  assert.deepStrictEqual(parse("0X789"), [BACKWARD]);
});

test("0XABC donne stop", () => {
  assert.deepStrictEqual(parse("0XABC"), [STOP]);
});

test("une commande inconnue lève une erreur", () => {
  assert.throws(() => parse("0XFFF"));
  assert.throws(() => parse("hello"));
});

test("deux commandes différentes", () => {
  assert.deepStrictEqual(parse("0X123 0XABC"), [FORWARD, STOP]);
});

test("l'ordre des commandes est conservé", () => {
  assert.deepStrictEqual(parse("0XABC 0X789 0X123"), [STOP, BACKWARD, FORWARD]);
});

test("une même commande répétée", () => {
  assert.deepStrictEqual(parse("0X123 0X123"), [FORWARD, FORWARD]);
});

test("une commande inconnue au milieu du flux lève une erreur", () => {
  assert.throws(() => parse("0X123 0XFFF 0XABC"));
});

test("une commande compressée est dépliée", () => {
  assert.deepStrictEqual(parse("3*0X123"), [FORWARD, FORWARD, FORWARD]);
});

test("mélange de commandes compressées et non compressées", () => {
  assert.deepStrictEqual(
    parse("2*0X123 0X789 2*0XABC"),
    [FORWARD, FORWARD, BACKWARD, STOP, STOP]
  );
});

test("un nombre d'occurrences à 1 fonctionne", () => {
  assert.deepStrictEqual(parse("1*0XABC"), [STOP]);
});

test("un nombre d'occurrences à 0 lève une erreur", () => {
  assert.throws(() => parse("0*0X123"));
});

test("une commande compressée inconnue lève une erreur", () => {
  assert.throws(() => parse("3*0XFFF"));
});