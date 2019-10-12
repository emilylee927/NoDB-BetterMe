const express = require("express");
const {createPage, createToDo, completedTask, editToDo, getJournalPage,deleteTask, createJournal} = require("./BetterMeController.js")


const app = express();

app.use(express.json());

app.post("/api/betterme", createPage)

app.post("/api/betterme/todo", createToDo)

app.post("/api/betterme/journal", createJournal)

app.put("/api/betterme/todo/:id", editToDo)

app.put("/api/complete/:id", completedTask)

app.get("/api/betterme",getJournalPage)

app.delete("/api/betterme/todo/:id", deleteTask)

app.listen(5200,()=>console.log("Yes,babeeee I am listening!"))
