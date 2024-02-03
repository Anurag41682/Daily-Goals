import { ipcMain } from "electron";

import { markUnmark } from "../models/dbManager";

ipcMain.on("mark-unmark", (event, requestData: string) => {
  if (event) {
  }
  markUnmark(requestData);
});
