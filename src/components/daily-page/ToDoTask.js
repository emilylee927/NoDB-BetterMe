import React from 'react';
import './ToDoTask.css';
import xbutton from "../../x-button.png";

function ToDoTask(props) {
    return (
    <div key={props.id} className={'task' + (props.completedTask ? ' completed' : '')}>
        <input onClick={props.toggle} id={props.id} checked={props.completedTask ? true : false} type="checkbox" />
            {props.editing == true
            ?
            <form className='task-form' onSubmit={props.editSubmit} id={props.id}>
                <input className='task-input' type="text" value={props.task} onChange={props.handleEdit} id={props.id}></input>
            </form>
            :
            <p className='todotaskadded' onDoubleClick={props.editTodo} id={props.id}>{props.task}</p>
            }
        <a onClick={props.deleteTask(props.id)} href="#"><img className="x" src={xbutton}></img></a>
    </div>
    )
}

export default ToDoTask;