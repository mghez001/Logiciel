import fs from "node:fs";

const FILE = "log.txt";

export const logger = {
  info(message) {
    fs.appendFileSync(FILE, `${new Date().toISOString()} : ${message}\n`);
  },
};