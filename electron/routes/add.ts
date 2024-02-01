import { ipcMain } from "electron";
import { insertData } from "../models/dbManager";

ipcMain.on("add", (event, requestData) => {
  // Perform backend logic or make requests to external services
  insertData(requestData.data);
  const responseData = { data: requestData };

  // Send the response back to the renderer process
  event.sender.send("add", responseData);
});
