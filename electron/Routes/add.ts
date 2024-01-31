import { ipcMain } from 'electron'
ipcMain.on('add', (event, requestData) => {
  // Perform backend logic or make requests to external services
  const responseData = { data:requestData };
  console.log(requestData)
  // Send the response back to the renderer process
  event.sender.send('add', responseData);
});