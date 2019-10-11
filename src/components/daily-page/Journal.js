import React,{Component} from "react";
import "./Journal.css";

class Journal extends Component {
    render(){
        return(
            <div className='journal-container'>
                <h1>Journal</h1>
                <input className="journal-textarea" placeholder="What's on your mind?"></input>
            </div>
        )
    }
}

export default Journal;