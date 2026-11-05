import { test } from "node:test";
import fs from "node:fs";
import { logger } from "./logger.js";

test("logger.info écrit le message dans log.txt", (t) => {
  const append = t.mock.method(fs, "appendFileSync", () => {});

  logger.info("Message à caractère informatif");
});