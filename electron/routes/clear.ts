import { ipcMain } from "electron";
import { clearData } from "../models/dbManager";

ipcMain.on("clear", (event) => {
  clearData();
});