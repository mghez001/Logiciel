import { test } from "node:test";
import assert from "node:assert";
import { slotMachine } from "./slotMachine.js";

test("retourne 0 si aucun symbole identique", () => {
  assert.equal(slotMachine(5, ["+", "%", "*"]), 0);
});

test("double la mise si les 2 derniers symboles sont identiques", () => {
  assert.equal(slotMachine(5, ["+", "%", "%"]), 10);
});

test("double la mise si les 2 premiers symboles sont identiques", () => {
  assert.equal(slotMachine(5, ["+", "+", "%"]), 10);
});

test("x5 la mise si les 3 symboles sont identiques", () => {
  assert.equal(slotMachine(5, ["+", "+", "+"]), 25);
});

test("x20 la mise si les 3 symboles sont des dollars", () => {
  assert.equal(slotMachine(5, ["$", "$", "$"]), 100);
});