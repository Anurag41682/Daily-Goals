import { ipcMain } from "electron";
import { deleteData } from "../models/dbManager";

ipcMain.on("delete", (event, requestData) => {
  deleteData(requestData);
});
