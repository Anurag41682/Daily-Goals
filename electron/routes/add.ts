import { ipcMain } from "electron";
import { insertData } from "../models/dbManager";

ipcMain.on("add", (event, requestData: { task: string }) => {
  insertData(requestData.task);
});
