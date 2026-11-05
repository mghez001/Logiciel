import { test, beforeEach} from "node:test";
import fs from "node:fs";
import assert from "node:assert";
import { logger } from "./logger.js";

beforeEach((t) => {
  t.mock.method(fs, "appendFileSync", () => {});
});

test("logger.info écrit le message dans log.txt", (t) => {
  logger.info("Message à caractère informatif");
});

test("Message dans log.txt horodaté", (t) => {

    t.mock.timers.enable({ apis: ["Date"], now: new Date("2026-10-23T08:12:00.000Z") });
    logger.info("Heure");

    assert.deepStrictEqual(fs.appendFileSync.mock.calls[0].arguments, [
    "log.txt",
    "2026-10-23T08:12:00.000Z : Heure\n",
    ]);
});
