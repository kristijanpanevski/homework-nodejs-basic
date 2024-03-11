import { EventEmitter } from "node:events";
import { appendFileSync } from "node:fs";

const LOG_PATH = "./data/log.txt";

export const loggerEmitter = new EventEmitter();

loggerEmitter
  .on("add-book", (id) => {
    appendFileSync(
      LOG_PATH,
      `Book with id: ${id} was added on: ${new Date()}\n`
    );
  })
  .on("update-book", (id) => {
    appendFileSync(
      LOG_PATH,
      `Book with id: ${id} was updated on: ${new Date()}\n`
    );
  })
  .on("delete-book", (id) => {
    appendFileSync(
      LOG_PATH,
      `Book with id: ${id} was deleted on: ${new Date()}\n`
    );
  });
