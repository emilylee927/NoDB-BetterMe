let journalPage ={};
let id =1;
function createPage(req,res){
   const {mood,date} = req.body;
   if(!(date in journalPage)){
   journalPage[date] = {
       mood,
        todo: [],
       thoughts:"",
       
   }
   console.log(journalPage)
   res.status(200).json(journalPage)} 
   else{
       journalPage[date] = {
           ...journalPage[date],
           mood
       }
       res.status(200).json(journalPage)
   }
}

function createToDo(req,res){
 const {todoinput, date}=req.body;
 if (journalPage[date].todo.length < 8) {
    journalPage[date].todo.push({
        task: todoinput,
       completedTask: false,
       id
   })
    id++
    console.log(journalPage)
    res.status(200).json(journalPage)
 } else {
    console.log('todo list is full!')
    console.log(journalPage)
    res.status(403).json(journalPage)
 }
    
}


function completedTask (req,res){
    const {id} = req.params;
    const {date} = req.body;
    const index = journalPage[date].todo.findIndex(val=>{
        if(val.id == id){
            return true;
        } 
    });
    journalPage[date].todo[index] = {
        ...journalPage[date].todo[index],
        completedTask: !journalPage[date].todo[index].completedTask
    }
    console.log(journalPage[date].todo)
    res.status(200).json(journalPage);
}

function editToDo(req, res) {
    const {id} = req.params;
    const {text, date} = req.body;
    const index = journalPage[date].todo.findIndex(val=>{
        if(val.id == id){
            return true;
        }
    });
    journalPage[date].todo[index] = {
        ...journalPage[date].todo[index],
        task: text
    }
    console.log(journalPage[date].todo)
    res.status(200).json(journalPage);
}


function getJournalPage(req,res){
    console.log("you call me?")
    res.status(200).json(journalPage)
}


function deleteTask(req,res){
    const {id} = req.params;
    const {date} = req.body;
    const index = journalPage[date].todo.findIndex(val=>{
        if(val.id == id){
            return true;
        }
    });
    journalPage[date].todo.splice(index,1)
    res.status(200).json(journalPage)

}


module.exports = {
    createPage,
    createToDo,
    completedTask,
    editToDo,
    getJournalPage,
    deleteTask
}