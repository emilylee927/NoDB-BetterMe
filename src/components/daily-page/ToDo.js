import React,{Component} from "react";
import axios from "axios";
import "./ToDo.css";
import xbutton from "../../x-button.png";

class ToDo extends Component {
    constructor(){
        super();
        this.state={
            todoinput:"",
            task:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.editSubmit = this.editSubmit.bind(this);
    }

  handleChange = e =>{
      this.setState({todoinput:e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.post("/api/betterme/todo",{
        todoinput: this.state.todoinput,
        date: this.props.date
        
    }).then(response=>{
        let task = this.addEditing(response.data[this.props.date].todo)
        this.setState({
            task,
            todoinput: ''
        })
    }).catch(error => {
        console.log(error);
        alert("Prioritize baby! (only 8 tasks at a time)")
    })
  }


  componentDidMount(){
      console.log("hi")
    axios.get("/api/betterme")
    .then(response=>{
        let task = this.addEditing(response.data[this.props.date].todo)
    console.log(response.data);
    this.setState({task})
    })
    .catch(error => {
        console.log(error)
    })
}

  addEditing = task => {
      let result = task.map( el => {
          el.editing = false;
          return el;
      });
      return result;
  }


  toggle = e => {
      let id = e.target.getAttribute("id");
        axios.post(`/api/betterme/${id}`,{
            date: this.props.date
        }).then( response => {
            let task = this.addEditing(response.data[this.props.date].todo)
            this.setState({task})
        })
    }

    editTodo = e => {
        let id = e.target.getAttribute("id");
        const index = this.state.task.findIndex(val=>{
            if(val.id == id){
                return true;
            } 
        });
        let newTask = this.state.task.slice()
        newTask[index] = {
            ...newTask[index],
            editing: true
        }
        this.setState({task: newTask})
    }

    handleEdit = e => {
        let id = e.target.getAttribute("id");
        const index = this.state.task.findIndex(val=>{
            if(val.id == id){
                return true;
            } 
        });
        let newTask = this.state.task.slice()
        newTask[index] = {
            ...newTask[index],
            task: e.target.value
        }
        this.setState({task: newTask});
    }

    editSubmit = e => {
        e.preventDefault();
        let id = e.target.getAttribute("id");
        const index = this.state.task.findIndex(val=>{
            if(val.id == id){
                return true;
            } 
        });
        axios.post(`/api/betterme/todo/${id}`,{
            text: this.state.task[index].task,
            date: this.props.date
        }).then(response=>{
            let task = this.addEditing(response.data[this.props.date].todo)
            this.setState({
                task
            }) 
        }).catch(error=>{
            console.log(error);
        })
        
    }


deleteTask =e => {
    let id = e.target.getAttribute("id");
    axios.delete(`/api/betterme/todo/${id}`, {
        data: {date: this.props.date}
    }).then(response=>{
        let task = this.addEditing(response.data[this.props.date].todo)
        this.setState({
            task
        })
    })

}

    render(){
        let tasklist = this.state.task.map(val =>{
            return (
                <div key={val.id} className={'task' + (val.completedTask ? ' completed' : '')}>
                    <input onClick={this.toggle} id={val.id} checked={val.completedTask ? true : false} className="checkbox" type="checkbox" />
                    {val.editing == true
                    ?
                    <form onSubmit={this.editSubmit} id={val.id} className="displayinline">
                    <input type="text" value={val.task} onChange={this.handleEdit} id={val.id}></input>
                    </form>
                    :
                    <p className='todotaskadded' onDoubleClick={this.editTodo} id={val.id}>{val.task}</p>
                    }
                    <a onClick={this.deleteTask} id={val.id} href="#"><img className="x" src={xbutton}></img></a>
                </div> 
            )
        })
        return(
        <div className="inputbar-container">
            <div className="inputbar">
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="What you gotta do today?" type="text" value={this.state.todoinput} onChange={this.handleChange} className="todo-input"/>
                </form>
            </div>
            <div className="tasklist-container">
                {tasklist}
            </div>
        </div>
        )
    }
}

export default ToDo;