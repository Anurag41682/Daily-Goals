import { ipcMain } from "electron";
import { insertData } from "../models/dbManager";

ipcMain.on("add", (event, requestData: string) => {
  insertData(requestData, (err: Error | null, insertedData: any) => {
    if (err) return err;
    event.sender.send("add", insertedData);
  });
});
