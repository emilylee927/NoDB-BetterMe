import React,{Component} from "react";
import axios from "axios";
import "./ToDo.css";

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


    render(){
        let tasklist = this.state.task.map(val =>{
            return (
                <div key={val.id} className={'task' + (val.completedTask ? ' completed' : '')}>
                    <input onClick={this.toggle} id={val.id} className="checkbox" type="checkbox"/>
                    {val.editing == true
                    ?
                    <form onSubmit={this.editSubmit} id={val.id} className="displayinline">
                    <input type="text" value={val.task} onChange={this.handleEdit} id={val.id}></input>
                    </form>
                    :
                    <p className='todotaskadded' onDoubleClick={this.editTodo} id={val.id}>{val.task}</p>
                    }
                </div> 
            )
        })
        return(
        <div className="inputbar-container">
            <div className="inputbar">
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="What you gotta do today?" type="text" value={this.state.todoinput} onChange={this.handleChange}/>
                </form>
            </div>
                {tasklist}
        </div>
        )
    }
}

export default ToDo;