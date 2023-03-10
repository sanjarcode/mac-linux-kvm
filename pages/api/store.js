// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
export const STORE_TASKS = {
  APPEND: "APPEND",
  RESET: "RESET",
};

export default async function storeHandler(req, res) {
  let taskResponse = "no effect",
    currentState;
  if (req.method === "POST") {
    switch (req.body.task) {
      case STORE_TASKS.RESET:
        taskResponse = await clearStore();
        break;
      case STORE_TASKS.APPEND:
        taskResponse = await appendToStore(req.body.text, req.body.time);
        break;

      default:
        break;
    }
  } else if (req.method === "GET") {
    taskResponse = "GET success";
  }

  currentState = JSON.parse(await readFromStore());

  await new Promise((r) => setTimeout(r, 2000));

  res.status(200).json({
    name: "John Doe",
    receivedBody: req.body,
    taskResponse,
    currentState,
  });
}

export const INITIAL_STORE_STATE = "[]";

export async function appendToStore(text, time) {
  const currentState = await readFromStore();
  const nextState = JSON.stringify([
    ...JSON.parse(currentState),
    {
      time: time ? new Date(time) : new Date(),
      text,
    },
  ]);

  try {
    fs.writeFileSync("store.json", nextState);

    return "success";
  } catch (error) {
    return JSON.stringify(error);
  }
}

export async function clearStore() {
  try {
    fs.writeFileSync("store.json", INITIAL_STORE_STATE);
    return "success";
  } catch (error) {
    return JSON.stringify(error);
  }
}

export async function readFromStore() {
  try {
    return fs.readFileSync("store.json").toString();
  } catch (error) {
    return JSON.stringify(error);
  }
}
