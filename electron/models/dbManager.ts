const fs = require("fs");
const path = require('path');
const { app } = require('electron');
interface Task {
  id: string;
  task: string;
  isMarked: boolean;
}
let tasks: Task[] = [];
const userDataPath = app.getPath('userData');
const filePath = path.join(userDataPath, 'tasks.json');

function generateUniqueId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function updateJsonFile() {
  const jsonString = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(filePath, jsonString, "utf-8");
}

export const fetchData = (callback: any) => { 
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    const jsonContent = fs.readFileSync(filePath, "utf-8");
    tasks = JSON.parse(jsonContent);
    callback(tasks);
  } else {
    // If the file doesn't exist, create it with an empty array
    fs.writeFileSync(filePath, "[]", "utf-8");
    tasks = [];
    callback(tasks);
  }
};

export const insertData = (taskToInsert: string, callback: any) => {
  const id = generateUniqueId();
  const isMarked = false;

  const newTask: Task = { id, task: taskToInsert, isMarked };
  tasks.push(newTask);

  updateJsonFile();
  callback(null, newTask);
};

export const clearData = () => {
  tasks = [];
  updateJsonFile();
};

export const deleteData = (toDelete: string) => {
  tasks = tasks.filter((task) => task.id !== toDelete);
  updateJsonFile();
};

export const editData = (id: string, updatedTask: string) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    tasks[taskIndex].task = updatedTask;
    updateJsonFile();
  }
};

export const markUnmark = (toMarkUnmark: string) => {
  const taskIndex = tasks.findIndex((task) => task.id === toMarkUnmark);

  if (taskIndex !== -1) {
    tasks[taskIndex].isMarked = !tasks[taskIndex].isMarked;
    updateJsonFile();
  }
};
