import * as fs from "node:fs";

const FILE = "log.txt";

export const logger = {
  info(message) {
    fs.appendFileSync(FILE, message + "\n");
  },
};