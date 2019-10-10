const express = require("express");
const {createPage, createToDo, completedTask, editToDo} = require("./BetterMeController.js")


const app = express();

app.use(express.json());

app.post("/api/betterme", createPage)

app.post("/api/betterme/todo", createToDo)

app.post("/api/betterme/todo/:id", editToDo)

app.post("/api/betterme/:id", completedTask)

app.listen(5200,()=>console.log("Yes,babeeee I am listening!"))
