import { ipcMain } from "electron";
import { fetchData } from "../models/dbManager";

ipcMain.on("fetch", (event) => {
  fetchData((records) => {
    event.sender.send("fetch", records);
  });
});
