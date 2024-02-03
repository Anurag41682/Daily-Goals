import { ipcMain } from "electron";
import { editData } from "../models/dbManager";

ipcMain.on("edit", (event, requestData) => {
  const { idToUpdate, task } = requestData;
  editData(idToUpdate, task);
});
