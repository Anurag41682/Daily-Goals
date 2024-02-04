import { ipcMain } from "electron";
import { fetchData } from "../models/dbManager";

ipcMain.on("fetch", (event) => {
  fetchData((records: any) => {
    event.sender.send("fetch", records);
  });
});
