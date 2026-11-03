import { test } from "node:test";
import assert from "node:assert";
import { slotMachine } from "./slotMachine.js";

test("retourne 0 si aucun symbole identique", () => {
  assert.equal(slotMachine(5, ["+", "%", "*"]), 0);
});

test("double la mise si les 2 derniers symboles sont identiques", () => {
  assert.equal(slotMachine(5, ["+", "%", "%"]), 10);
});

test("Verif consigne 1 plus fonctionnelle", () => {
  assert.equal(slotMachine(5, ["+", "+", "%"]), 0);
});