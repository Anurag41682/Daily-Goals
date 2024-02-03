import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";

import "./routes/add";
import "./routes/fetch";
import "./routes/clear";
import "./routes/mark-unmark";
import "./routes/delete";
import "./routes/edit";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    minWidth: 500,
    minHeight: 500,
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true, //hide menubar
  });
  ipcMain.on("navigate", (event, route) => {
    if (route.action === "add") {
      ipcMain.emit("add", event, route.data);
    } else if (route.action === "fetch") {
      ipcMain.emit("fetch", event, route.data);
    } else if (route.action === "clear") {
      ipcMain.emit("clear", event, route.data);
    } else if (route.action === "mark-unmark") {
      ipcMain.emit("mark-unmark", event, route.data);
    } else if (route.action === "delete") {
      ipcMain.emit("delete", event, route.data);
    } else if (route.action === "edit") {
      ipcMain.emit("edit", event, route.data);
    }
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
