import { ipcMain } from "electron";
import { editData } from "../models/dbManager";

ipcMain.on("edit", (event, requestData) => {
  if (event) {
  }
  const { idToUpdate, task } = requestData;
  editData(idToUpdate, task);
});
